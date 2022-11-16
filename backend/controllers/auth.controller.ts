import { Request, Response } from "express";
import User from "../entities/user.entity";
import jwt, { Secret } from "jsonwebtoken";

export const getTokenHandler = async (req: Request, res: Response) => {
    const user = await User.objects.findOne({
        where: {
            username: req.body.username,
        },
    });
    if (user && user.password === req.body.password) {
        const token = await jwt.sign(
            {
                username: req.body.username,
                id: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET as Secret,
            { expiresIn: "120h" }
        );
        res.status(201).json({ token: token });
        return;
    }
    res.sendStatus(400);
};
