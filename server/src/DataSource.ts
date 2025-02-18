import { DataSource } from 'typeorm'
import './configs/env'
import path from 'path'

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [path.join(__dirname, 'models', '*.ts')],
    synchronize: process.env.NODE_ENV === 'development'
})
export default AppDataSource