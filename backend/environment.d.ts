export declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_TYPE: "postgres" | "mysql" | "mongodb";
            DATABASE_HOST: string;
            DATABASE_PORT: string;
            DATABASE_USERNAME: string;
            DATABASE_PASSWORD: string;
            DATABASE_NAME: string;
            JWT_SECRET: string;
        }
    }
}
