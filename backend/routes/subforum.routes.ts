import express from "express";
import {
    createSubForumHandler,
    getAllSubForumsHandler,
    getSubForumHandler,
} from "../controllers/subforum.controller";
import { verifyToken } from "../middleware/auth.middleware";

const subForumRouter = express.Router();

subForumRouter.get("/", getAllSubForumsHandler);
subForumRouter.post("/", verifyToken, createSubForumHandler);

subForumRouter.get("/:subForumId", getSubForumHandler);

export default subForumRouter;
