import mongoose, { Schema, models } from "mongoose";

export const writeCommentSchema = new Schema({
  writeId: {
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
    type: String,
    require: true,
  },
  updatedAt: {
    type: String,
  },
  isUpdated: {
    type: Boolean,
    require: true,
  },
});

const WriteComment = models?.writeComment || mongoose.model("writeComment", writeCommentSchema);

export default WriteComment;
