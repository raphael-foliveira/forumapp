import { DataSource } from "typeorm";
require("dotenv").config();

const envDbPort = process.env.DATABASE_PORT;
let databasePort;

if (typeof envDbPort !== "undefined") {
    databasePort = parseInt(envDbPort);
} else {
    databasePort = 5432
}

export const dataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: databasePort,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: ["./entities/*.entity.ts"],
    synchronize: true,
});
