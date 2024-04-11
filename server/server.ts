import AppDataSource from './src/DataSource';
import express from 'express';
import cors from 'cors';
import RegRt from './src/routes/Register';

AppDataSource.initialize();
const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.json());
app.listen(process.env.PORT);

app.use(RegRt);