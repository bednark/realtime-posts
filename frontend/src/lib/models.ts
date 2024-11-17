import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    max: 20
  },
  content: {
    type: String,
    required: true,
    max: 200
  },
  creationTime: {
    type: Date,
    required: true
  }
});

export const PostModel = mongoose.models.Post || mongoose.model("Post", postSchema);