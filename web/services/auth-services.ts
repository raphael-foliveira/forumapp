import Fetcher from "../tools/fetcher";
import LogInCredentials from "../types/LogInCredentials";

export async function loginUser(credentials: LogInCredentials) {
    return Fetcher.post("/auth/login", credentials);
}

export async function verifyToken(token: string) {
    return Fetcher.post("/auth/verify-token", { token });
}
