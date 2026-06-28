import { connectDb } from "../config/db.js";
import { env } from "../config/env.js";
import { Game } from "../models/Game.js";
import { Listing } from "../models/Listing.js";
import { Order } from "../models/Order.js";
import { TravelPackage } from "../models/Package.js";
import { PaymentMethod } from "../models/PaymentMethod.js";
import { Team } from "../models/Team.js";
import { TicketType } from "../models/TicketType.js";
import { User } from "../models/User.js";
import { Venue } from "../models/Venue.js";
import { hashPassword } from "../utils/auth.js";
import { realGames, realTeams } from "./realData.js";
import { travelPackages, venues } from "./seedData.js";

// Section template (spans three tiers so the interactive stadium map shows all rings).
const ticketTemplate = [
  { section: "108", category: "Lower · Sideline", base: 1.9, qty: 16, max: 4 },
  { section: "120", category: "Lower · Corner", base: 1.7, qty: 22, max: 4 },
  { section: "134", category: "Lower · Behind goal", base: 1.5, qty: 24, max: 6 },
  { section: "315", category: "Club · Sideline", base: 1.25, qty: 30, max: 6 },
  { section: "330", category: "Club · Corner", base: 1.05, qty: 36, max: 6 },
  { section: "512", category: "Upper · Sideline", base: 0.78, qty: 48, max: 8 },
  { section: "530", category: "Upper · Corner", base: 0.62, qty: 60, max: 8 }
];

const stageMultiplier: Record<string, number> = {
  "Group Stage": 1,
  "Round of 32": 1.4,
  "Round of 16": 1.9,
  Quarterfinal: 2.8,
  Semifinal: 4.2,
  "Bronze Final": 3.4,
  Final: 7.5
};

async function seed() {
  await connectDb();

  await Promise.all([
    Team.deleteMany({}),
    Venue.deleteMany({}),
    Game.deleteMany({}),
    TravelPackage.deleteMany({}),
    TicketType.deleteMany({}),
    Listing.deleteMany({}),
    Order.deleteMany({}),
    PaymentMethod.deleteMany({})
  ]);

  // Default, fully-editable payment methods (admin can change these in the dashboard).
  await PaymentMethod.insertMany([
    {
      key: "crypto",
      name: "Cryptocurrency",
      kind: "crypto",
      enabled: true,
      order: 1,
      fulfillment: "details",
      instructions: "Send the exact USD-equivalent amount to the address for your chosen network, then mark as paid.",
      networks: [
        { label: "Bitcoin", asset: "BTC", address: env.crypto.btc },
        { label: "Ethereum", asset: "ETH / ERC-20", address: env.crypto.eth },
        { label: "USDT", asset: "ERC-20", address: env.crypto.usdtErc20 },
        { label: "USDT (TRC-20)", asset: "TRC-20", address: env.crypto.usdtTrc20 }
      ]
    },
    {
      key: "zelle",
      name: "Zelle",
      kind: "zelle",
      enabled: true,
      order: 2,
      fulfillment: "details",
      instructions: "Send via Zelle to the details below, then mark as paid.",
      fields: [
        { label: "Zelle email", value: "payments@apex.example" },
        { label: "Recipient name", value: "Apex Tickets" }
      ]
    },
    {
      key: "paypal",
      name: "PayPal",
      kind: "paypal",
      enabled: true,
      order: 3,
      fulfillment: "details",
      instructions: "Send to the PayPal address below (Friends & Family), then mark as paid.",
      fields: [{ label: "PayPal email", value: "pay@apex.example" }]
    },
    {
      key: "bank",
      name: "Bank transfer",
      kind: "bank",
      enabled: false,
      order: 4,
      fulfillment: "details",
      instructions: "Transfer to the bank account below and use your order ID as the reference.",
      fields: [
        { label: "Bank", value: "Example Bank" },
        { label: "Account name", value: "Apex Tickets LLC" },
        { label: "Account number", value: "000123456" },
        { label: "Routing number", value: "021000021" }
      ]
    },
    {
      key: "cashapp",
      name: "Cash App",
      kind: "cashapp",
      enabled: false,
      order: 5,
      fulfillment: "details",
      instructions: "Send to the $Cashtag below, then mark as paid.",
      fields: [{ label: "Cashtag", value: "$ApexTickets" }]
    },
    {
      key: "whatsapp",
      name: "Pay via WhatsApp",
      kind: "other",
      enabled: true,
      order: 6,
      fulfillment: "contact",
      instructions: "We'll send you secure payment instructions on WhatsApp.",
      contactChannel: "whatsapp",
      contactTarget: env.contact.whatsapp
    },
    {
      key: "telegram",
      name: "Pay via Telegram",
      kind: "other",
      enabled: false,
      order: 7,
      fulfillment: "contact",
      instructions: "Message us on Telegram to complete payment.",
      contactChannel: "telegram",
      contactTarget: env.contact.telegram
    }
  ]);

  await Team.insertMany(realTeams);
  await Venue.insertMany(venues);
  const insertedGames = await Game.insertMany(realGames);
  await TravelPackage.insertMany(travelPackages);

  // Sell tickets only for UPCOMING matches with confirmed teams (the Round of 32).
  // Past group matches are "ended"; later knockout slots have undetermined teams.
  const ticketGames = insertedGames.filter(
    (game) => game.status === "scheduled" && Boolean(game.homeTeamCode) && Boolean(game.awayTeamCode)
  );
  const ticketTypes = ticketGames.flatMap((game) => {
    const multiplier = stageMultiplier[game.stage] ?? 1;
    const matchLabel = `${game.homeLabel} vs ${game.awayLabel}`;
    return ticketTemplate.map((template, index) => {
      const priceUsd = Math.round(template.base * multiplier * 1000);
      const available = Math.max(2, template.qty - ((game.matchNumber + index) % 7));
      return {
        game: game._id,
        matchNumber: game.matchNumber,
        matchLabel,
        section: template.section,
        row: String.fromCharCode(65 + (index % 6)),
        category: template.category,
        deliveryType: "Mobile Entry",
        priceUsd,
        quantityTotal: template.qty,
        quantityAvailable: available,
        maxPerOrder: template.max,
        status: "active"
      };
    });
  });
  await TicketType.insertMany(ticketTypes);

  const adminPasswordHash = await hashPassword(env.adminPassword);
  await User.findOneAndUpdate(
    { email: env.adminEmail.toLowerCase() },
    {
      name: "Admin",
      email: env.adminEmail.toLowerCase(),
      role: "admin",
      passwordHash: adminPasswordHash
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const demoPasswordHash = await hashPassword("DemoPass2026!");
  await User.findOneAndUpdate(
    { email: "demo@worldcupconcierge.local" },
    {
      name: "Demo Traveler",
      email: "demo@worldcupconcierge.local",
      phone: "+1 555 555 0199",
      role: "user",
      passwordHash: demoPasswordHash
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log(
    `Seeded ${realTeams.length} teams, ${venues.length} venues, ${realGames.length} games (${ticketGames.length} on sale), ${travelPackages.length} packages, ${ticketTypes.length} ticket types.`
  );
  console.log(`Admin: ${env.adminEmail} / ${env.adminPassword}`);
  console.log("Demo user: demo@worldcupconcierge.local / DemoPass2026!");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
