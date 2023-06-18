import mongoose, { Schema, models } from "mongoose";

export const consertSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const Consert = models?.consert || mongoose.model("consert", consertSchema);

export default Consert;
