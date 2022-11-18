import express, { Request } from "express";
import fs from "fs";
import {
    getAllUsersHandler,
    createUserHandler,
    getUserHandler,
} from "../controllers/user.controller";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void
    ) => {
        const dir = "./static/" + req.body.username + "/profile-picture";
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

const usersRouter = express.Router();

usersRouter.get("/", getAllUsersHandler);
usersRouter.post("/", upload.single("profilePicture"), createUserHandler);

usersRouter.get("/:userId", getUserHandler);

export default usersRouter;
