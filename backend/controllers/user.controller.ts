import { Request, Response } from "express";
import User  from "../entities/user.entity";

export const getAllUsersHandler = async (req: Request, res: Response) => {
    const allUsers = await User.objects.find();
    res.status(200).json(allUsers);
};

export const getUserHandler = async (req: Request, res: Response) => {
    const user = await User.objects.findOne({
        where: {
            id: parseInt(req.params.userId),
        },
        relations: ["posts"]

    });
    if (user) {
        res.status(200).json(user);
        return;
    }
    res.sendStatus(404);
};

export const createUserHandler = async (req: Request, res: Response) => {
    const newUser = await User.objects.create(req.body);
    const result = await User.objects.save(newUser);
    if (result) {
        res.status(201).json(newUser);
        return;
    }
    res.sendStatus(400);
};
