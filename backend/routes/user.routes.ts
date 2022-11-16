import express from "express";
import {
    getAllUsersHandler,
    createUserHandler,
    getUserHandler,
} from "../controllers/user.controller";

const usersRouter = express.Router();

usersRouter.get("/", getAllUsersHandler);
usersRouter.post("/", createUserHandler);

usersRouter.get("/:userId", getUserHandler);

export default usersRouter;
