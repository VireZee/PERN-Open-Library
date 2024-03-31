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
    if (!name) {
        return res.status(400).json({ error: "Name can't be empty!" });
    }
    if (!uname) {
        return res.status(400).json({ error: "Username can't be empty!" });
    }
    if (!email) {
        return res.status(400).json({ error: "Email can't be empty!" });
    }
    if (!pass) {
        return res.status(400).json({ error: "Password can't be empty!" });
    }
    if (pass !== rePass) {
        return res.status(400).json({ error: "Passwords do not match!" });
    }
    return res.status(200);
});