import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import User from "../entities/user.entity";

interface PayloadWithUserInfo extends JwtPayload {
    id: string;
    email: string;
}

export const getUserFromToken = async (token: string): Promise<User | null> => {
    try {
        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET as Secret
        ) as PayloadWithUserInfo;

        console.log("Authenticating user...");

        const authenticatedUser = await User.objects.findOne({
            where: {
                id: decodedToken.id,
            },
            select: {
                id: true,
                username: true,
                email: true,
                profilePicture: true,
            },
        });
        if (!authenticatedUser) {
            console.log("Authentication failed.");
            return null;
        }
        return authenticatedUser;
    } catch {
        console.log("Token expired");
        return null;
    }
};
