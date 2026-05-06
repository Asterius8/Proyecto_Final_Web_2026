const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "oscar",
  password: "oscar",
  database: "bd_user_clinica_2025"
});

db.connect((err) => {
  if (err) {
    console.log("Error MySQL:", err);
  } else {
    console.log("Conectado a MySQL");
  }
});

module.exports = db;