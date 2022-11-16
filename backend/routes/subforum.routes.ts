import express from "express";
import {
    createSubForumHandler,
    getAllSubForumsHandler,
    getSubForumHandler,
} from "../controllers/subforum.controller";

const subForumRouter = express.Router();

subForumRouter.get("/", getAllSubForumsHandler);
subForumRouter.post("/", createSubForumHandler);

subForumRouter.get("/:subForumId", getSubForumHandler);

export default subForumRouter;
