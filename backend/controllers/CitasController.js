'use strict';

const {
    agregarCita,
    consultarMedico,
    obtenerIdPacientePorEmail,
    obtenerCitasPorPaciente,
    obtenerTodasCitas,
    eliminarCita
} = require("../models/CitaModelo");

exports.obtenerTodasCitas = async function (req, res) {
    try {
        const citas = await obtenerTodasCitas();

        res.json({
            ok: true,
            citas
        });

    } catch (error) {
        console.log(error);

        res.json({
            ok: false,
            errores: ["Error al obtener citas"]
        });
    }
};

exports.eliminarCita = async function (req, res) {
    try {
        const { id } = req.params;

        await eliminarCita(id);

        res.json({
            ok: true,
            mensaje: "Cita eliminada correctamente"
        });

    } catch (error) {
        console.log(error);

        res.json({
            ok: false,
            errores: ["Error al eliminar cita"]
        });
    }
};

// ================= CREAR CITA =================

exports.crearCita = async function (req, res) {

    try {

        // ================= DATOS =================

        const {
            fecha,
            hora,
            medico,
            email
        } = req.body;

        let errores = [];

        // ================= VALIDAR FECHA =================

        if (!fecha) {

            errores.push("La fecha es obligatoria.");

        } else {

            const fechaActual = new Date()
                .toISOString()
                .split("T")[0];

            if (fecha < fechaActual) {

                errores.push(
                    "La fecha no puede ser anterior a hoy."
                );
            }
        }

        // ================= VALIDAR HORA =================

        if (!hora) {

            errores.push("La hora es obligatoria.");

        } else {

            const horaMin = "08:00";
            const horaMax = "18:00";

            if (hora < horaMin || hora > horaMax) {

                errores.push(
                    "La hora debe estar entre 08:00 y 18:00."
                );
            }
        }

        // ================= VALIDAR MÉDICO =================

        if (!medico) {

            errores.push(
                "Debe seleccionar un médico."
            );
        }

        // ================= VALIDAR EMAIL =================

        if (!email) {

            errores.push(
                "No se encontró el email del usuario."
            );
        }

        // ================= REVISAR ERRORES =================

        if (errores.length > 0) {

            return res.json({
                ok: false,
                errores
            });
        }

        // ================= OBTENER ID PACIENTE =================

        const pacienteResult =
            await obtenerIdPacientePorEmail(email);

        if (pacienteResult.length === 0) {

            return res.json({
                ok: false,
                errores: ["Paciente no encontrado"]
            });
        }

        const idPaciente =
            pacienteResult[0].Id_Pacientes;

        // ================= CONSULTAR MÉDICO =================

        const medicoResult =
            await consultarMedico(medico);

        if (medicoResult.length === 0) {

            return res.json({
                ok: false,
                errores: ["Médico no encontrado"]
            });
        }

        const fila = medicoResult[0];

        const nombreMedico =
            `${fila.Nombre} ${fila.Apellido_Paterno} ${fila.Apellido_Materno} - ${fila.Especialidad}`;

        // ================= CREAR CITA =================

        const respuesta = await agregarCita(
            fecha,
            hora,
            idPaciente,
            medico,
            nombreMedico
        );

        // ================= RESPUESTA =================

        if (respuesta.success) {

            return res.json({
                ok: true,
                mensaje: "Cita creada correctamente"
            });
        }

        return res.json({
            ok: false,
            errores: [respuesta.message]
        });

    } catch (error) {

        console.log(error);

        res.json({
            ok: false,
            errores: ["Error interno del servidor"]
        });
    }
};

// ================= OBTENER CITAS PACIENTE =================

exports.obtenerCitasPaciente = async function (req, res) {

    try {

        const { email } = req.body;

        if (!email) {
            return res.json({
                ok: false,
                errores: ["El email es obligatorio."]
            });
        }

        // Obtener el ID del paciente por email
        const pacienteResult =
            await obtenerIdPacientePorEmail(email);

        if (pacienteResult.length === 0) {
            return res.json({
                ok: false,
                errores: ["Paciente no encontrado."]
            });
        }

        const idPaciente =
            pacienteResult[0].Id_Pacientes;

        // Aquí llamas a tu modelo para traer las citas
        // Necesitarás una función como: obtenerCitasPorPaciente(idPaciente)
        // Ejemplo:
        const citas = await obtenerCitasPorPaciente(idPaciente);

        return res.json({
            ok: true,
            citas
        });

    } catch (error) {

        console.log(error);

        res.json({
            ok: false,
            errores: ["Error interno del servidor"]
        });
    }
};