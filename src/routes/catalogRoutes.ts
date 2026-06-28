import { Router } from "express";
import { env } from "../config/env.js";
import { Game } from "../models/Game.js";
import { Listing } from "../models/Listing.js";
import { PaymentMethod } from "../models/PaymentMethod.js";
import { TicketType } from "../models/TicketType.js";
import { TravelPackage } from "../models/Package.js";
import { Team } from "../models/Team.js";
import { Venue } from "../models/Venue.js";

const router = Router();

router.get("/packages", async (_req, res) => {
  const packages = await TravelPackage.find().select("-legalNote").sort({ featured: -1, priceFromUsd: 1 }).lean();
  return res.json({ packages });
});

router.get("/packages/:slug", async (req, res) => {
  const travelPackage = await TravelPackage.findOne({ slug: req.params.slug }).select("-legalNote").lean();
  if (!travelPackage) {
    return res.status(404).json({ message: "Package not found" });
  }
  return res.json({ package: travelPackage });
});

router.get("/games", async (req, res) => {
  const query: Record<string, unknown> = { deleted: { $ne: true } };
  if (req.query.stage) query.stage = req.query.stage;
  if (req.query.city) query.city = req.query.city;
  if (req.query.team) {
    const team = String(req.query.team).toUpperCase();
    query.$or = [{ homeTeamCode: team }, { awayTeamCode: team }];
  }
  const games = await Game.find(query).sort({ matchNumber: 1 }).lean();
  return res.json({ games });
});

router.get("/teams", async (_req, res) => {
  const teams = await Team.find().sort({ group: 1, code: 1 }).lean();
  return res.json({ teams });
});

router.get("/venues", async (_req, res) => {
  const venues = await Venue.find().sort({ region: 1, city: 1 }).lean();
  return res.json({ venues });
});

/* ---------------- Tickets (primary inventory) ---------------- */

// Matches that currently have buyable inventory, with a "from" price + count.
router.get("/ticket-matches", async (_req, res) => {
  const grouped = await TicketType.aggregate([
    { $match: { status: "active", quantityAvailable: { $gt: 0 } } },
    {
      $group: {
        _id: "$matchNumber",
        fromPriceUsd: { $min: "$priceUsd" },
        listings: { $sum: 1 },
        available: { $sum: "$quantityAvailable" }
      }
    }
  ]);
  const byMatch = new Map(grouped.map((row) => [row._id as number, row]));
  const games = await Game.find({
    matchNumber: { $in: [...byMatch.keys()] },
    deleted: { $ne: true },
    status: { $ne: "ended" }
  })
    .sort({ matchNumber: 1 })
    .lean();
  const matches = games.map((game) => {
    const stats = byMatch.get(game.matchNumber);
    return {
      ...game,
      fromPriceUsd: stats?.fromPriceUsd ?? 0,
      ticketTypes: stats?.listings ?? 0,
      available: stats?.available ?? 0
    };
  });
  return res.json({ matches });
});

// Inventory for one match, cheapest first.
router.get("/matches/:matchNumber/tickets", async (req, res) => {
  const matchNumber = Number(req.params.matchNumber);
  const [game, tickets] = await Promise.all([
    Game.findOne({ matchNumber, deleted: { $ne: true } }).lean(),
    TicketType.find({ matchNumber, status: "active", quantityAvailable: { $gt: 0 } })
      .sort({ priceUsd: 1 })
      .lean()
  ]);
  if (!game) {
    return res.status(404).json({ message: "Match not found" });
  }
  // Ended matches are no longer on sale.
  return res.json({ game, tickets: game.status === "ended" ? [] : tickets });
});

/* ---------------- Resale marketplace (public) ---------------- */

const publicListingFields = "-proofImage -feePayment -reviewNote";

router.get("/marketplace/listings", async (req, res) => {
  const query: Record<string, unknown> = { status: "active" };
  if (req.query.match) query.matchNumber = Number(req.query.match);
  const listings = await Listing.find(query)
    .select(publicListingFields)
    .populate("seller", "name")
    .sort({ matchNumber: 1, priceUsd: 1 })
    .lean();
  return res.json({ listings });
});

router.get("/marketplace/listings/:id", async (req, res) => {
  const listing = await Listing.findOne({ _id: req.params.id, status: "active" })
    .select(publicListingFields)
    .populate("seller", "name")
    .lean();
  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }
  return res.json({ listing });
});

router.get("/payment-options", async (_req, res) => {
  const methods = await PaymentMethod.find({ enabled: true }).sort({ order: 1, name: 1 }).lean();
  return res.json({
    methods: methods.map((method) => ({
      key: method.key,
      name: method.name,
      kind: method.kind,
      fulfillment: method.fulfillment,
      instructions: method.instructions,
      networks: (method.networks ?? []).map((network) => ({ label: network.label, asset: network.asset, address: network.address })),
      fields: (method.fields ?? []).map((field) => ({ label: field.label, value: field.value })),
      contactChannel: method.contactChannel
    })),
    listingFeeUsd: env.listingFeeUsd
  });
});

export default router;
