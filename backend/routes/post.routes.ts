import express from "express";
import {
    createPostHandler,
    getAllPostsHandler,
    getPostHandler,
    getThreadsHandler,
} from "../controllers/post.controller";
import { verifyToken } from "../middleware/auth.middleware";

const postRouter = express.Router();

postRouter.get("/", getAllPostsHandler);
postRouter.post("/", verifyToken, createPostHandler);

postRouter.get("/threads", getThreadsHandler);

postRouter.get("/:postId", getPostHandler);

export default postRouter;
