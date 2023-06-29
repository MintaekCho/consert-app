import mongoose, { Schema, models } from "mongoose";

export const artistSchema = new Schema({
  profile: {
    type: String,
    required: true,
  },
  korName: {
    type: String,
    required: true,
  },
  enName: {
    type: String,
    required: true,
  },
  recentConserts: {
    type: Array,
  },
  album: {
    type: String,
  },
  bookmark: {
    type: Array,
  },
});

const Artist = models?.artist || mongoose.model("artist", artistSchema);

export default Artist;
