import { Request, Response } from "express";
import Post from "../entities/post.entity";
import { SubForum } from "../entities/subforum.entity";
import { IsNull } from "typeorm";

export const getSubForumHandler = async (req: Request, res: Response) => {
    const subForum = await SubForum.objects.findOne({
        where: {
            id: req.params.subForumId,
        },
    });
    if (subForum) {
        const threads = await Post.objects.find({
            where: {
                subForum: subForum,
                parent: IsNull(),
            },
        });
        res.status(200).json({
            subForum,
            threads
        })
    }
};

export const getAllSubForumsHandler = async (req: Request, res: Response) => {
    const allSubForums = await SubForum.objects.find({
        order: {
            createdAt: "DESC"
        }
    });
    res.status(200).json(allSubForums);
};

export const createSubForumHandler = async (req: Request, res: Response) => {
    const subForumObject = await SubForum.objects.create(req.body);
    const newSubForum = await SubForum.objects.save(subForumObject);
    if (newSubForum) {
        res.status(201).json(newSubForum);
        return;
    }
    res.sendStatus(400);
};
