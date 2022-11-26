import express from "express";
import multer from "multer";
import {
    createThreadHandler, getThread, getThreadsHandler
} from "../controllers/thread.controller";
import { verifyToken } from "../middleware/auth.middleware";

const upload = multer({dest: "./static/threads"});

const threadRouter = express.Router();

threadRouter.get("/", getThreadsHandler);
threadRouter.post("/", verifyToken, upload.single("threadImage"), createThreadHandler);

threadRouter.get("/:id", getThread);

export default threadRouter;
