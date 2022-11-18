import Fetcher from "../tools/Fetcher";
import LogInCredentials from "../types/LogInCredentials";

export async function loginUser(credentials: LogInCredentials) {
    return Fetcher.post("/auth/login", credentials);
}

export async function verifyToken(token: string) {
    return Fetcher.post("/auth/verify-token", { token });
}

export async function registerUser(userData: FormData) {
    return Fetcher.postFormData("/users", userData);
}

export async function getUser(userId: string) {
    return Fetcher.retrieve("/users", userId);
}
