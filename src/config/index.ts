import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();

export default {
  port: process.env.PORT,
  databaseURL: process.env.MONGODB_URI,
  jwtSecret: "" + process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRESIN,
};
