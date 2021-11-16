import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
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

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //request handler, validation
    const { username, password } = req.body;
    if (!username || !password) {
      throw new MyError({ ...errorObj, message: "Нэр нууц үг оруулна уу" });
    }

    const userResponse = await service.getUser(username, password);
    //response handler, custom message ...
    res.status(userResponse.statusCode).json(userResponse);
  }
);
export const registerUser = asyncHandler(
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
