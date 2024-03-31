import AppDataSource from './src/DataSource';
import './src/configs/env';
import express, { Request, Response } from 'express';
import cors from 'cors';

AppDataSource.initialize();
const app = express();
app.use(cors())
app.use(express.json());
app.listen(process.env.PORT);

app.post('/api/register', (req: Request, _: Response) => {
    console.log(req.body);
});