import mongoose, { Schema, type InferSchemaType } from "mongoose";

const venueSchema = new Schema(
  {
    city: { type: String, required: true, unique: true, trim: true },
    country: { type: String, required: true, trim: true },
    region: { type: String, enum: ["Western", "Central", "Eastern"], required: true },
    stadium: { type: String, required: true, trim: true },
    capacity: { type: Number, required: true },
    hotels: [{ type: String, trim: true }]
  },
  { timestamps: true }
);

export type VenueDocument = InferSchemaType<typeof venueSchema> & { _id: mongoose.Types.ObjectId };
export const Venue = mongoose.model("Venue", venueSchema);
