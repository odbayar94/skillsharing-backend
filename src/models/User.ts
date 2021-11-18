import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import mongoose, { Schema, model, Model, Document, ObjectId } from "mongoose";

import { IUserModel } from "../interfaces";

// const customValidateEmail = function (email: string) {
//   var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   return re.test(email);
// };

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: {
      type: String,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  const saltRounds = 10;

  if (this.modifiedPaths().includes("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User: Model<IUserModel> = model("User", UserSchema);
export default User;
