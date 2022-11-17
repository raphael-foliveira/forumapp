import { Secret } from "jsonwebtoken";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_TYPE: string;
            DATABASE_HOST: string;
            DATABASE_PORT: string;
            DATABASE_USERNAME: string;
            DATABASE_PASSWORD: string;
            DATABASE_NAME: string;
            JWT_SECRET: Secret;
        }
    }
}

export {};
