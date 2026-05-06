const bcrypt = require("bcrypt");
const db = require("../config/db");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    let errores = [];

    if (!email) errores.push("Correo obligatorio");
    if (!password) errores.push("Contraseña obligatoria");

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !regexCorreo.test(email)) {
      errores.push("Formato inválido");
    }

    if (password && password.length < 6) {
      errores.push("Mínimo 6 caracteres");
    }

    if (errores.length > 0) {
      return res.json({ ok: false, errores });
    }

    const hash = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO cuentas (Correo, Password, Rol) VALUES (?, ?, 'Paciente')",
      [email, hash],
      (err, result) => {
        if (err && err.code === "ER_DUP_ENTRY") {
          return res.json({
            ok: false,
            errores: ["Correo ya registrado"]
          });
        }

        if (err) {
          return res.json({
            ok: false,
            errores: ["Error servidor"]
          });
        }

        res.json({
          ok: true,
          mensaje: "Usuario creado"
        });
      }
    );

  } catch (error) {
    res.json({
      ok: false,
      errores: ["Error interno"]
    });
  }
};