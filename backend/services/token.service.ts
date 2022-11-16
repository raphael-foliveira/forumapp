import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import User from "../entities/user.entity";

interface PayloadWithUserInfo extends JwtPayload {
    id: number;
    email: string;
}

export const getUserFromToken = async (token: string) => {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as Secret) as PayloadWithUserInfo;

    const authenticatedUser = await User.objects.findOne({
        where: {
            id: decodedToken.id,
        },
    });
    return authenticatedUser;
};
