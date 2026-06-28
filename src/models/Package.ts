import mongoose, { Schema, type InferSchemaType } from "mongoose";

const packageVariantSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    hotel: { type: String, default: "" },
    roomType: { type: String, default: "" },
    city: { type: String, default: "" },
    nights: { type: Number, required: true },
    priceFromUsd: { type: Number, default: null },
    callForRates: { type: Boolean, default: false },
    taxNote: { type: String, default: "" }
  },
  { _id: false }
);

const travelPackageSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    dateRange: { type: String, required: true, trim: true },
    city: { type: String, default: "" },
    shortDescription: { type: String, required: true },
    longDescription: { type: String, required: true },
    baseNights: { type: Number, required: true },
    minNights: { type: Number, required: true },
    maxNights: { type: Number, required: true },
    priceFromUsd: { type: Number, required: true },
    featured: { type: Boolean, default: false },
    inclusions: [{ type: String, trim: true }],
    addOns: [{ type: String, trim: true }],
    variants: [packageVariantSchema],
    relatedCities: [{ type: String, trim: true }],
    relatedMatchNumbers: [{ type: Number }],
    brochurePage: { type: Number, required: true }
  },
  { timestamps: true }
);

travelPackageSchema.index({ category: 1 });

export type TravelPackageDocument = InferSchemaType<typeof travelPackageSchema> & {
  _id: mongoose.Types.ObjectId;
};
export const TravelPackage = mongoose.model("TravelPackage", travelPackageSchema);
