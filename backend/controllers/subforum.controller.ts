import { Request, Response } from "express";
import Thread from "../entities/thread.entity";
import SubForum from "../entities/subforum.entity";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { getUserFromToken } from "../services/token.service";
import { dataSource } from "../db/data-source";

export const getSubForumHandler = async (req: Request, res: Response) => {
    const subForum = await SubForum.objects.findOne({
        where: {
            name: req.params.name,
        },
        relations: ["members", "threads", "admin"],
    });
    if (!subForum) {
        res.sendStatus(404);
        return;
    }
    res.status(200).json(subForum);
};

export const getAllSubForumsHandler = async (req: Request, res: Response) => {
    const allSubForums = await SubForum.objects.find({
        order: {
            createdAt: "DESC",
        },
        relations: ["admin", "members", "threads"],
    });
    res.status(200).json(allSubForums);
};

export const updateSubForumHandler = async (req: Request, res: Response) => {
    const subForum = await SubForum.objects.update(req.body.id, req.body);
    if (!subForum) {
        res.status(400).json({
            message: "SubForum does not exist.",
        });
        return;
    }
    res.status(200).json(subForum);
};

export const addMemberHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {

        const response = await dataSource
        .createQueryBuilder()
        .insert()
        .into("sub_forum_members_user")
        .values(req.body)
        .execute();
        
        res.status(200).json(response);
    } catch (e) {
        res.status(400).json(e)
    }
};

export const deleteMemberHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {

        const response = await dataSource
        .createQueryBuilder()
        .delete()
        .from("sub_forum_members_user")
        .where({
            subForumId: req.params.id,
            userId: req.params.memberid,
        })
        .execute();
        
        res.status(200);
    } catch (e) {
        res.status(400).json(e)
    }
};

export const createSubForumHandler = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.body.name || !req.body.description || !req.user) {
        res.sendStatus(400);
        return;
    }
    const subForumData = {
        admin: req.user,
        name: req.body.name,
        description: req.body.description,
        image: req.file?.path || "",
        members: [req.user],
    };

    const subForumObject = SubForum.objects.create(subForumData);
    const newSubForum = await SubForum.objects.save(subForumObject);

    if (!newSubForum) {
        res.status(400).json({
            message: "SubForum could not be created.",
        });
        return;
    }
    res.status(201).json(newSubForum);
};
