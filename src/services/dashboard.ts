import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import config from "../config";
import MyError from "../utils/MyError";
import Post from "../models/Post";
import User from "../models/User";

import {
  IError,
  IRegisterUser,
  IPostResponse,
  IPostCreate,
  IUserModel,
} from "../interfaces";
import Dashboard from "../models/Dashboard";

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

export const getDashboardCurrent = async function () {
  try {
    const month = "date";
    const dashboard = await Dashboard.findOne({ month });

    if (!dashboard) {
      throw new Error();
    }

    return dashboard;
  } catch (err: any) {
    throw new MyError({
      ...errorObj,
      message: "Хяналтын мэдээлэл олдсонгүй",
      messageCode: "POST401",
    });
  }
};
