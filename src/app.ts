import express, { Request, Response } from "express";
import cors from "cors";

import dashboardRouter from "./routes/dashboard";
import userRouter from "./routes/user";
import postRouter from "./routes/post";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error";
import MyError from "./utils/MyError";

require("./db");

const whiteList = [process.env.FRONT_END];

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (origin == process.env.FRONT_END) {
      callback(null, true);
    } else {
      throw new MyError({
        message: "Хандах эрхгүй байна",
        messageCode: "AUTH401",
        statusCode: 401,
      });
    }
  },
  allowedHeaders: "Authorization, Set-Cookie, Content-Type",
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
};

const app = express();
app.use(cookieParser());
app.use(express.json());
// app.use(cors(corsOptions));

//router
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/dashboards", dashboardRouter);
app.use(errorHandler);

export default app;
//   return app;
// }
