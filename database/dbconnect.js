require('dotenv').config()


const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
});

connection.connect(function(err) {
    if(err) {
        console.error('Database connection failed ' + err.stack);
        console.log('error whilde connecting to db:====', err)
        return;
    }
    console.log('Connected to the database');
});
// connection.end();

module.exports = connection;