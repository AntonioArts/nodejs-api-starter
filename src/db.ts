import mysql from 'mysql';
import config from './config';

export default mysql.createConnection({
    host: config.db.host, 
    user: config.db.user, 
    password: config.db.password, 
    database: config.db.database 
});