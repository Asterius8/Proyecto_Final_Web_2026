const db = require("../config/db");
const db2 = require("../config/db2");

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
  },

  obtenerPassword: (email, callback) => {
    db.query(
      "SELECT Password FROM cuentas WHERE Correo = ?",
      [email],
      (err, results) => {
        if (err) return callback(err, null);

        // Si no encontró ningún usuario con ese correo, devuelve null
        if (results.length === 0) return callback(null, null);

        // Si lo encontró, devuelve la contraseña cifrada
        callback(null, results[0].Password);
      }
    );
  },

  obtenerRol: (email, callback) => {
    db.query(
      "SELECT Rol FROM cuentas WHERE Correo = ?",
      [email],
      (err, results) => {
        if (err) return callback(err, null);
        if (results.length === 0) return callback(null, null);

        callback(null, results[0].Rol);
      }
    );

  },

  existePacientePorCorreo: (email, callback) => {
    db2.query(
      "SELECT COUNT(*) as total FROM pacientes WHERE Email = ?",
      [email],
      (err, results) => {
        if (err) return callback(err, null);
        callback(null, results[0].total > 0);
      }
    );
  },
};

module.exports = Usuario;