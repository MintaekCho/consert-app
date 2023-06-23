import { ArtistData } from "@/types/_type";
import mongoose, { Schema, models } from "mongoose";

export interface UserData {
    email: string;
    name: string;
    profile: string;
    bookMarks: Array<ArtistData>
}

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
  bookMarks: {
    type: Array,
    required: false
  }
});

const User = models?.user || mongoose.model("user", userSchema);

export default User;
