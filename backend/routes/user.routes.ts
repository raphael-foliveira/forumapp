import express from "express";
import multer from "multer";
import UserController from "../controllers/user.controller";

const upload = multer({ dest: "./static/users" });

const usersRouter = express.Router();

usersRouter.route("/")
	.get(UserController.getAllUsersHandler)
	.post(upload.single("profilePicture"), UserController.createUserHandler);

usersRouter.get("/:userId", UserController.getUserHandler);

export default usersRouter;
