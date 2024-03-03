const x = require('express');
const app = x();
const cors = require('cors'); 

app.use(cors());
app.use(x.json());
app.listen(3001);