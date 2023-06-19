import mongoose, { Schema, models } from "mongoose";

export const consertSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const ConsertRank =
  models?.consertRank || mongoose.model("consertRank", consertSchema);

export default ConsertRank;
