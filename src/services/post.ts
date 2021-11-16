import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export const createPost = async function (req: IPostCreate) {
  try {
    const { title, context } = req;
    const post = await Post.create({
      title,
      context,
    });
    if (!post) {
      throw new Error();
    }
    response = {
      success: true,
      statusCode: 200,
      messageCode: "POST200",
      message: "Хүсэлт амжилттай",
      data: {
        id: post._id,
      },
    };
    return response;
  } catch (err: any) {
    throw new Error(err.code);
  }
};
