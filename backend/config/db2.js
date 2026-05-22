const mysql = require("mysql2");

const db2 = mysql.createConnection({
    host: process.env.MYSQL2_HOST,
    user: process.env.MYSQL2_USER,
    password: process.env.MYSQL2_PASSWORD,
    database: process.env.MYSQL2_DATABASE,
    port: process.env.MYSQL2_PORT
});

db2.connect((err) => {
  if (err) {
    console.log("Error MySQL:", err);
  } else {
    console.log("Conectado a MySQL 2");
  }
});

module.exports = db2;