import Thread from "../entities/thread.entity";
import { Request, Response } from "express";

export const getAllThreadsHandler = async (req: Request, res: Response) => {
    const allThreads = await Thread.objects.find({
        relations: ["post"],
    });
    res.status(200).json(allThreads);
};

export const getThread = async (req: Request, res: Response) => {
    const singleThread = await Thread.objects.findOne({
        where: {
            id: req.params.postId,
        },
        relations: ["post"],
    });
    if (singleThread) {
        res.status(200).json(singleThread);
        return;
    }
    res.sendStatus(404);
};

export const createThreadHandler = async (req: Request, res: Response) => {
    const postObject = await Thread.objects.create(req.body);
    const newPost = await Thread.objects.save(postObject);
    if (newPost) {
        res.status(201).json(newPost);
        return;
    }
    res.sendStatus(400);
};
