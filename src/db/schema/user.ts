import { ArtistData } from "@/types/_type";
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
});

const User = models?.user || mongoose.model("user", userSchema);

export default User;
