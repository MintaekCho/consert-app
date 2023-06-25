import mongoose, { Schema, models } from "mongoose";

export const albumSchema = new Schema({
  artistName: {
    type: String,
    required: true,
  },
  albums: {
    type: Array,
  }
});

const Album = models?.album || mongoose.model("album", albumSchema);

export default Album;
