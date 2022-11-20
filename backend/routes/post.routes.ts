import express, { Request } from "express";
import fs from "fs";
import multer from "multer";
import { createPostHandler, getPostHandler } from "../controllers/post.controller";
import { verifyToken } from "../middleware/auth.middleware";



const postRouter = express.Router();

postRouter.get("/:id", getPostHandler);
postRouter.post("/", verifyToken, createPostHandler);

export default postRouter;
