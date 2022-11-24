import { addMemberHandler } from "../controllers/member.controller";
import express from "express";

const memberRouter = express.Router();

memberRouter.post("/", addMemberHandler);

export default memberRouter;
