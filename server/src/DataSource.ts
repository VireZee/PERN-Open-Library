import { DataSource } from 'typeorm'
import './configs/env'

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: ["src/models/*.ts"], // make similar like import dotenv from 'dotenv'    import path from 'path'  dotenv.config({ path: path.join(__dirname, '.env') })
    synchronize: process.env.NODE_ENV === 'development'
})
export default AppDataSource