const db = require("../config/db");

const Usuario = {

  existeCorreo: (email, callback) => {
    db.query(
      "SELECT COUNT(*) as total FROM cuentas WHERE Correo = ?",
      [email],
      (err, results) => {
        if (err) return callback(err, null);
        callback(null, results[0].total > 0);
      }
    );
  },

  crearUsuario: (email, password, callback) => {
    db.query(
      "INSERT INTO cuentas (Correo, Password, Rol) VALUES (?, ?, 'Paciente')",
      [email, password],
      callback
    );
  }

};

module.exports = Usuario;