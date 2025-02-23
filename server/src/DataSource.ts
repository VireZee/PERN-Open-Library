import { DataSource } from 'typeorm'
import './configs/env'
import path from 'path'

const getEntitiesPath = () => process.env.NODE_ENV === 'production'
    ? path.join(__dirname, 'models', '*.js')
    : path.join(__dirname, 'models', '*.ts')
const getMigrationPath = () => process.env.NODE_ENV === 'production'
    ? path.join(__dirname, 'migrations', '*.js')
    : path.join(__dirname, 'migrations', '*.ts')
const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [getEntitiesPath()],
    migrations: [getMigrationPath()],
    synchronize: process.env.NODE_ENV === 'development'
})
export default AppDataSource