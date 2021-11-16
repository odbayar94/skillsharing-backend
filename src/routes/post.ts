import express from "express";
import * as posts from "../controller/posts";
import protect from "../middleware/protect";
// const { protect, authorize } = require("../middleware/protect");

const router = express.Router();

router.route("/").post(protect, posts.createPost).get(posts.getAllPosts);
// router.put("/:id", posts.updatePost);
router.get("/:id", posts.getSinglePost);

export default router;
