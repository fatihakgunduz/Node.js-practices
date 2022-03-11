const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-js',
    password: 'fatih.,61'
});

module.exports = pool.promise();
