import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import config from "../config";
import MyError from "../utils/MyError";
import Post from "../models/Post";
import User from "../models/User";

import { IError, IPostResponse } from "../interfaces";
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
    const date = Date.now();
    let date_ob = new Date(date);
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();

    const dashboard = await Dashboard.findOne({ month: year + "-" + month });

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

export const generateDashboard = async function () {
  const date = Date.now();
  let date_ob = new Date(date);
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  Dashboard.create({ salary: 0, point: 0, month: year + "-" + month });
};
