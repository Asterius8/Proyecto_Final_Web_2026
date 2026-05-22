const mysql = require("mysql2");

const db = mysql.createConnection({

  host:
    process.env.MYSQL1_HOST,

  user:
    process.env.MYSQL1_USER,

  password:
    process.env.MYSQL1_PASSWORD,

  database:
    process.env.MYSQL1_DATABASE,

  port:
    process.env.MYSQL1_PORT

});

db.connect((err) => {
  if (err) {
    console.log("Error MySQL:", err);
  } else {
    console.log("Conectado a MySQL");
  }
});

module.exports = db;