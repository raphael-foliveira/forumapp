import MemberController from "../controllers/member.controller";
import express from "express";

const memberRouter = express.Router();

memberRouter.post("/", MemberController.addMemberHandler);

export default memberRouter;
