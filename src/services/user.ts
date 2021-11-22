import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import config from "../config";
import MyError from "../utils/MyError";
import User from "../models/User";

import { IResponse, IError, IRegisterUser } from "../interfaces";

const checkPassword = async function (
  enteredPassword: string,
  userPassword: string
) {
  let isValid = await bcrypt.compare(enteredPassword, userPassword);
  return isValid;
};
const getJsonWebToken = async function (id: string, role: string) {
  const token = jwt.sign({ id, role }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });

  return token;
};

var response: IResponse = {
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

export const getUser = async function (email: string, password: string) {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      errorObj = {
        ...errorObj,
        message: "Нэр нууц үг буруу байна",
        messageCode: "LOGIN402",
      };
      throw new Error();
    }
    const passwordValid = await checkPassword(password, user.password);

    if (!passwordValid) {
      errorObj = {
        ...errorObj,
        message: "Нэр нууц үг буруу байна",
        messageCode: "LOGIN402",
      };
      throw new Error();
    }
    const token = await getJsonWebToken(user._id, user.role);
    response = {
      success: true,
      statusCode: 200,
      messageCode: "LOGIN200",
      message: "Системд амжилттай нэвтэрлээ",
      data: {
        id: user._id,
        token,
        firstname: user.firstname,
        email: user.email,
      },
    };

    return response;
  } catch (error) {
    throw new MyError(errorObj);
  }
};

export const registerUser = async function (req: IRegisterUser) {
  try {
    const { password, email, firstname, lastname } = req;
    const user = await User.create({
      password,
      email,
      firstname,
      lastname,
    });
    if (!user) {
      throw new Error();
    }
    response = {
      success: true,
      statusCode: 200,
      messageCode: "LOGIN200",
      message: "Системд амжилттай нэвтэрлээ",
      data: {
        id: user._id,
        firstname: user.firstname,
        email: user.email,
      },
    };
    return response;
  } catch (err: any) {
    throw new Error(err.code);
  }
};
