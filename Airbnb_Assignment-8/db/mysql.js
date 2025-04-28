const mysql2 = require('mysql2');

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'KD2-89280-sudhir',
    password: 'manager',
    database: 'airbnb_db',
});

module.exports = pool;
