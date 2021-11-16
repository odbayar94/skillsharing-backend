import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

import { IError } from "../interfaces";
import MyError from "../utils/MyError";
import User from "../models/User";

import * as service from "../services";

var errorObj: IError = {
  message: "",
  messageCode: "LOGIN400",
  statusCode: 401,
};

export const createPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.createPost(req.body);
    // req.body;
    // const response = true;
    res.status(200).json(response);
  }
);
export const updatePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, email, lastname, firstname } = req.body;

    // const user = await User.create({username, password, email})
    const user = await service.registerUser(req.body);
    res.status(200).json({
      success: true,
      user: user,
    });
  }
);

export const getAllPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, email, lastname, firstname } = req.body;

    // const user = await User.create({username, password, email})
    const user = await service.registerUser(req.body);
    res.status(200).json({
      success: true,
      user: user,
    });
  }
);

export const getSinglePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, email, lastname, firstname } = req.body;

    // const user = await User.create({username, password, email})
    const user = await service.registerUser(req.body);
    res.status(200).json({
      success: true,
      user: user,
    });
  }
);
