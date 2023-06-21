import { ArtistData } from "@/components/ArtistWrap";
import mongoose, { Schema, models } from "mongoose";
import Artist from "./artist";

export interface UserData {
    email: string;
    name: string;
    image: string;
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
