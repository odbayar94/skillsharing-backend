import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
const { ObjectId } = require("mongodb");

import { IError, IRequest, IPostResponse } from "../interfaces";
import MyError from "../utils/MyError";
import User from "../models/User";

import * as service from "../services";

var response: IPostResponse = {
  success: false,
  statusCode: 401,
  messageCode: "error",
  message: "Service doesn't work",
};

var errorObj: IError = {
  message: "",
  messageCode: "LOGIN400",
  statusCode: 401,
};

export const clapPost = asyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const postId = await service.clapPost(req.params.id);
    response = {
      success: true,
      statusCode: 200,
      messageCode: "POST200",
      message: "Хүсэлт амжилттай",
      data: {
        id: postId,
      },
    };
    res.status(200).json(response);
  }
);

export const publishPost = asyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    req.body.userId = req.userId;
    req.body.postId = req.params.id;
    const post = await service.publishPost(req.body);

    response = {
      success: true,
      statusCode: 200,
      messageCode: "POST200",
      message: "Хүсэлт амжилттай",
      data: post,
    };
    res.status(200).json(response);
  }
);
export const createPost = asyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    req.body.userId = req.userId;
    const postId = await service.createPost(req.body);

    response = {
      success: true,
      statusCode: 200,
      messageCode: "POST200",
      message: "Хүсэлт амжилттай",
      data: {
        id: postId,
      },
    };
    res.status(200).json(response);
  }
);

// export const updatePost = asyncHandler(
//   async (req: IRequest, res: Response, next: NextFunction) => {
//     // const user = await User.create({username, password, email})
//     const user = await service.updatePost(req.body);
//     res.status(200).json({
//       success: true,
//       user: user,
//     });
//   }
// );

export const getAllPosts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //after I will add the pagination

    const posts = await service.getAllPosts();
    response = {
      success: true,
      statusCode: 200,
      messageCode: "POST200",
      message: "Хүсэлт амжилттай",
      data: posts,
    };
    res.status(200).json(response);
  }
);

export const getUserPosts = asyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const post = await service.getUserPosts(ObjectId(req.userId));
    response = {
      success: true,
      statusCode: 200,
      messageCode: "POST200",
      message: "Хүсэлт амжилттай",
      data: post,
    };
    res.status(200).json(response);
  }
);

export const getSinglePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await service.getSinglePost(ObjectId(req.params.id));
    response = {
      success: true,
      statusCode: 200,
      messageCode: "POST200",
      message: "Хүсэлт амжилттай",
      data: post,
    };
    res.status(200).json(response);
  }
);
