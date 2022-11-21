import { Request, Response } from "express";
import Post from "../entities/post.entity";
import User from "../entities/user.entity";
import Vote from "../entities/vote.entity";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

export const createPostHandler = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<Post | void> => {
    if (!req.user) {
        res.status(403).json({
            error: "Not authenticated.",
        });
        return;
    }

    try {
        const newPostData = Post.objects.create({
            author: req.user,
            parent: req.body.parent,
            content: req.body.content,
        });
        const newPost = await Post.objects.save(newPostData);
        res.status(201).json(newPost);
    } catch (e) {
        res.status(500).json(e);
    }
};

export const getPostHandler = async (req: Request, res: Response) => {
    const post = await Post.objects.findOne({
        where: {
            id: req.params.id,
        },
        relations: ["children", "parent", "author", "votes"],
    });
    if (!post) {
        console.log("Post not found.");
        res.sendStatus(404);
        return;
    }
    console.log("Found Post:");
    console.log(post);

    res.status(200).json(post);
};

export const getPostVotesHandler = async (req: Request, res: Response) => {
    const votes = await Vote.objects.find({
        where: {
            post: {
                id: req.params.id,
            },
        },
        relations: ["user", "post"]
    });
    console.log("Found Votes");
    console.log(votes);

    res.status(200).json(votes);
};

export const upsertVoteHandler = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        console.log("Unauthenticated request");
        res.sendStatus(403);
        return;
    }
    const selectedVote = await Vote.objects.findOne({
        where: {
            post: {
                id: req.params.id,
            },
            user: {
                id: req.params.userid,
            },
        },
        relations: {
            post: true,
            user: true,
        },
    });
    if (selectedVote) {
        console.log("Vote found");

        selectedVote.value = req.body.value as 1 | -1;
        const updatedVote = await Vote.objects.save(selectedVote);
        console.log(selectedVote);
        res.status(200).json(updatedVote);
        return;
    }
    console.log("Vote not found. Creating...");

    const newVote = Vote.objects.create({
        user: {
            id: req.params.userid,
        },
        post: {
            id: req.params.id,
        },
        value: req.body.value,
    });
    const result = await Vote.objects.save(newVote);
    console.log(result);

    res.status(200).json(result);
};

export const deleteVoteHandler = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        console.log("Unauthenticated request");
        res.sendStatus(403);
        return;
    }

    const vote = await Vote.objects.findOne({
        where: {
            user: {
                id: req.params.userid,
            },
            post: {
                id: req.params.id,
            },
        },
    });
    if (!vote) {
        console.log("Vote deletion failed.");
        res.sendStatus(500);
        return;
    }
    console.log("Deleting vote");
    console.log(vote);
    const result = await Vote.objects.delete(vote);
    res.status(200).json(result);
};
