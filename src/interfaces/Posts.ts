import { ObjectId } from "mongoose";

export interface IPostResponse {
  success: boolean;
  statusCode: number;
  message: string;
  messageCode: string;
  data?: {
    id: ObjectId;
  };
}

export interface IPost {
  id?: ObjectId;
  userId: ObjectId;
  status: string;
  title: string;
  context: string;
  clapsNumber: number;
}

export interface IPostCreate {
  title: string;
  context: string;
}
