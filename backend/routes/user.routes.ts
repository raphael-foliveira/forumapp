import express, { Request } from "express";
import fs from "fs";
import {
    getAllUsersHandler,
    createUserHandler,
    getUserHandler,
} from "../controllers/user.controller";
import multer from "multer";

const upload = multer({dest: "./static/users"});

const usersRouter = express.Router();

usersRouter.get("/", getAllUsersHandler);
usersRouter.post("/", upload.single("profilePicture"), createUserHandler);

usersRouter.get("/:userId", getUserHandler);

export default usersRouter;
