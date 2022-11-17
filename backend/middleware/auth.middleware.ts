import { NextFunction, Request, Response } from "express";

export interface RequestWithToken extends Request {
    token?: string;
}

export const verifyToken = (req: RequestWithToken, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader;
        const bearerToken = bearer.split(" ")[1];
        req.token = bearerToken;
        next();
        return;
    }
    res.sendStatus(403);
};
