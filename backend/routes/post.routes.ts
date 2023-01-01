import express from "express";
import PostController from "../controllers/post.controller";
import { verifyToken } from "../middleware/auth.middleware";

const postRouter = express.Router();

postRouter.get("/:id", PostController.getPostHandler);
postRouter.post("/", verifyToken, PostController.createPostHandler);

export default postRouter;
