import { Router } from "express";
import { z } from "zod";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { Game } from "../models/Game.js";
import { Listing } from "../models/Listing.js";
import { Order } from "../models/Order.js";
import { TravelPackage } from "../models/Package.js";
import { PaymentMethod } from "../models/PaymentMethod.js";
import { Team } from "../models/Team.js";
import { TicketType } from "../models/TicketType.js";
import { User } from "../models/User.js";
import { Venue } from "../models/Venue.js";
import { resolveFlag } from "../utils/flags.js";
import { badRequest, notFound } from "../utils/http.js";

const router = Router();

router.use(requireAuth, requireAdmin);

const teamSchema = z.object({
  code: z.string().min(2).max(5),
  name: z.string().min(2),
  group: z.string().min(1).max(2),
  country: z.string().min(2),
  flag: z.string().max(300).optional(),
  qualified: z.boolean().optional()
});

const gameSchema = z.object({
  matchNumber: z.number().int().min(1).max(999),
  stage: z.enum(["Group Stage", "Round of 32", "Round of 16", "Quarterfinal", "Semifinal", "Bronze Final", "Final"]),
  date: z.string().min(10),
  localTime: z.string().min(4),
  city: z.string().min(2),
  homeLabel: z.string().min(1),
  awayLabel: z.string().min(1),
  homeTeamCode: z.string().optional(),
  awayTeamCode: z.string().optional(),
  status: z.enum(["scheduled", "live", "ended"]).optional(),
  homeScore: z.number().int().min(0).max(99).nullable().optional(),
  awayScore: z.number().int().min(0).max(99).nullable().optional(),
  deleted: z.boolean().optional()
});

const statusSchema = z.object({
  status: z.enum(["pending", "awaiting_payment", "payment_reported", "confirmed", "cancelled"])
});

const packageVariantSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(2),
  hotel: z.string().default(""),
  roomType: z.string().default(""),
  city: z.string().default(""),
  nights: z.number().int().min(1).max(60),
  priceFromUsd: z.number().min(0).nullable(),
  callForRates: z.boolean(),
  taxNote: z.string().default("")
});

const packageSchema = z.object({
  slug: z.string().min(2),
  title: z.string().min(2),
  category: z.string().min(2),
  dateRange: z.string().min(2),
  city: z.string().default(""),
  shortDescription: z.string().min(2),
  longDescription: z.string().min(2),
  baseNights: z.number().int().min(1).max(60),
  minNights: z.number().int().min(1).max(60),
  maxNights: z.number().int().min(1).max(90),
  priceFromUsd: z.number().min(0),
  featured: z.boolean().optional(),
  inclusions: z.array(z.string()).default([]),
  addOns: z.array(z.string()).default([]),
  variants: z.array(packageVariantSchema).default([]),
  relatedCities: z.array(z.string()).default([]),
  relatedMatchNumbers: z.array(z.number().int().min(1).max(999)).default([]),
  brochurePage: z.number().int().min(1)
});

const ticketTypeSchema = z.object({
  matchNumber: z.number().int().min(1).max(999),
  section: z.string().min(1).max(40),
  row: z.string().max(20).optional(),
  category: z.string().max(40).optional(),
  deliveryType: z.string().max(60).optional(),
  priceUsd: z.number().min(0).max(1000000),
  quantityTotal: z.number().int().min(0).max(100000),
  quantityAvailable: z.number().int().min(0).max(100000).optional(),
  maxPerOrder: z.number().int().min(1).max(20).optional(),
  status: z.enum(["active", "paused"]).optional(),
  notes: z.string().max(500).optional()
});

const reviewSchema = z.object({
  status: z.enum(["active", "rejected"]),
  reviewNote: z.string().max(500).optional(),
  feePaid: z.boolean().optional()
});

router.get("/summary", async (_req, res) => {
  const [users, orders, paymentReported, confirmedOrders, packages, games, ticketTypes, activeListings, pendingListings] =
    await Promise.all([
      User.countDocuments({ role: "user" }),
      Order.countDocuments({}),
      Order.countDocuments({ status: "payment_reported" }),
      Order.countDocuments({ status: "confirmed" }),
      TravelPackage.countDocuments({}),
      Game.countDocuments({}),
      TicketType.countDocuments({}),
      Listing.countDocuments({ status: "active" }),
      Listing.countDocuments({ status: "pending_review" })
    ]);
  return res.json({
    users,
    orders,
    paymentReported,
    confirmedOrders,
    packages,
    games,
    ticketTypes,
    activeListings,
    pendingListings
  });
});

/* ---------------- Ticket inventory ---------------- */

router.get("/ticket-types", async (req, res) => {
  const query: Record<string, unknown> = {};
  if (req.query.match) query.matchNumber = Number(req.query.match);
  const ticketTypes = await TicketType.find(query).sort({ matchNumber: 1, priceUsd: 1 }).lean();
  return res.json({ ticketTypes });
});

router.post("/ticket-types", async (req, res, next) => {
  try {
    const data = ticketTypeSchema.parse(req.body);
    const game = await Game.findOne({ matchNumber: data.matchNumber }).lean();
    if (!game) {
      return badRequest(res, "A match with that number must exist first");
    }
    const ticketType = await TicketType.create({
      ...data,
      game: game._id,
      matchLabel: `${game.homeLabel} vs ${game.awayLabel} (Match ${game.matchNumber})`,
      quantityAvailable: data.quantityAvailable ?? data.quantityTotal
    });
    return res.status(201).json({ ticketType });
  } catch (error) {
    return next(error);
  }
});

router.patch("/ticket-types/:id", async (req, res, next) => {
  try {
    const data = ticketTypeSchema.partial().parse(req.body);
    const ticketType = await TicketType.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!ticketType) {
      return notFound(res, "Ticket type not found");
    }
    return res.json({ ticketType });
  } catch (error) {
    return next(error);
  }
});

router.delete("/ticket-types/:id", async (req, res) => {
  const ticketType = await TicketType.findByIdAndDelete(req.params.id);
  if (!ticketType) {
    return notFound(res, "Ticket type not found");
  }
  return res.status(204).send();
});

/* ---------------- Resale listing review ---------------- */

router.get("/listings", async (req, res) => {
  const query: Record<string, unknown> = {};
  if (req.query.status) query.status = req.query.status;
  const listings = await Listing.find(query).populate("seller", "name email phone").sort({ createdAt: -1 }).lean();
  return res.json({ listings });
});

const adminListingSchema = z.object({
  matchNumber: z.number().int().min(1).max(999),
  section: z.string().min(1).max(40),
  row: z.string().max(20).optional(),
  quantity: z.number().int().min(1).max(10),
  priceUsd: z.number().min(1).max(100000),
  deliveryType: z.string().max(60).optional(),
  notes: z.string().max(1000).optional()
});

// Admin creates a resale listing directly — pre-approved, no fee or proof.
router.post("/listings", async (req, res, next) => {
  try {
    const data = adminListingSchema.parse(req.body);
    const game = await Game.findOne({ matchNumber: data.matchNumber, deleted: { $ne: true } }).lean();
    if (!game) {
      return badRequest(res, "Match not found");
    }
    const listing = await Listing.create({
      seller: req.user!._id,
      game: game._id,
      matchNumber: data.matchNumber,
      matchLabel: `${game.homeLabel} vs ${game.awayLabel}`,
      section: data.section,
      row: data.row ?? "",
      quantity: data.quantity,
      priceUsd: data.priceUsd,
      deliveryType: data.deliveryType || "Mobile Entry",
      notes: data.notes ?? "",
      proofImage: "",
      listingFeeUsd: 0,
      feeStatus: "paid",
      status: "active",
      reviewNote: "Created by admin",
      approvedAt: new Date()
    });
    return res.status(201).json({ listing });
  } catch (error) {
    return next(error);
  }
});

router.patch("/listings/:id/review", async (req, res, next) => {
  try {
    const data = reviewSchema.parse(req.body);
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return notFound(res, "Listing not found");
    }
    listing.status = data.status;
    listing.reviewNote = data.reviewNote ?? "";
    if (data.feePaid) listing.feeStatus = "paid";
    if (data.status === "active") listing.approvedAt = new Date();
    await listing.save();
    return res.json({ listing });
  } catch (error) {
    return next(error);
  }
});

router.get("/users", async (_req, res) => {
  const users = await User.find().select("-passwordHash").sort({ createdAt: -1 }).lean();
  return res.json({ users });
});

router.get("/orders", async (_req, res) => {
  const orders = await Order.find().populate("user", "name email phone role").sort({ createdAt: -1 }).lean();
  return res.json({ orders });
});

router.patch("/orders/:id/status", async (req, res, next) => {
  try {
    const data = statusSchema.parse(req.body);
    const order = await Order.findByIdAndUpdate(req.params.id, { status: data.status }, { new: true });
    if (!order) {
      return notFound(res, "Order not found");
    }
    return res.json({ order });
  } catch (error) {
    return next(error);
  }
});

router.post("/teams", async (req, res, next) => {
  try {
    const data = teamSchema.parse(req.body);
    const code = data.code.toUpperCase();
    const team = await Team.create({
      ...data,
      code,
      group: data.group.toUpperCase(),
      flag: data.flag || resolveFlag(code, data.country)
    });
    return res.status(201).json({ team });
  } catch (error) {
    return next(error);
  }
});

router.patch("/teams/:id", async (req, res, next) => {
  try {
    const data = teamSchema.partial().parse(req.body);
    const update: Record<string, unknown> = {
      ...data,
      code: data.code?.toUpperCase(),
      group: data.group?.toUpperCase()
    };
    // Auto-refresh the flag when code/country change and none was supplied.
    if (data.flag === undefined && (data.code || data.country)) {
      const resolved = resolveFlag(data.code?.toUpperCase(), data.country);
      if (resolved) update.flag = resolved;
    }
    const team = await Team.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!team) {
      return notFound(res, "Team not found");
    }
    return res.json({ team });
  } catch (error) {
    return next(error);
  }
});

router.delete("/teams/:id", async (req, res) => {
  const team = await Team.findByIdAndDelete(req.params.id);
  if (!team) {
    return notFound(res, "Team not found");
  }
  return res.status(204).send();
});

// Flag for a team code: prefer the team's saved flag, else auto-resolve.
async function flagForCode(code?: string): Promise<string> {
  const upper = (code ?? "").toUpperCase();
  if (!upper) return "";
  const team = await Team.findOne({ code: upper }).lean();
  return team?.flag || resolveFlag(upper);
}

router.post("/games", async (req, res, next) => {
  try {
    const data = gameSchema.parse(req.body);
    const venue = await Venue.findOne({ city: data.city });
    if (!venue) {
      return badRequest(res, "Venue city must exist before creating a game");
    }
    const game = await Game.create({
      ...data,
      stadium: venue.stadium,
      region: venue.region,
      homeTeamCode: data.homeTeamCode?.toUpperCase() ?? "",
      awayTeamCode: data.awayTeamCode?.toUpperCase() ?? "",
      homeFlag: await flagForCode(data.homeTeamCode),
      awayFlag: await flagForCode(data.awayTeamCode)
    });
    return res.status(201).json({ game });
  } catch (error) {
    return next(error);
  }
});

router.patch("/games/:id", async (req, res, next) => {
  try {
    const data = gameSchema.partial().parse(req.body);
    const update: Record<string, unknown> = { ...data };
    if (data.city) {
      const venue = await Venue.findOne({ city: data.city });
      if (!venue) {
        return badRequest(res, "Venue city must exist before updating a game");
      }
      update.stadium = venue.stadium;
      update.region = venue.region;
    }
    if (data.homeTeamCode !== undefined) {
      update.homeTeamCode = data.homeTeamCode.toUpperCase();
      update.homeFlag = await flagForCode(data.homeTeamCode);
    }
    if (data.awayTeamCode !== undefined) {
      update.awayTeamCode = data.awayTeamCode.toUpperCase();
      update.awayFlag = await flagForCode(data.awayTeamCode);
    }

    const game = await Game.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!game) {
      return notFound(res, "Game not found");
    }
    return res.json({ game });
  } catch (error) {
    return next(error);
  }
});

// Admin sees every match, including soft-deleted ones.
router.get("/games", async (_req, res) => {
  const games = await Game.find().sort({ matchNumber: 1 }).lean();
  return res.json({ games });
});

// Soft delete — hides the match from the public site but keeps it recoverable.
router.delete("/games/:id", async (req, res) => {
  const game = await Game.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
  if (!game) {
    return notFound(res, "Game not found");
  }
  return res.json({ game });
});

router.get("/packages", async (_req, res) => {
  const packages = await TravelPackage.find().sort({ priceFromUsd: 1 }).lean();
  return res.json({ packages });
});

router.post("/packages", async (req, res, next) => {
  try {
    const data = packageSchema.parse(req.body);
    const travelPackage = await TravelPackage.create(data);
    return res.status(201).json({ package: travelPackage });
  } catch (error) {
    return next(error);
  }
});

router.patch("/packages/:id", async (req, res, next) => {
  try {
    const data = packageSchema.partial().parse(req.body);
    const travelPackage = await TravelPackage.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true
    });
    if (!travelPackage) {
      return notFound(res, "Package not found");
    }
    return res.json({ package: travelPackage });
  } catch (error) {
    return next(error);
  }
});

router.delete("/packages/:id", async (req, res) => {
  const travelPackage = await TravelPackage.findByIdAndDelete(req.params.id);
  if (!travelPackage) {
    return notFound(res, "Package not found");
  }
  return res.status(204).send();
});

/* ---------------- Payment methods (configurable) ---------------- */

const paymentMethodSchema = z.object({
  key: z.string().min(1).max(40),
  name: z.string().min(1).max(60),
  kind: z.enum(["crypto", "zelle", "paypal", "bank", "cashapp", "other"]).optional(),
  enabled: z.boolean().optional(),
  order: z.number().int().min(0).max(999).optional(),
  fulfillment: z.enum(["details", "contact"]).optional(),
  instructions: z.string().max(1000).optional(),
  networks: z
    .array(z.object({ label: z.string().max(60), asset: z.string().max(60).optional(), address: z.string().max(200).optional() }))
    .optional(),
  fields: z.array(z.object({ label: z.string().max(60), value: z.string().max(300).optional() })).optional(),
  contactChannel: z.enum(["whatsapp", "telegram", "facebook", ""]).optional(),
  contactTarget: z.string().max(120).optional()
});

router.get("/payment-methods", async (_req, res) => {
  const methods = await PaymentMethod.find().sort({ order: 1, name: 1 }).lean();
  return res.json({ methods });
});

router.post("/payment-methods", async (req, res, next) => {
  try {
    const data = paymentMethodSchema.parse(req.body);
    const method = await PaymentMethod.create({ ...data, key: data.key.toLowerCase().trim() });
    return res.status(201).json({ method });
  } catch (error) {
    return next(error);
  }
});

router.patch("/payment-methods/:id", async (req, res, next) => {
  try {
    const data = paymentMethodSchema.partial().parse(req.body);
    if (data.key) data.key = data.key.toLowerCase().trim();
    const method = await PaymentMethod.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!method) {
      return notFound(res, "Payment method not found");
    }
    return res.json({ method });
  } catch (error) {
    return next(error);
  }
});

router.delete("/payment-methods/:id", async (req, res) => {
  const method = await PaymentMethod.findByIdAndDelete(req.params.id);
  if (!method) {
    return notFound(res, "Payment method not found");
  }
  return res.status(204).send();
});

export default router;
