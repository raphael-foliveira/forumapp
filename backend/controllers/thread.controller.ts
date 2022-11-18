import Thread from "../entities/thread.entity";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import Post from "../entities/post.entity";
import SubForum from "../entities/subforum.entity";

export const getAllThreadsHandler = async (req: Request, res: Response) => {
    const allThreads = await Thread.objects.find({
        relations: ["post"],
    });
    res.status(200).json(allThreads);
};

export const getThread = async (req: Request, res: Response) => {
    const singleThread = await Thread.objects.findOne({
        where: {
            id: req.params.id,
        },
        relations: ["post"],
    });
    if (singleThread) {
        res.status(200).json(singleThread);
        return;
    }
    res.sendStatus(404);
};

export const createThreadHandler = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.body.name || !req.body.description || !req.user) {
        res.sendStatus(400);
        return;
    }
    const subForum = await SubForum.objects.findOne({
        where: {
            name: req.params.name,
        },
    });
    if (!subForum) {
        res.sendStatus(400).json({
            message: "SubForum does not exist.",
        });
        return;
    }

    const postData = {
        author: req.user,
        content: req.body.content,
    };

    const postObject = Post.objects.create(postData);
    const newPost = await Post.objects.save(postObject);

    const threadData = {
        title: req.body.title,
        content: req.body.content,
        image: req.file?.path || "",
        subForum: subForum,
        post: newPost,
    };

    const threadObject = Thread.objects.create(threadData);
    const newThread = await Thread.objects.save(threadObject);

    if (!newThread) {
        res.status(400).json({
            message: "Thread could not be created.",
        });
        return;
    }
    res.status(201).json(newThread);
};
