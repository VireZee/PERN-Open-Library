import 'reflect-metadata';
import { DataSource } from 'typeorm';
import './configs/env';

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER!,
    password: process.env.DB_PASS!,
    database: process.env.DB_NAME!,
    entities: ["src/models/*.ts"],
    synchronize: true
});
export default AppDataSource;