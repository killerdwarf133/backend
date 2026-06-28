import mongoose, { Schema, type InferSchemaType } from "mongoose";

/**
 * Primary ticket inventory created by admins for a specific match.
 * Buyers purchase up to `maxPerOrder` from a type; `quantityAvailable`
 * is decremented as orders are placed.
 */
const ticketTypeSchema = new Schema(
  {
    game: { type: Schema.Types.ObjectId, ref: "Game", required: true },
    matchNumber: { type: Number, required: true },
    matchLabel: { type: String, default: "" },
    section: { type: String, required: true, trim: true },
    row: { type: String, default: "", trim: true },
    category: { type: String, default: "Standard", trim: true },
    deliveryType: { type: String, default: "Mobile Entry", trim: true },
    priceUsd: { type: Number, required: true, min: 0 },
    quantityTotal: { type: Number, default: 0, min: 0 },
    quantityAvailable: { type: Number, default: 0, min: 0 },
    maxPerOrder: { type: Number, default: 4, min: 1, max: 20 },
    status: { type: String, enum: ["active", "paused"], default: "active" },
    notes: { type: String, default: "" }
  },
  { timestamps: true }
);

ticketTypeSchema.index({ matchNumber: 1, priceUsd: 1 });
ticketTypeSchema.index({ status: 1 });

export type TicketTypeDocument = InferSchemaType<typeof ticketTypeSchema> & { _id: mongoose.Types.ObjectId };
export const TicketType = mongoose.model("TicketType", ticketTypeSchema);
