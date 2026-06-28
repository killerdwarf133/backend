import mongoose, { Schema, type InferSchemaType } from "mongoose";

const teamSchema = new Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    group: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    flag: { type: String, default: "" },
    qualified: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export type TeamDocument = InferSchemaType<typeof teamSchema> & { _id: mongoose.Types.ObjectId };
export const Team = mongoose.model("Team", teamSchema);
