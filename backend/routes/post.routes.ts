import express from "express";
import {
    createPostHandler,
    getAllPostsHandler,
    getPostHandler,
} from "../controllers/post.controller";

const postRouter = express.Router();

postRouter.get("/", getAllPostsHandler);
postRouter.post("/", createPostHandler);

postRouter.get("/:postId", getPostHandler);

export default postRouter;
