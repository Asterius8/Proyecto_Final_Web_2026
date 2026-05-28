const mysql = require("mysql2");

const db = mysql.createPool({

    host: process.env.MYSQL1_HOST,

    user: process.env.MYSQL1_USER,

    password: process.env.MYSQL1_PASSWORD,

    database: process.env.MYSQL1_DATABASE,

    port: process.env.MYSQL1_PORT,

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0

});

db.getConnection((err, connection) => {

    if (err) {

        console.log("Error MySQL:", err);

    } else {

        console.log("Conectado a MySQL");

        connection.release();
    }

});

module.exports = db;