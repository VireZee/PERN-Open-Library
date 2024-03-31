import 'reflect-metadata';
import { DataSource } from 'typeorm';
import User from "./models/User";
// import dotenv from 'dotenv';
// dotenv.config({ path: '../.env' });

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "Anti Zee",
    password: "999666",
    database: "OpenLibrary ERN",
    entities: [User],
    synchronize: true,
    logging: true
});
export default AppDataSource;