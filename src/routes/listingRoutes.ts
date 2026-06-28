import { Router } from "express";
import { z } from "zod";
import { env } from "../config/env.js";
import { requireAuth } from "../middleware/auth.js";
import { Game } from "../models/Game.js";
import { Listing } from "../models/Listing.js";
import { PaymentMethod } from "../models/PaymentMethod.js";
import { badRequest, notFound } from "../utils/http.js";
import { buildListingFeeMessage, resolvePayment } from "../utils/payments.js";

const router = Router();

router.use(requireAuth);

const createListingSchema = z.object({
  matchNumber: z.number().int().min(1).max(999),
  section: z.string().min(1).max(40),
  row: z.string().max(20).optional(),
  quantity: z.number().int().min(1).max(10).default(1),
  priceUsd: z.number().min(1).max(100000),
  deliveryType: z.string().max(60).optional(),
  notes: z.string().max(1000).optional(),
  // Client-resized data URL (image/*). Capped to keep payloads sane.
  proofImage: z.string().min(20).max(6_000_000).refine((value) => value.startsWith("data:image/"), {
    message: "Proof must be an image"
  })
});

const feePaymentSchema = z.object({
  method: z.string().min(1), // configured PaymentMethod key
  network: z.string().optional()
});

router.get("/mine", async (req, res) => {
  const listings = await Listing.find({ seller: req.user!._id }).sort({ createdAt: -1 }).lean();
  return res.json({ listings });
});

router.post("/", async (req, res, next) => {
  try {
    const data = createListingSchema.parse(req.body);
    const game = await Game.findOne({ matchNumber: data.matchNumber }).lean();
    if (!game) {
      return badRequest(res, "Selected match was not found");
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
      proofImage: data.proofImage,
      listingFeeUsd: env.listingFeeUsd,
      feeStatus: "unpaid",
      status: "pending_review"
    });

    return res.status(201).json({ listing });
  } catch (error) {
    return next(error);
  }
});

router.post("/:id/fee-payment", async (req, res, next) => {
  try {
    const data = feePaymentSchema.parse(req.body);
    const listing = await Listing.findOne({ _id: req.params.id, seller: req.user!._id });
    if (!listing) {
      return notFound(res, "Listing not found");
    }

    const method = await PaymentMethod.findOne({ key: data.method, enabled: true });
    if (!method) {
      return badRequest(res, "That payment method is unavailable");
    }
    const message = buildListingFeeMessage(listing, method.name);
    const resolved = resolvePayment(method, data.network, message);
    if (!resolved) {
      return badRequest(res, "Selected network is unavailable");
    }

    listing.set("feePayment", { ...resolved, reportedAt: null });
    await listing.save();

    return res.json({ listing });
  } catch (error) {
    return next(error);
  }
});

router.patch("/:id/fee-reported", async (req, res, next) => {
  const listing = await Listing.findOne({ _id: req.params.id, seller: req.user!._id });
  if (!listing) {
    return notFound(res, "Listing not found");
  }
  listing.feeStatus = "reported";
  listing.set("feePayment.reportedAt", new Date());
  await listing.save();
  return res.json({ listing });
});

router.delete("/:id", async (req, res) => {
  const listing = await Listing.findOne({ _id: req.params.id, seller: req.user!._id });
  if (!listing) {
    return notFound(res, "Listing not found");
  }
  if (listing.status === "sold") {
    return badRequest(res, "Sold listings cannot be removed");
  }
  listing.status = "cancelled";
  await listing.save();
  return res.json({ listing });
});

export default router;
