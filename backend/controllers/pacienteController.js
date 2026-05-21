'use strict';

// Importamos funciones del modelo
const {
    agregarPaciente,
    existePacienteDuplicado,
    obtenerCitasPorEmail,
    obtenerPacientePorEmail,
    editarPaciente
} = require("../models/PacienteModelo");

// Importamos conexión
const db = require("../config/db");

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

exports.obtenerCitasPaciente = async function (req, res) {

    try {

        // ================= RECIBIR EMAIL =================
        const { email } = req.body;

        if (!email) {

            return res.json({
                ok: false,
                errores: ["Email requerido"]
            });

        }

        // ================= CONSULTAR CITAS =================
        const citas = await obtenerCitasPorEmail(email);

        // ================= VALIDAR =================
        if (citas.length === 0) {

            return res.json({
                ok: false,
                errores: ["No hay citas registradas"]
            });

        }

        // ================= RESPUESTA =================
        res.json({
            ok: true,
            citas
        });

    } catch (error) {

        console.log(error);

        res.json({
            ok: false,
            errores: ["Error del servidor"]
        });

    }

};

exports.obtenerPaciente = async (req, res) => {

    try {

        const email = req.params.email;

        const paciente =
            await obtenerPacientePorEmail(email);

        if (!paciente) {

            return res.json({
                ok: false
            });

        }

        res.json({
            ok: true,
            paciente
        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            error: error.message
        });

    }

};

exports.editarPaciente =
    async (req, res) => {

        try {

            const {
                tipo_seguro,
                contacto_emergencia,
                telefono_emergencia,
                email
            }
                =
                req.body;

            let errores = [];

            const regexTexto =
                /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;

            const regexTelefono =
                /^[0-9]{10}$/;

            if (!tipo_seguro) {

                errores.push(
                    "Selecciona un tipo de seguro"
                );

            }

            if (
                !contacto_emergencia
            ) {

                errores.push(
                    "Contacto obligatorio"
                );

            }

            else if (
                !regexTexto.test(
                    contacto_emergencia
                )
            ) {

                errores.push(
                    "Solo letras"
                );

            }

            if (
                !regexTelefono.test(
                    telefono_emergencia
                )
            ) {

                errores.push(
                    "Teléfono inválido"
                );

            }

            if (
                errores.length > 0
            ) {

                return res.json({

                    ok: false,
                    errores

                });

            }

            await editarPaciente(

                tipo_seguro,
                contacto_emergencia,
                telefono_emergencia,
                email

            );

            res.json({

                ok: true

            });

        }

        catch (error) {

            console.log(error);

            res.status(500).json({

                ok: false,
                errores: [
                    "Error interno"
                ]

            });

        }

    };