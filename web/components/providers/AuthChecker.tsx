import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { verifyToken } from "../../services/auth-services";
import { deauthorize, authorize } from "../../store/auth/authSlice";

export default function AuthChecker({
    localToken,
    children,
}: {
    localToken: string;
    children: ReactNode;
}) {
    const dispatch = useDispatch();

    if (!localToken) {
        dispatch(deauthorize());
    } else {
        verifyToken(localToken).then((token) => {
            if (token) {
                dispatch(authorize({ token: localToken, userId: token.id }));
            } else {
                localStorage.clear();
            }
        });
    }

    return <>{children}</>;
}
