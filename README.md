# Apex — Backend

Express + TypeScript + MongoDB (Mongoose) API for the Apex 2026 World Cup ticket
marketplace: ticket sales, peer-to-peer resale, travel packages, and admin-
configurable payment methods.

## Requirements

- Node 18+ and a MongoDB database (local or hosted, e.g. MongoDB Atlas)

## Setup

```bash
npm install
cp .env.example .env     # then edit .env (see the table below)
```

`.env` is git-ignored — never commit it. Use `.env.example` as the template.

| Variable | Purpose |
|---|---|
| `PORT` | API port (default 4000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | **change to a long random secret** |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | admin account the seeder creates — **change these** |
| `FRONTEND_URL` | frontend origin (CORS) |
| `PUBLIC_SITE_URL` | public site URL (used in payment messages) |
| `SEED_ON_START` | auto-seed on first start when DB is empty (default `true`) |
| `LISTING_FEE_USD` | P2P listing fee (default 25) |
| `CRYPTO_*_ADDRESS` | default crypto wallets (also editable in Admin → Payments) |
| `CONTACT_WHATSAPP/TELEGRAM/FACEBOOK_PAGE` | default targets for "pay via chat" methods |

## Develop

```bash
npm run dev      # tsx watch on src/server.ts (auto-seeds an empty DB on first run)
```

## Production

```bash
npm ci
npm run build    # tsc -> dist/
npm start        # node dist/server.js
```

That's it — **the database seeds itself automatically on the first start.**

## Seeding

Seeding is **automatic and runs only once**: on startup the server checks whether
the database is empty and, if so, seeds it (idempotent — restarts never re-seed
or wipe data). Disable with `SEED_ON_START=false`.

It seeds:

- **48 teams** (real 2026 World Cup field, full names + flags)
- **16 venues** + **104 real matches** (group-stage results are `ended`; the 16
  Round-of-32 fixtures are on sale)
- **5 travel packages** + **112 ticket types**
- **7 default payment methods** (crypto, Zelle, PayPal enabled; bank, Cash App,
  Telegram disabled — all editable in Admin → Payments)
- the **admin** user (`ADMIN_EMAIL` / `ADMIN_PASSWORD`) and a demo user

### Manual reset (destructive)

```bash
npm run seed         # dev (uses tsx)
npm run seed:prod    # production (compiled; run `npm run build` first)
```

> ⚠️ The manual commands **wipe every collection** and re-seed (a hard reset,
> including any real orders/users/listings). The automatic startup seed never
> does this — it only seeds an empty database.

Flag images live in the **frontend** repo at `public/assets/flags/*.svg`; the
seeder only stores their paths.
