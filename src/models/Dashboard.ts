import { IDashboard } from "../interfaces";
import { Schema, model, Model } from "mongoose";
const { ObjectId } = require("mongodb");

const DashboardSchema = new Schema(
  {
    salary: { type: Number },
    point: { type: Number },
    month: { type: String },
  },
  {
    timestamps: true,
  }
);

const Dashboard: Model<IDashboard> = model("Dashboard", DashboardSchema);
export default Dashboard;
