import express, { Request } from "express";
import fs from "fs";
import multer from "multer";
import {
    createThreadHandler,
    getThreadsHandler,
    getThread
} from "../controllers/thread.controller";
import { verifyToken } from "../middleware/auth.middleware";

const upload = multer({dest: "./static/threads"});

const threadRouter = express.Router();

threadRouter.get("/", getThreadsHandler);
threadRouter.post("/", verifyToken, upload.single("threadImage"), createThreadHandler);

threadRouter.get("/:id", getThread);

export default threadRouter;
