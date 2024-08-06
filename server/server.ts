import AppDataSource from './src/DataSource'
import express from 'express'
import cors from 'cors'
import AuthRt from './src/routes/Auth'

AppDataSource.initialize()
const app = express()
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.listen(process.env.PORT)

app.use(AuthRt)