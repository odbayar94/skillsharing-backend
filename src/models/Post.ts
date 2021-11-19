import { IPost } from "../interfaces";
import mongoose, { Schema, model, Model, Document } from "mongoose";
const { ObjectId } = require("mongodb");

const PostSchema = new Schema(
  {
    userId: { type: ObjectId, ref: "User" },

    status: {
      type: String,
      default: "Draft",
    },
    title: { type: String, required: true },
    context: { type: String, required: true },
    clapsNumber: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Post: Model<IPost> = model("Post", PostSchema);
export default Post;
