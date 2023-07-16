import mongoose, { Schema, models } from "mongoose";

export const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: false,
  },
  displayName: {
    type: String,
    readonly: true,
  },
});

const User = models?.user || mongoose.model("user", userSchema);

export default User;
