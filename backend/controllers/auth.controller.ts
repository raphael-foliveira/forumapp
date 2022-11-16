import { Request, Response } from "express";
import User from "../entities/user.entity";
const jwt = require("jsonwebtoken");

export const getTokenHandler = async (req: Request, res: Response) => {
    const user = await User.objects.findOne({
        where: {
            username: req.body.username,
        },
    });
    if (user && user.password === req.body.password) {
        const token = await jwt.sign(
            {
                id: req.body.id,
                email: req.body.email,
                username: req.body.username,
            },
            process.env.JWT_SECRET,
            { expiresIn: "120h" }
        );
        res.status(201).json({ token: token });
        return;
    }
    res.sendStatus(400);
};
