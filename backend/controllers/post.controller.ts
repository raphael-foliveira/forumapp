import Post from "../entities/post.entity";
import { Request, Response } from "express";
import { IsNull } from "typeorm";

export const getAllPostsHandler = async (req: Request, res: Response) => {
    const allPosts = await Post.objects.find({
        order: {
            createdAt: "DESC",
        },
        relations: ["author", "comments", "parent"],
    });
    res.status(200).json(allPosts);
};

export const getThreadsHandler = async (req: Request, res: Response) => {
    const allThreads = await Post.objects.find({
        order: {
            createdAt: "DESC",
        },
        where: {
            parent: IsNull(),
        },
        relations: ["author", "comments"],
    });
    res.status(200).json(allThreads);
};

export const getPostHandler = async (req: Request, res: Response) => {
    const post = await Post.objects.findOne({
        where: {
            id: req.params.postId,
        },
        relations: ["parent", "comments", "author"],
    });
    if (post) {
        res.status(200).json(post);
        return;
    }
    res.sendStatus(404);
};

export const createPostHandler = async (req: Request, res: Response) => {
    const postObject = await Post.objects.create(req.body);
    const newPost = await Post.objects.save(postObject);
    if (newPost) {
        res.status(201).json(newPost);
        return;
    }
    res.sendStatus(400);
};
