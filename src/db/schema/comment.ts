import mongoose, { Schema, models } from "mongoose";

export const commentSchema = new Schema({
  artistId: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  writer: {
    type: Object,
    require: true,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  isUpdated: {
    type: Boolean,
  },
});

const Comment = models?.comment || mongoose.model("comment", commentSchema);

export default Comment;
