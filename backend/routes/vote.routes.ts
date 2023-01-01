import express from "express";
import VoteController from "../controllers/vote.controller";
import { verifyToken } from "../middleware/auth.middleware";

const voteRouter = express.Router();

voteRouter.get("/", VoteController.getVotesHandler);
voteRouter.get("/:id", VoteController.getVoteHandler);
voteRouter.delete("/", verifyToken, VoteController.deleteVoteHandler);
voteRouter.put("/", verifyToken, VoteController.upsertVoteHandler);

export default voteRouter;
