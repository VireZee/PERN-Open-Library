import express  from 'express';
import cors from 'cors';

const app = express();
app.use(cors())
app.use(express.json());
app.listen(3001);
app.post('/api/register', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});