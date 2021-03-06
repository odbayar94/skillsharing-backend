import { ObjectId } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { type } from "os";

export interface IUserCreate {
  email: string;
  password: string;
  username: string;
}

export type TTokenObj = {
  id: ObjectId;
  role: string;
};

export interface IRequest extends Request {
  userId?: ObjectId;
  userRole?: string;
}

export interface IResponse {
  success: boolean;
  statusCode: number;
  message: string;
  messageCode: string;
  user?: IUser;
  // post?: IPost;
  data?: any;
}

export interface IUser {
  id: ObjectId;
  token?: string;
  firstname?: string;
  email?: string;
}

export interface IData {
  shortenUri?: string;
}

export interface ILogin {
  password: string;
  username: string;
}

export interface IError {
  message: string;
  messageCode: string;
  statusCode: number;
}

export interface IUserModel extends Document {
  username: string;
  email: string;
  role: string;
  password: string;
  lastname: string;
  firstname: string;
  createdAt: number;
  lastLogin: number;
}

export interface IRegisterUser {
  username: string;
  lastname: string;
  firstname: string;
  email: string;
  password: string;
}
