import { Request, Response } from "express";
import User from "../entities/user.entity";
import jwt, { Secret } from "jsonwebtoken";

export const logInHandler = async (req: Request, res: Response) => {
    const user = await User.objects.findOne({
        where: {
            username: req.body.username,
        },
    });
    if (user && user.password === req.body.password) {
        const token = jwt.sign(
            {
                username: req.body.username,
                id: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET as Secret,
            { expiresIn: "120h" }
        );
        res.status(201).json({ token: token, username: user.username, userId: user.id });
        return;
    }
    res.sendStatus(404);
};

export const checkToken = async (req: Request, res: Response) => {
    if (!req.body.token) {
        res.sendStatus(400);
    }
    const token = jwt.verify(req.body.token, process.env.JWT_SECRET as Secret);
    if (token) {
        res.status(200).json(token);
        return;
    }
    res.sendStatus(403);
};
