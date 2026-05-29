// Herramienta para cifrar contraseñas, así no se guardan como texto normal en la base de datos
const bcrypt = require("bcrypt");
// Conexión a la base de datos para poder guardar y consultar información
const db = require("../config/db");
// Importas el archivo UsuarioModel.js
const Usuario = require("../models/usuarioModel");
const axios = require("axios");

// Función que se ejecuta cuando alguien intenta crear una cuenta nueva
exports.register = async (req, res) => {
  try {
    // Saca el correo y la contraseña que el usuario envió desde el formulario
    const { email, password, captchaToken } = req.body;

    // Crea una lista vacía donde se irán guardando los errores que se encuentren
    let errores = [];

    // Si el usuario no escribió correo, agrega un error a la lista
    if (!email) errores.push("Correo obligatorio");
    // Si el usuario no escribió contraseña, agrega un error a la lista
    if (!password) errores.push("Contraseña obligatoria");

    if (!captchaToken) {
      errores.push("Captcha obligatorio");
    }

    // Patrón que define cómo debe verse un correo válido (algo@algo.algo)
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Si hay correo pero no tiene el formato correcto, agrega un error
    if (email && !regexCorreo.test(email)) {
      errores.push("Formato inválido");
    }

    // Si hay contraseña pero tiene menos de 6 caracteres, agrega un error
    if (password && password.length < 6) {
      errores.push("Mínimo 6 caracteres");
    }

    // Si se encontró al menos un error, los devuelve al frontend y detiene el proceso
    if (errores.length > 0) {
      return res.json({ ok: false, errores });
    }

    const captchaResponse = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: captchaToken
        }
      }
    );

    if (!captchaResponse.data.success) {
      return res.json({
        ok: false,
        errores: ["Captcha inválido"]
      });
    }

    // Convierte la contraseña en un código cifrado para guardarla segura
    // El número 10 indica qué tan fuerte es el cifrado
    const hash = await bcrypt.hash(password, 10);

    // Ejecuta una instrucción en la base de datos para guardar la nueva cuenta
    // Los "?" son los espacios donde se insertan el correo y la contraseña cifrada
    // El rol "Paciente" se asigna automáticamente a toda cuenta nueva
    db.query(
      "INSERT INTO cuentas (Correo, Password, Rol) VALUES (?, ?, 'Paciente')",
      [email, hash],
      (err, result) => {

        // Si el error es porque ese correo ya existe en la base de datos, avisa al usuario
        if (err && err.code === "ER_DUP_ENTRY") {
          return res.json({
            ok: false,
            errores: ["Correo ya registrado"]
          });
        }

        // Si hubo cualquier otro error de base de datos, avisa de forma genérica
        if (err) {
          return res.json({
            ok: false,
            errores: ["Error servidor"]
          });
        }

        // Si todo salió bien, le responde al frontend que la cuenta fue creada con éxito
        res.json({
          ok: true,
          mensaje: "Usuario creado"
        });
      }
    );

  } catch (error) {
    // Si algo inesperado falló en todo el proceso, devuelve un error general
    res.json({
      ok: false,
      errores: ["Error interno"]
    });
  }
};

// Función que se ejecuta cuando alguien intenta iniciar sesión en su cuenta
exports.login = async (req, res) => {
  try {
    // Saca el correo y la contraseña que el usuario envió desde el formulario
    const { email, password } = req.body;

    // Crea una lista vacía donde se irán guardando los errores que se encuentren
    let errores = [];
    // Si el usuario no escribió correo, agrega un error a la lista
    if (!email) errores.push("Correo obligatorio");
    // Si el usuario no escribió contraseña, agrega un error a la lista
    if (!password) errores.push("Contraseña obligatoria");

    // Patrón que define cómo debe verse un correo válido (algo@algo.algo)
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Si hay correo pero no tiene el formato correcto, agrega un error
    if (email && !regexCorreo.test(email)) {
      errores.push("Formato inválido");
    }

    // Si hay contraseña pero tiene menos de 6 caracteres, agrega un error
    if (password && password.length < 6) {
      errores.push("Mínimo 6 caracteres");
    }

    // Si se encontró al menos un error, los devuelve al frontend y detiene el proceso
    if (errores.length > 0) {
      return res.json({ ok: false, errores });
    }

    Usuario.existeCorreo(email, (err, existe) => {
      console.log("1. existeCorreo - err:", err, "existe:", existe);
      if (existe) {

        Usuario.obtenerPassword(email, async (err, hashGuardado) => {
          console.log("2. obtenerPassword - err:", err, "hash:", hashGuardado);
          // Error de base de datos
          if (err) return res.json({ ok: false, errores: ["Error en base de datos contraseña"] });

          // Si no existe el correo
          if (hashGuardado === null) {
            return res.json({ ok: false, errores: ["Correo no registrado"] });
          }

          // Compara la contraseña que escribió el usuario con el hash de la base de datos
          const passwordCorrecta = await bcrypt.compare(password, hashGuardado);
          console.log("3. passwordCorrecta:", passwordCorrecta);
          if (!passwordCorrecta) {
            return res.json({ ok: false, errores: ["Credenciales incorrectas"] });
          }

          // Una vez que confirmaste que la contraseña es correcta, obtienes el rol
          Usuario.obtenerRol(email, (err, rol) => {
            console.log("4. obtenerRol - err:", err, "rol:", rol);
            if (err) return res.json({ ok: false, errores: ["Error al obtener rol"] });
            console.log("Rol obtenido:", JSON.stringify(rol));
            switch (rol) {
              case "Admin":
                // Le dices al frontend a dónde mandar al usuario
                console.log("Rol obtenido:", JSON.stringify(rol));
                res.json({ ok: true, redirigir: "/admin", mensaje: "Admin" });
                break;

              default:
                // Checas si ya tiene datos de paciente registrados
                Usuario.existePacientePorCorreo(email, (err, existePaciente) => {
                  if (err) {
                    console.log("Error existePaciente:", err);
                    return res.json({ ok: false, errores: [err.message] });
                  }

                  if (existePaciente) {
                    // Ya tiene perfil completo, va al dashboard
                    res.json({ ok: true, redirigir: "/paciente/dashboard", mensaje: "Login exitoso" });
                  } else {
                    // Le falta completar sus datos personales
                    res.json({ ok: true, redirigir: "/paciente", mensaje: "Incompleto" });
                  }
                });
                break;
            }
          });

          //hacer consulta de paciente con este correo para ver que si haya completado sus datos sino mandarlo a pagina de paciente para que complete su perfil
        });

      }
    });
  } catch (error) {
    // Si algo inesperado falló en todo el proceso, devuelve un error general
    res.json({
      ok: false,
      errores: ["Error interno"]
    });
  }
};