import express from "express";
import { logInHandler, checkToken, logOutHandler } from "../controllers/auth.controller";
import { verifyToken } from "../middleware/auth.middleware";

const authRouter = express.Router();

authRouter.post("/login", logInHandler);
authRouter.post("/logout", verifyToken, logOutHandler);
authRouter.post("/verify-token", checkToken);

export default authRouter;
