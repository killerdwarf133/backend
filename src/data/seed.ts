import { connectDb } from "../config/db.js";
import { runSeed } from "./runSeed.js";

// `npm run seed` / `npm run seed:prod` — a manual, DESTRUCTIVE reset that wipes
// every collection and re-seeds. The server also seeds automatically on first
// start (idempotently) via runSeed({ force: false }); this CLI forces a reset.
connectDb()
  .then(() => runSeed({ force: true }))
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
