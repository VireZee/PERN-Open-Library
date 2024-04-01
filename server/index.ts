import AppDataSource from './src/DataSource';
import './src/configs/env';
import express, { Request, Response } from 'express';
import cors from 'cors';

AppDataSource.initialize();
const app = express();
app.use(cors())
app.use(express.json());
app.listen(process.env.PORT);

app.post('/api/register', (req: Request, res: Response) => {
    const { name, uname, email, pass, rePass } = req.body;
    const errs: Record<string, string> = {};
    if (!name) {
        errs.name = "Name can't be empty!";
    }
    if (!uname) {
        errs.uname = "Username can't be empty!";
    }
    if (!email) {
        errs.email = "Email can't be empty!";
    }
    if (!pass) {
        errs.pass = "Password can't be empty!";
    }
    if (pass !== rePass) {
        errs.match = "Passwords do not match!";
    }
    if (Object.keys(errs).length > 0) {
        return res.status(422).json({ errs });
    } else {
        return res.status(200).json(req.body);
    }
});