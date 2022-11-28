import { Request, Response } from "express";
import User from "../entities/user.entity";
import jwt, { Secret } from "jsonwebtoken";
import { getUserFromToken } from "../services/token.service";
import InvalidToken from "../entities/invalidToken.entity";

export const logInHandler = async (req: Request, res: Response) => {
    console.log("Loggin user in...");
    const user = await User.objects.findOne({
        where: {
            username: req.body.username,
        },
        select: {
            id: true,
            username: true,
            password: true,
        },
    });
    if (user && user.password === req.body.password) {
        console.log(`Correct password for user ${user.username}`);

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
    console.log("Authentication failed");
    res.status(404).json({
        error: "Credenciais inválidas.",
    });
};

export const logOutHandler = async (req: Request, res: Response) => {
    const { token, userId } = req.body;

    if (!token || !userId) {
        res.status(404).json({
            error: "User or Token not found.",
        });
        return;
    }

    const newInvalidToken = InvalidToken.objects.create({
        owner: {
            id: userId,
        },
        token,
    });

    const savedInvalidToken = await InvalidToken.objects.save(newInvalidToken);

    if (!savedInvalidToken) {
        res.status(500).json({
            error: "Something went wrong.",
        });
        return;
    }

    console.log("Token invalidated");
    console.log(savedInvalidToken);

    res.status(201).json(savedInvalidToken);
};

export const checkToken = async (req: Request, res: Response) => {
    if (!req.body.token) {
        console.log("No token");
        res.sendStatus(400);
    }
    console.log("token found");
    const user = await getUserFromToken(req.body.token);
    if (!user) {
        res.sendStatus(404);
        return;
    }
    console.log(`Authenticated from token:`);
    console.log(user);
    res.status(200).json(user);
};
