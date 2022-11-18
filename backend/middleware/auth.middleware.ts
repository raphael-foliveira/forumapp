import { NextFunction, Request, Response } from "express";
import User from "../entities/user.entity";
import { getUserFromToken } from "../services/token.service";

export interface AuthenticatedRequest extends Request {
    user?: User;
}

export const verifyToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader === "undefined") {
        res.status(403).json({
            message: "Token not found.",
        });
        return;
    }
    const bearer = bearerHeader;
    const bearerToken = bearer.split(" ")[1];
    const authenticatedUser = await getUserFromToken(bearerToken);
    if (!authenticatedUser) {
        res.status(403).json({
            message: "Invalid Token"
        });
        return;
    }
    req.user = authenticatedUser;
    next();
};
