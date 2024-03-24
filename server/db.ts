const pgp = require('pg-promise')();

const dbConfig = {
    host: 'localhost',
    port: 5432,
    database: 'OpenLibrary ERN',
    user: 'postgres',
    password: '999666'
};
const dbConn = pgp(dbConfig);
module.exports = dbConn;