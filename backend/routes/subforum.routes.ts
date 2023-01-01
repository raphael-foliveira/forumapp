import express from "express";
import multer from "multer";
import SubForumController from "../controllers/subforum.controller";
import { verifyToken } from "../middleware/auth.middleware";

const upload = multer({ dest: "./static/subforums" });

const subForumRouter = express.Router();

subForumRouter.route("/")
	.get(SubForumController.getSubForumsHandler)
	.post(verifyToken, upload.single("image"), SubForumController.createSubForumHandler);

subForumRouter.get("/:name", SubForumController.getSubForumHandler);

subForumRouter.put("/:id", verifyToken, SubForumController.updateSubForumHandler);

subForumRouter.delete("/:id/:memberid", verifyToken, SubForumController.deleteMemberHandler);

export default subForumRouter;
