import Post from "../entities/post.entity";
import { Request, Response } from "express";

export const getAllPostsHandler = async (req: Request, res: Response) => {
    const allPosts = await Post.objects.find({
        order: {
            createdAt: "DESC",
        },
    });
    res.status(200).json(allPosts);
};

export const getPostHandler = async (req: Request, res: Response) => {
    const post = await Post.objects.findOne({
        where: {
            id: parseInt(req.params.postId),
        },
        relations: ["parent", "comments"],
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
