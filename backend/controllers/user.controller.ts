import { Request, Response } from "express";
import User from "../entities/user.entity";

export const getAllUsersHandler = async (req: Request, res: Response) => {
    const allUsers = await User.objects.find();
    console.log(allUsers);
    res.status(200).json(allUsers);
};

export const getUserHandler = async (req: Request, res: Response) => {
    const user = await User.objects.findOne({
        where: {
            id: parseInt(req.params.userId),
        },
        relations: ["posts"],
    });
    if (!user) {
        res.sendStatus(404);
        return;
    }
    res.status(200).json(user);
};

export const createUserHandler = async (req: Request, res: Response) => {
    const newUser = User.objects.create(req.body);
    const result = await User.objects.save(newUser);
    if (!result) {
        res.sendStatus(400);
        return;
    }
    res.status(201).json(result);
};
