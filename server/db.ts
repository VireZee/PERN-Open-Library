import pgPromise, { IMain } from 'pg-promise';

const pgp: IMain = pgPromise();
const dbConfig = {
    host: 'localhost',
    port: 5432,
    database: 'OpenLibrary ERN',
    user: 'postgres',
    password: '999666'
};
const dbConn = pgp(dbConfig);
export default dbConn;