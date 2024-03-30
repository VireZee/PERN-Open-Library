import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USER!,
    password: process.env.DB_PASS!,
    database: process.env.DB_NAME!,
    entities: ["./models/**/*.ts"],
    synchronize: true,
    logging: false
})
AppDataSource.initialize()