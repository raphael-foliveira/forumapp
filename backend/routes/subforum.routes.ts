import express from "express";
import multer from "multer";
import {
    createSubForumHandler, getSubForumHandler, getSubForumsHandler, updateSubForumHandler
} from "../controllers/subforum.controller";
import { verifyToken } from "../middleware/auth.middleware";

const upload = multer({dest: "./static/subforums"});

const subForumRouter = express.Router();

subForumRouter.get("/", getSubForumsHandler);
subForumRouter.post("/", verifyToken, upload.single("image"), createSubForumHandler);

subForumRouter.get("/:name", getSubForumHandler);

subForumRouter.put("/:id", verifyToken, updateSubForumHandler)

export default subForumRouter;
