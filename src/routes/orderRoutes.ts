import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import { Game } from "../models/Game.js";
import { Listing } from "../models/Listing.js";
import { Order } from "../models/Order.js";
import { TravelPackage } from "../models/Package.js";
import { PaymentMethod } from "../models/PaymentMethod.js";
import { TicketType } from "../models/TicketType.js";
import { badRequest, notFound } from "../utils/http.js";
import { buildPaymentMessage, resolvePayment } from "../utils/payments.js";

const router = Router();

router.use(requireAuth);

const createOrderSchema = z.object({
  packageSlug: z.string().min(1),
  variantId: z.string().optional(),
  travelerCount: z.number().int().min(1).max(20).default(1),
  selectedMatchNumbers: z.array(z.number().int().min(1).max(104)).default([]),
  notes: z.string().max(2000).optional()
});

const buyTicketSchema = z.object({
  ticketTypeId: z.string().min(1),
  quantity: z.number().int().min(1).max(20).default(1)
});

const paymentSchema = z.object({
  method: z.string().min(1), // configured PaymentMethod key
  network: z.string().optional() // selected crypto network label
});

const reportSchema = z.object({
  reportNote: z.string().max(1000).optional()
});

function matchLabel(game: { homeLabel: string; awayLabel: string; matchNumber: number }) {
  return `${game.homeLabel} vs ${game.awayLabel}`;
}

router.get("/mine", async (req, res) => {
  const orders = await Order.find({ user: req.user!._id }).sort({ createdAt: -1 }).lean();
  return res.json({ orders });
});

router.get("/:id", async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user!._id }).lean();
  if (!order) {
    return notFound(res, "Order not found");
  }
  return res.json({ order });
});

/* ---------------- Package orders (legacy) ---------------- */

router.post("/", async (req, res, next) => {
  try {
    const data = createOrderSchema.parse(req.body);
    const travelPackage = await TravelPackage.findOne({ slug: data.packageSlug });
    if (!travelPackage) {
      return notFound(res, "Package not found");
    }

    const variant = data.variantId
      ? travelPackage.variants.find((candidate) => candidate.id === data.variantId)
      : travelPackage.variants[0];

    if (!variant) {
      return badRequest(res, "Package variant not found");
    }

    if (data.selectedMatchNumbers.length) {
      const count = await Game.countDocuments({ matchNumber: { $in: data.selectedMatchNumbers } });
      if (count !== data.selectedMatchNumbers.length) {
        return badRequest(res, "One or more selected matches were not found");
      }
    }

    const price = variant.priceFromUsd ?? travelPackage.priceFromUsd ?? 0;
    const order = await Order.create({
      user: req.user!._id,
      orderType: "package",
      package: travelPackage._id,
      packageSlug: travelPackage.slug,
      packageTitle: travelPackage.title,
      variantId: variant.id,
      variantTitle: variant.title,
      travelerCount: data.travelerCount,
      selectedMatchNumbers: data.selectedMatchNumbers,
      notes: data.notes ?? "",
      totalAmountUsd: variant.callForRates ? 0 : price * data.travelerCount,
      status: "pending"
    });

    return res.status(201).json({ order });
  } catch (error) {
    return next(error);
  }
});

/* ---------------- Ticket purchases (primary inventory) ---------------- */

router.post("/tickets", async (req, res, next) => {
  try {
    const data = buyTicketSchema.parse(req.body);
    const ticketType = await TicketType.findOne({ _id: data.ticketTypeId, status: "active" });
    if (!ticketType) {
      return notFound(res, "Ticket not found or no longer available");
    }
    if (data.quantity > ticketType.maxPerOrder) {
      return badRequest(res, `Maximum ${ticketType.maxPerOrder} tickets per order for this section`);
    }

    // Atomic reserve: only succeeds if enough inventory remains.
    const reserved = await TicketType.findOneAndUpdate(
      { _id: ticketType._id, quantityAvailable: { $gte: data.quantity } },
      { $inc: { quantityAvailable: -data.quantity } },
      { new: true }
    );
    if (!reserved) {
      return badRequest(res, "Not enough tickets left in this section");
    }

    const game = await Game.findOne({ matchNumber: ticketType.matchNumber }).lean();
    const seatInfo = `Sec ${ticketType.section}${ticketType.row ? ` · Row ${ticketType.row}` : ""}`;

    const order = await Order.create({
      user: req.user!._id,
      orderType: "ticket",
      ticketType: ticketType._id,
      matchNumber: ticketType.matchNumber,
      matchLabel: game ? matchLabel(game) : `Match ${ticketType.matchNumber}`,
      seatInfo: `${seatInfo} · ${ticketType.category}`,
      quantity: data.quantity,
      unitPriceUsd: ticketType.priceUsd,
      totalAmountUsd: ticketType.priceUsd * data.quantity,
      status: "pending"
    });

    return res.status(201).json({ order });
  } catch (error) {
    return next(error);
  }
});

/* ---------------- Resale purchases (P2P) ---------------- */

router.post("/resale/:listingId", async (req, res, next) => {
  try {
    const listing = await Listing.findOne({ _id: req.params.listingId, status: "active" });
    if (!listing) {
      return notFound(res, "Listing not found or no longer available");
    }
    if (String(listing.seller) === String(req.user!._id)) {
      return badRequest(res, "You cannot buy your own listing");
    }

    listing.status = "sold";
    listing.soldAt = new Date();
    await listing.save();

    const seatInfo = `Sec ${listing.section}${listing.row ? ` · Row ${listing.row}` : ""}`;
    const order = await Order.create({
      user: req.user!._id,
      orderType: "resale",
      listing: listing._id,
      matchNumber: listing.matchNumber,
      matchLabel: listing.matchLabel || `Match ${listing.matchNumber}`,
      seatInfo,
      quantity: listing.quantity,
      unitPriceUsd: listing.priceUsd,
      totalAmountUsd: listing.priceUsd * listing.quantity,
      status: "pending"
    });

    return res.status(201).json({ order });
  } catch (error) {
    return next(error);
  }
});

/* ---------------- Payment (shared across all order types) ---------------- */

router.post("/:id/payment-method", async (req, res, next) => {
  try {
    const data = paymentSchema.parse(req.body);
    const order = await Order.findOne({ _id: req.params.id, user: req.user!._id });
    if (!order) {
      return notFound(res, "Order not found");
    }

    const method = await PaymentMethod.findOne({ key: data.method, enabled: true });
    if (!method) {
      return badRequest(res, "That payment method is unavailable");
    }
    const message = buildPaymentMessage(order, method.name);
    const resolved = resolvePayment(method, data.network, message);
    if (!resolved) {
      return badRequest(res, "Selected network is unavailable");
    }

    order.status = "awaiting_payment";
    order.set("payment", { ...resolved, reportedAt: null, reportNote: order.payment?.reportNote ?? "" });
    await order.save();

    return res.json({ order });
  } catch (error) {
    return next(error);
  }
});

router.patch("/:id/payment-reported", async (req, res, next) => {
  try {
    const data = reportSchema.parse(req.body);
    const order = await Order.findOne({ _id: req.params.id, user: req.user!._id });
    if (!order) {
      return notFound(res, "Order not found");
    }
    order.status = "payment_reported";
    order.set("payment.reportedAt", new Date());
    order.set("payment.reportNote", data.reportNote ?? "");
    await order.save();
    return res.json({ order });
  } catch (error) {
    return next(error);
  }
});

export default router;
