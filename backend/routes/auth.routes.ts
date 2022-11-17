import express from "express";
import { logInHandler, checkToken } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/login", logInHandler);
authRouter.post("/verify-token", checkToken)

export default authRouter;
