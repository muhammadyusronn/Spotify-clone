import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    album: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true, // Duration in seconds
    },
    audioUrl: {
      type: String,
      required: true,
    },
    albumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      required: true,
    },
  },
  { timestamps: true },
);

const Song = mongoose.model("Song", songSchema);

export default Song;
