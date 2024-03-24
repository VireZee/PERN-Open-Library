const express = require('express');
const db = require('./db');
const cors = require('cors'); 
const app = express();

app.use(cors());
app.listen(3001);