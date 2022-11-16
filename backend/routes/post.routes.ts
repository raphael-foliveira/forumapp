import express from "express";
import {
    createPostHandler,
    getAllPostsHandler,
    getPostHandler,
} from "../controllers/post.controller";
import { verifyToken } from "../middleware/auth.middleware";

const postRouter = express.Router();

postRouter.get("/", getAllPostsHandler);
postRouter.post("/", verifyToken, createPostHandler);

postRouter.get("/:postId", getPostHandler);

export default postRouter;
