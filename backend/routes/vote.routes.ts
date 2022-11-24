import express from "express";
import { deleteVoteHandler, upsertVoteHandler } from "../controllers/vote.controller";
import { getVoteHandler, getVotesHandler } from "../controllers/vote.controller";
import { verifyToken } from "../middleware/auth.middleware";

const voteRouter = express.Router();

voteRouter.get("/", getVotesHandler);
voteRouter.get("/:id", getVoteHandler);
voteRouter.delete("/", verifyToken, deleteVoteHandler);
voteRouter.put("/", verifyToken, upsertVoteHandler);

export default voteRouter;
