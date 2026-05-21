'use strict';

const db = require("../config/db2");

// ================= CREAR CITA =================

function agregarCita(
    fecha,
    hora,
    idPaciente,
    idMedico,
    nombreMedico
) {

    return new Promise((resolve, reject) => {

        const sql = "CALL CrearCita(?, ?, ?, ?, ?)";

        db.query(
            sql,
            [
                fecha,
                hora,
                idPaciente,
                idMedico,
                nombreMedico
            ],

            (err, result) => {

                if (err) {

                    // ERROR UNIQUE
                    if (err.code === "ER_DUP_ENTRY") {

                        return resolve({
                            success: false,
                            type: "unique_violation",
                            message:
                                "Cita duplicada: el paciente ya tiene una cita con ese médico a esa hora."
                        });
                    }

                    // ERROR SIGNAL DEL PROCEDURE
                    if (err.errno === 1644) {

                        return resolve({
                            success: false,
                            type: "procedure_validation",
                            message: err.sqlMessage
                        });
                    }

                    return reject(err);
                }

                resolve({
                    success: true,
                    result
                });
            }
        );
    });
}

// ================= CONSULTAR MÉDICO =================

function consultarMedico(idMedico) {

    return new Promise((resolve, reject) => {

        const sql = `
        SELECT 
            Nombre,
            Apellido_Paterno,
            Apellido_Materno,
            Especialidad
        FROM medicos
        WHERE Id_Medicos = ?
        `;

        db.query(sql, [idMedico], (err, result) => {

            if (err) {
                reject(err);
            } else {
                resolve(result);
            }

        });

    });

}

// ================= OBTENER ID PACIENTE =================

function obtenerIdPacientePorEmail(email) {

    return new Promise((resolve, reject) => {

        const sql = `
        SELECT Id_Pacientes
        FROM pacientes
        WHERE Email = ?
        LIMIT 1
        `;

        db.query(sql, [email], (err, result) => {

            if (err) {
                reject(err);
            } else {
                resolve(result);
            }

        });

    });

}

function obtenerCitasPorPaciente(idPaciente) {

    return new Promise((resolve, reject) => {

        const sql = `
        SELECT 
            c.Fecha,
            c.Hora,

            m.Especialidad AS Especialidad,

            CONCAT(
                m.Nombre,
                ' ',
                m.Apellido_Paterno,
                ' ',
                m.Apellido_Materno
            ) AS Medico_Nombre

        FROM citas c

        INNER JOIN medicos m
        ON c.Medicos_Id_Medicos = m.Id_Medicos

        WHERE c.Pacientes_Id_Pacientes = ?

        ORDER BY c.Fecha ASC, c.Hora ASC
        `;

        db.query(sql, [idPaciente], (err, result) => {

            if (err) {
                reject(err);
            } else {
                resolve(result);
            }

        });

    });

}

module.exports = {
    agregarCita,
    consultarMedico,
    obtenerIdPacientePorEmail,
    obtenerCitasPorPaciente
};