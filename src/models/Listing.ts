import mongoose, { Schema, type InferSchemaType } from "mongoose";

/**
 * Peer-to-peer resale listing. A seller submits proof of ownership and pays a
 * listing fee; an admin reviews and approves it before it goes live in the
 * marketplace, where other users can buy it.
 *
 * Lifecycle: pending_review -> active -> sold
 *                            \-> rejected   (admin)
 *            (any) -> cancelled                (seller)
 */
const listingSchema = new Schema(
  {
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
    game: { type: Schema.Types.ObjectId, ref: "Game", required: true },
    matchNumber: { type: Number, required: true },
    matchLabel: { type: String, default: "" },
    section: { type: String, required: true, trim: true },
    row: { type: String, default: "", trim: true },
    quantity: { type: Number, default: 1, min: 1, max: 10 },
    priceUsd: { type: Number, required: true, min: 1 },
    deliveryType: { type: String, default: "Mobile Entry", trim: true },
    notes: { type: String, default: "" },
    // Data-URL of the uploaded proof-of-ownership image (client-resized).
    // Optional: admin-created listings are pre-approved and don't require it.
    proofImage: { type: String, default: "" },
    listingFeeUsd: { type: Number, required: true, min: 0 },
    feeStatus: { type: String, enum: ["unpaid", "reported", "paid"], default: "unpaid" },
    feePayment: {
      method: { type: String, default: "" },
      methodName: { type: String, default: "" },
      network: { type: String, default: "" },
      address: { type: String, default: "" },
      details: { type: [{ label: { type: String, default: "" }, value: { type: String, default: "" } }], default: [] },
      instructions: { type: String, default: "" },
      contactChannel: { type: String, default: "" },
      redirectUrl: { type: String, default: "" },
      message: { type: String, default: "" },
      reportedAt: { type: Date, default: null }
    },
    status: {
      type: String,
      enum: ["pending_review", "active", "rejected", "sold", "cancelled"],
      default: "pending_review"
    },
    reviewNote: { type: String, default: "" },
    approvedAt: { type: Date, default: null },
    soldAt: { type: Date, default: null }
  },
  { timestamps: true }
);

listingSchema.index({ status: 1, matchNumber: 1, priceUsd: 1 });
listingSchema.index({ seller: 1, createdAt: -1 });

export type ListingDocument = InferSchemaType<typeof listingSchema> & { _id: mongoose.Types.ObjectId };
export const Listing = mongoose.model("Listing", listingSchema);
