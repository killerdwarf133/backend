import mongoose, { Schema, type InferSchemaType } from "mongoose";

const gameSchema = new Schema(
  {
    matchNumber: { type: Number, required: true, unique: true },
    stage: {
      type: String,
      enum: ["Group Stage", "Round of 32", "Round of 16", "Quarterfinal", "Semifinal", "Bronze Final", "Final"],
      required: true
    },
    date: { type: String, required: true },
    localTime: { type: String, required: true },
    city: { type: String, required: true, trim: true },
    stadium: { type: String, required: true, trim: true },
    region: { type: String, enum: ["Western", "Central", "Eastern"], required: true },
    homeTeamCode: { type: String, default: "", trim: true },
    awayTeamCode: { type: String, default: "", trim: true },
    homeLabel: { type: String, required: true, trim: true },
    awayLabel: { type: String, required: true, trim: true },
    homeFlag: { type: String, default: "" },
    awayFlag: { type: String, default: "" },
    status: { type: String, enum: ["scheduled", "live", "ended"], default: "scheduled" },
    homeScore: { type: Number, default: null },
    awayScore: { type: Number, default: null },
    deleted: { type: Boolean, default: false },
    source: { type: String, default: "2026 FIFA World Cup (Wikipedia)" }
  },
  { timestamps: true }
);

gameSchema.index({ city: 1, date: 1 });
gameSchema.index({ stage: 1 });
gameSchema.index({ homeTeamCode: 1, awayTeamCode: 1 });

export type GameDocument = InferSchemaType<typeof gameSchema> & { _id: mongoose.Types.ObjectId };
export const Game = mongoose.model("Game", gameSchema);
