import express  from 'express';
import cors from 'cors';

const app = express();
app.use(cors())
app.use(express.json());
app.listen(3001);
let storedData = {};
app.get('/api/register', (_,res) => {
    res.json(storedData);
});
app.post('/api/register', (req) => {
    console.log(req.body);
    storedData = req.body
});