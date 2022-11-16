import express from "express";
import { getTokenHandler } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/login");
authRouter.post("/get-token", getTokenHandler);

export default authRouter;
