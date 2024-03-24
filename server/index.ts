import express, { Request, Response } from 'express';
import db from './db';

const app = express();
app.use(express.json());

app.post('/register', async (req: Request, res: Response) => {
    try {
        const { email, username, name, password } = req.body;
        if (!email || !username || !name || !password) {
            return res.status(400).json({ error: 'Missing required fields!' });
        }
        await db.any('INSERT INTO users(email, username, name, password) VALUES($1, $2, $3, $4)', [email, username, name, password]);
        return res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'An internal server error occurred' });
    }
});
app.listen(3001);