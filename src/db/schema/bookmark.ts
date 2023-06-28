import mongoose, { Schema, models } from "mongoose";

export const bookmarkSchema = new Schema({
  artist: {
    type: Object,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
});

const Bookmark = models?.bookmark || mongoose.model("bookmark", bookmarkSchema);

export default Bookmark;
