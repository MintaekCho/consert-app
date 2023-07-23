import mongoose, { Schema, models } from "mongoose";

export const writeSchema = new Schema({
  title: {
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
  viewCount: {
    type: Number,
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

const Write = models?.write || mongoose.model("write", writeSchema);

export default Write;
