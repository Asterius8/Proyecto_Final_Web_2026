const mysql = require("mysql2");

const db2 = mysql.createPool({

    host: process.env.MYSQL2_HOST,

    user: process.env.MYSQL2_USER,

    password: process.env.MYSQL2_PASSWORD,

    database: process.env.MYSQL2_DATABASE,

    port: process.env.MYSQL2_PORT,

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0

});

db2.getConnection((err, connection) => {

    if (err) {

        console.log("Error MySQL:", err);

    } else {

        console.log("Conectado a MySQL 2");

        connection.release();
    }

});

module.exports = db2;