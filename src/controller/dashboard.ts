import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
const { ObjectId } = require("mongodb");

import { IRequest, IPostResponse } from "../interfaces";

import * as service from "../services";

var response: IPostResponse = {
  success: false,
  statusCode: 401,
  messageCode: "error",
  message: "Service doesn't work",
};

export const getDashboardCurrent = asyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const dashboard = await service.getDashboardCurrent();
    response = {
      success: true,
      statusCode: 200,
      messageCode: "POST200",
      message: "Хүсэлт амжилттай",
      data: dashboard,
    };
    res.status(200).json(response);
  }
);
