import { app } from "./app.js";
import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";
import { runSeed } from "./data/runSeed.js";

async function start() {
  await connectDb();

  // Seed automatically on first start, only when the DB is empty (idempotent).
  // Set SEED_ON_START=false to disable. A failure here won't stop the server.
  if (env.seedOnStart) {
    try {
      await runSeed({ force: false });
    } catch (error) {
      console.error("Seed-on-start failed:", error);
    }
  }

  app.listen(env.port, () => {
    console.log(`API listening on http://localhost:${env.port}`);
  });
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
