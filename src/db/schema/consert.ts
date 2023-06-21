import mongoose, { Schema, models } from "mongoose";

export const consertSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  cast: {
    type: Array<{ type: String }>,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  grade: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    required: false,
  }
});

const Consert = models?.consert || mongoose.model("consert", consertSchema);

export default Consert;
