import express from "express";
import AuthController from "../controllers/auth.controller";
import { verifyToken } from "../middleware/auth.middleware";

const authRouter = express.Router();

authRouter.post("/login", AuthController.logInHandler);
authRouter.post("/logout", verifyToken, AuthController.logOutHandler);
authRouter.post("/verify-token", AuthController.checkToken);

export default authRouter;
