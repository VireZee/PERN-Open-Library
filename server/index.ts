import dotenv from 'dotenv';
import AppDataSource from './src/DataSource';
import express, { Request, Response } from 'express';
import cors from 'cors';
dotenv.config();

AppDataSource.initialize().then(async () => {
    console.log("Inserting a new user into the database...")
}).catch(error => console.log(error))

const app = express();
app.use(cors())
app.use(express.json());
app.listen(process.env.PORT);

app.post('/api/register', (req: Request, _: Response) => {
    console.log(req.body);
});