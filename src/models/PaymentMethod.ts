import mongoose, { Schema, type InferSchemaType } from "mongoose";

/**
 * Admin-configurable payment method shown to buyers at checkout.
 *
 * `fulfillment` decides how a buyer pays:
 *  - "details": show on-page instructions (a crypto wallet, or account fields
 *    like a Zelle email / PayPal / bank / Cash App tag) the buyer pays to.
 *  - "contact": redirect the buyer to WhatsApp / Telegram / Facebook to send a
 *    pre-filled message and arrange payment.
 */
const networkSchema = new Schema(
  { label: { type: String, default: "" }, asset: { type: String, default: "" }, address: { type: String, default: "" } },
  { _id: false }
);

const fieldSchema = new Schema(
  { label: { type: String, default: "" }, value: { type: String, default: "" } },
  { _id: false }
);

const paymentMethodSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    kind: { type: String, enum: ["crypto", "zelle", "paypal", "bank", "cashapp", "other"], default: "other" },
    enabled: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    fulfillment: { type: String, enum: ["details", "contact"], default: "details" },
    instructions: { type: String, default: "" },
    // details + crypto: one entry per currency/network
    networks: { type: [networkSchema], default: [] },
    // details + non-crypto: account fields to display (label/value pairs)
    fields: { type: [fieldSchema], default: [] },
    // contact mode
    contactChannel: { type: String, enum: ["whatsapp", "telegram", "facebook", ""], default: "" },
    contactTarget: { type: String, default: "" }
  },
  { timestamps: true }
);

paymentMethodSchema.index({ enabled: 1, order: 1 });

export type PaymentMethodDocument = InferSchemaType<typeof paymentMethodSchema> & { _id: mongoose.Types.ObjectId };
export const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);
