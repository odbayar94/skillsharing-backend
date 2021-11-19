import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import config from "../config";
import MyError from "../utils/MyError";
import Post from "../models/Post";

import {
  IError,
  IRegisterUser,
  IPostResponse,
  IPostCreate,
} from "../interfaces";

var response: IPostResponse = {
  success: false,
  statusCode: 401,
  messageCode: "error",
  message: "Service doesn't work",
};
var errorObj: IError = {
  message: "",
  messageCode: "",
  statusCode: 401,
};

export const getAllPosts = async function () {
  const posts = await Post.find({ status: "Published" });
  return posts;
};

export const getUserPosts = async function (userId: ObjectId) {
  const posts = await Post.find(userId);
  return posts;
};

export const getSinglePost = async function (id: ObjectId) {
  try {
    const post = await Post.findById(id);
    if (!post) {
      throw new Error();
    }
    return post;
  } catch (err: any) {
    throw new MyError({
      ...errorObj,
      message: "Бичвэр олдсонгүй",
      messageCode: "POST401",
    });
  }
};
export const createPost = async function (req: IPostCreate) {
  try {
    const { title, context, userId } = req;
    const post = await Post.create({
      title,
      context,
      userId,
    });
    if (!post) {
      throw new Error();
    }

    return post._id;
  } catch (err: any) {
    throw new Error(err.code);
  }
};
