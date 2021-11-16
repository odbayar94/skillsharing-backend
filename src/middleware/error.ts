import { Request, Response, NextFunction } from "express";

export default function errorHandler (err: any, req: Request,res: Response, next: NextFunction){
    console.log(err.stack);
  
    const error = { ...err };
    error.message = err.message;
  
  
    if (error.message === "jwt malformed") {
      error.message = "Та логин хийж байж энэ үйлдлийг хийх боломжтой...";
      error.statusCode = 401;
    }

    if (error.message === "11000") {
      error.message = "Энэ талбарын утгыг давхардуулж өгч болохгүй!";
      error.statusCode = 406;
    }
  
    if (error.name === "JsonWebTokenError" && error.message === "invalid token") {
      error.message = "Буруу токен дамжуулсан байна!";
      error.statusCode = 400;
    }
  
    if (error.code === 11000) {
      error.message = "Энэ талбарын утгыг давхардуулж өгч болохгүй!";
      error.statusCode = 400;
    }
    res.status(error.statusCode || 500).json({
      success: false,
      error,
    });
  };