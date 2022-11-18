import express, { Request } from "express";
import fs from "fs";
import multer from "multer";
import {
    createThreadHandler,
    getAllThreadsHandler,
    getThread
} from "../controllers/thread.controller";
import { verifyToken } from "../middleware/auth.middleware";

const storage = multer.diskStorage({
    destination: (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void
    ) => {
        const dir = "./static/subForums/" + req.body.name + "/image";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },
    filename: (
        req: Request,
        file: Express.Multer.File,
        cb: (error: any, filename: string) => void
    ) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

const threadRouter = express.Router();

threadRouter.get("/", getAllThreadsHandler);
threadRouter.post("/", verifyToken, upload.single("image"), createThreadHandler);

threadRouter.get("/:threadId", getThread);

export default threadRouter;
