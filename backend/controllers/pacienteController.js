'use strict';

// Importamos funciones del modelo
const {
    agregarPaciente,
    existePacienteDuplicado
} = require("../models/PacienteModelo");

// Importamos conexión
const db = require("../config/db");
const db2 = require("../config/db2");

// Método CREATE
exports.create = async function (req, res) {

    try {

        // ================= DATOS =================

        const {
            nombre,
            primer_apellido,
            segundo_apellido,
            fecha_nac,
            sexo,
            telefono,
            email,
            tipo_seguro,
            contacto_emergencia,
            telefono_emergencia
        } = req.body;

        // ================= VALIDACIONES =================

        let errores = [];

        const regexTexto = /^[a-zA-ZÁÉÍÓÚÑáéíóúñ ]+$/;
        const regexTelefono = /^[0-9]{10}$/;

        // Nombre
        if (!nombre || nombre.trim() === "") {
            errores.push("El nombre es obligatorio.");
        } else if (!regexTexto.test(nombre)) {
            errores.push("Nombre inválido.");
        }

        // Primer apellido
        if (!primer_apellido || primer_apellido.trim() === "") {
            errores.push("Primer apellido obligatorio.");
        }

        // Segundo apellido
        if (!segundo_apellido || segundo_apellido.trim() === "") {
            errores.push("Segundo apellido obligatorio.");
        }

        // Fecha
        if (!fecha_nac) {
            errores.push("Fecha obligatoria.");
        }

        // Sexo
        const sexosValidos = ["M", "F", "O"];

        if (!sexo) {
            errores.push("Sexo obligatorio.");
        } else if (!sexosValidos.includes(sexo)) {
            errores.push("Sexo inválido.");
        }

        // Teléfono
        if (!telefono || !regexTelefono.test(telefono)) {
            errores.push("Teléfono inválido.");
        }

        // Seguro
        const segurosValidos = [
            "Privado",
            "Aseguradora",
            "Gobierno",
            "Indigente",
            "Ninguno"
        ];

        if (!tipo_seguro || !segurosValidos.includes(tipo_seguro)) {
            errores.push("Tipo de seguro inválido.");
        }

        // Contacto emergencia
        if (!contacto_emergencia) {
            errores.push("Contacto obligatorio.");
        }

        // Teléfono emergencia
        if (!telefono_emergencia || !regexTelefono.test(telefono_emergencia)) {
            errores.push("Teléfono emergencia inválido.");
        }

        // ================= REVISAR ERRORES =================

        if (errores.length > 0) {
            return res.json({
                ok: false,
                errores
            });
        }

        // ================= DUPLICADOS =================

        const duplicado = await existePacienteDuplicado(
            nombre,
            primer_apellido,
            segundo_apellido,
            fecha_nac,
            sexo,
            telefono
        );

        if (duplicado) {
            return res.json({
                ok: false,
                errores: ["Paciente ya registrado"]
            });
        }

        // ================= BUSCAR ID CUENTA =================

        db.query(
            "SELECT Id_Cuenta FROM cuentas WHERE Correo = ?",
            [email],

            async function (err, result) {

                if (err || result.length === 0) {
                    return res.json({
                        ok: false,
                        errores: ["Cuenta no encontrada"]
                    });
                }

                // Sacamos el ID
                const idCuenta = result[0].Id_Cuenta;

                // ================= INSERTAR =================

                const respuesta = await agregarPaciente(
                    nombre,
                    primer_apellido,
                    segundo_apellido,
                    fecha_nac,
                    sexo,
                    telefono,
                    email,
                    tipo_seguro,
                    contacto_emergencia,
                    telefono_emergencia,
                    idCuenta
                );

                // ================= RESPUESTA =================

                res.json({
                    ok: true,
                    mensaje: "Paciente creado",
                    resultado: respuesta
                });
            }
        );

    } catch (error) {

        console.log(error);

        res.json({
            ok: false,
            errores: ["Error interno del servidor"]
        });
    }
};