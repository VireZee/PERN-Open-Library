const app = require('express')();
const cors = require('cors'); 

app.use(cors());
app.use(require('express').json());
app.listen(3001);