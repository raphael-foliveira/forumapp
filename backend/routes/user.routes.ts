import express from "express";
import multer from "multer";
import {
    createUserHandler, getAllUsersHandler, getUserHandler
} from "../controllers/user.controller";

const upload = multer({dest: "./static/users"});

const usersRouter = express.Router();

usersRouter.get("/", getAllUsersHandler);
usersRouter.post("/", upload.single("profilePicture"), createUserHandler);

usersRouter.get("/:userId", getUserHandler);

export default usersRouter;
