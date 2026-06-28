import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 4000),
  mongoUri: process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/worldcup2026_packages",
  jwtSecret: process.env.JWT_SECRET ?? "dev-secret-change-before-production",
  adminEmail: process.env.ADMIN_EMAIL ?? "admin@worldcupconcierge.local",
  adminPassword: process.env.ADMIN_PASSWORD ?? "AdminPass2026!",
  frontendUrl: process.env.FRONTEND_URL ?? "http://localhost:5173",
  publicSiteUrl: process.env.PUBLIC_SITE_URL ?? "http://localhost:5173",
  listingFeeUsd: Number(process.env.LISTING_FEE_USD ?? 25),
  crypto: {
    btc: process.env.CRYPTO_BTC_ADDRESS ?? "bc1qexamplechangebeforelaunch",
    eth: process.env.CRYPTO_ETH_ADDRESS ?? "0xExampleChangeBeforeLaunch",
    usdtErc20: process.env.CRYPTO_USDT_ERC20_ADDRESS ?? "0xExampleUSDTerc20ChangeBeforeLaunch",
    usdtTrc20: process.env.CRYPTO_USDT_TRC20_ADDRESS ?? "TExampleUSDTtrc20ChangeBeforeLaunch"
  },
  contact: {
    whatsapp: process.env.CONTACT_WHATSAPP ?? "15551234567",
    telegram: process.env.CONTACT_TELEGRAM ?? "WorldCupConcierge",
    facebookPage: process.env.CONTACT_FACEBOOK_PAGE ?? "WorldCupConcierge"
  }
};
