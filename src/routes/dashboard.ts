import express from "express";
import * as dashboard from "../controller/dashboard";
import protect from "../middleware/protect";
// const { protect, authorize } = require("../middleware/protect");

const router = express.Router();

router.route("/").get(protect, dashboard.getDashboardCurrent);

export default router;
