import express from "express";
import {
    createPostHandler,
    deleteVoteHandler,
    getPostHandler,
    getPostVotesHandler,
    upsertVoteHandler
} from "../controllers/post.controller";
import { verifyToken } from "../middleware/auth.middleware";

const postRouter = express.Router();

postRouter.get("/:id", getPostHandler);
postRouter.post("/", verifyToken, createPostHandler);

postRouter.get("/:id/votes", getPostVotesHandler)
postRouter.put("/:id/votes/:userid", verifyToken, upsertVoteHandler);
postRouter.delete("/:id/votes/:userid", verifyToken, deleteVoteHandler);

export default postRouter;
