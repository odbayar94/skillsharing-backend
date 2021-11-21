import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import config from "../config";
import MyError from "../utils/MyError";
import Post from "../models/Post";
import User from "../models/User";
import Dashboard from "../models/Dashboard";
import * as service from "./index";

import {
  IError,
  IRegisterUser,
  IPostResponse,
  IPostCreate,
  IUserModel,
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

export const clapPost = async function (id: any) {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: id },
      { $inc: { clapsNumber: 1 } }
    );

    if (!post) {
      throw new Error();
    }
    //end umnuh clapsNumber iig butsaagaad bgaa uchraas 1r nemegduulev
    return { id: post._id, clapsNumber: post.clapsNumber + 1 };
  } catch (err: any) {
    throw new MyError({
      ...errorObj,
      message: "Пост бичлэг олдсонгүй",
      messageCode: "POST401",
    });
  }
};
export const publishPost = async function (req: any) {
  try {
    const user = await User.findById(req.userId);
    service.generateDashboard();

    if (!user || user.role !== "admin") {
      throw new Error();
    }
    const post = await Post.findOneAndUpdate(
      { _id: req.postId },
      { status: "Published" }
    );
    if (!post) {
      throw new Error();
    }
    return post._id;
  } catch (err: any) {
    throw new MyError({
      ...errorObj,
      message: "Энэ үйлдлийг хийхэд таны эрх хүрсэнгүй",
      messageCode: "POST401",
    });
  }
};
export const getAllPosts = async function () {
  const posts = await Post.find();
  return posts;
};
export const getApprovedPosts = async function () {
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

const computeReadTime = function (context: String) {
  //there are need to compute read time,
  //after need to imporve the algorithm.
  //https://infusion.media/content-marketing/how-to-calculate-reading-time/
  const time = Math.floor(context.split(" ").length / 200);

  return time == 0 ? 1 : time;
};
export const createPost = async function (req: IPostCreate) {
  try {
    const { title, context, userId } = req;
    const post = await Post.create({
      title,
      context,
      userId,
      time: computeReadTime(context),
    });
    if (!post) {
      throw new Error();
    }

    return post._id;
  } catch (err: any) {
    throw new Error(err.code);
  }
};
