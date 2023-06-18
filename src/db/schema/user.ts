import mongoose, { Schema, models } from "mongoose";

export const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const User = models?.user || mongoose.model("user", userSchema);

export default User;
