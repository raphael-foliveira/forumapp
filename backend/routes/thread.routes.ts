import express from "express";
import multer from "multer";
import ThreadController from "../controllers/thread.controller";
import { verifyToken } from "../middleware/auth.middleware";

const upload = multer({ dest: "./static/threads" });

const threadRouter = express.Router();

threadRouter.route("/")
	.get(ThreadController.getThreadsHandler)
	.post(verifyToken, upload.single("threadImage"), ThreadController.createThreadHandler);

threadRouter.get("/:id", ThreadController.getThread);

export default threadRouter;
