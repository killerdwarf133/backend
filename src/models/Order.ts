import mongoose, { Schema, type InferSchemaType } from "mongoose";

/**
 * A single order record covering every purchase type on the platform:
 *  - "package": a travel package reservation (legacy flow)
 *  - "ticket":  a primary ticket purchase from admin inventory
 *  - "resale":  a peer-to-peer resale purchase from another user's listing
 * The shared `payment` sub-document + status flow is reused across all three.
 */
const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderType: { type: String, enum: ["package", "ticket", "resale"], default: "package" },

    // Package purchases
    package: { type: Schema.Types.ObjectId, ref: "TravelPackage" },
    packageSlug: { type: String, default: "" },
    packageTitle: { type: String, default: "" },
    variantId: { type: String, default: "" },
    variantTitle: { type: String, default: "" },
    travelerCount: { type: Number, default: 1, min: 1 },
    selectedMatchNumbers: [{ type: Number }],

    // Ticket / resale purchases
    ticketType: { type: Schema.Types.ObjectId, ref: "TicketType" },
    listing: { type: Schema.Types.ObjectId, ref: "Listing" },
    matchNumber: { type: Number },
    matchLabel: { type: String, default: "" },
    seatInfo: { type: String, default: "" },
    quantity: { type: Number, default: 1, min: 1 },
    unitPriceUsd: { type: Number, default: 0 },

    notes: { type: String, default: "" },
    totalAmountUsd: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["pending", "awaiting_payment", "payment_reported", "confirmed", "cancelled"],
      default: "pending"
    },
    payment: {
      method: { type: String, default: "" },
      methodName: { type: String, default: "" },
      network: { type: String, default: "" },
      address: { type: String, default: "" },
      details: { type: [{ label: { type: String, default: "" }, value: { type: String, default: "" } }], default: [] },
      instructions: { type: String, default: "" },
      contactChannel: { type: String, default: "" },
      redirectUrl: { type: String, default: "" },
      message: { type: String, default: "" },
      reportedAt: { type: Date, default: null },
      reportNote: { type: String, default: "" }
    }
  },
  { timestamps: true }
);

orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ orderType: 1, createdAt: -1 });

export type OrderDocument = InferSchemaType<typeof orderSchema> & { _id: mongoose.Types.ObjectId };
export const Order = mongoose.model("Order", orderSchema);
