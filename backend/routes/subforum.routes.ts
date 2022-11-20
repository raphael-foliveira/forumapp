import express from "express";
import multer from "multer";
import {
    addMemberHandler,
    createSubForumHandler,
    deleteMemberHandler,
    getAllSubForumsHandler,
    getSubForumHandler,
    updateSubForumHandler
} from "../controllers/subforum.controller";
import { verifyToken } from "../middleware/auth.middleware";

const upload = multer({dest: "./static/subforums"});

const subForumRouter = express.Router();

subForumRouter.get("/", getAllSubForumsHandler);
subForumRouter.post("/", verifyToken, upload.single("image"), createSubForumHandler);

subForumRouter.get("/:name", getSubForumHandler);

subForumRouter.put("/:id", verifyToken, updateSubForumHandler)
subForumRouter.post("/:id/members", verifyToken, addMemberHandler)
subForumRouter.delete("/:id/members/:memberid", verifyToken, deleteMemberHandler)

export default subForumRouter;
