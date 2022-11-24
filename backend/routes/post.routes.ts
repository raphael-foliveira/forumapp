import express from "express";
import {
    createPostHandler,
    getPostHandler,
} from "../controllers/post.controller";
import { verifyToken } from "../middleware/auth.middleware";

const postRouter = express.Router();

postRouter.get("/:id", getPostHandler);
postRouter.post("/", verifyToken, createPostHandler);

export default postRouter;
