import express from "express";
import userModel from "../models/User";
import * as users from "../controller/users";

const router = express.Router();

router.post("/register", users.registerUser);
router.post("/login", users.login);

export default router;
