import { Request, Response } from "express";
import Post from "../entities/post.entity";
import { SubForum } from "../entities/subforum.entity";
import { IsNull } from "typeorm";
import { RequestWithToken } from "../middleware/auth.middleware";
import { getUserFromToken } from "../services/token.service";

export const getSubForumHandler = async (req: Request, res: Response) => {
    const subForum = await SubForum.objects.findOne({
        where: {
            id: req.params.subForumId,
        },
    });
    if (!subForum) {
        res.sendStatus(404);
        return;
    }
    const threads = await Post.objects.find({
        where: {
            subForum: subForum,
            parent: IsNull(),
        },
    });
    res.status(200).json({
        subForum,
        threads,
    });
};

export const getAllSubForumsHandler = async (req: Request, res: Response) => {
    const allSubForums = await SubForum.objects.find({
        order: {
            createdAt: "DESC",
        },
        relations: ["admin"],
    });
    res.status(200).json(allSubForums);
};

export const createSubForumHandler = async (req: RequestWithToken, res: Response) => {
    if (!req.token) {
        res.sendStatus(400);
        return;
    }
    const authenticatedUser = await getUserFromToken(req.token);

    if (authenticatedUser && req.body.name && req.body.description) {
        const subForumData = {
            admin: authenticatedUser,
            name: req.body.name,
            description: req.body.description,
        };

        const subForumObject = SubForum.objects.create(subForumData);
        const newSubForum = await SubForum.objects.save(subForumObject);

        if (newSubForum) {
            res.status(201).json(newSubForum);
            return;
        }
    }
    res.sendStatus(400);
};
