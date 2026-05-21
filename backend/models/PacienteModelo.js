'use strict';

const db = require("../config/db2");

// ================= INSERTAR PACIENTE =================

function agregarPaciente(
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
) {

    return new Promise((resolve, reject) => {

        const sql = `
        INSERT INTO pacientes(
            Nombre,
            Apellido_Paterno,
            Apellido_Materno,
            Fecha_Nac,
            Sexo,
            Telefono,
            Email,
            Tipo_Seguro,
            Contacto_Emergencia_Nombre,
            Contacto_Emergencia_Telefono,
            id_Cuenta
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
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
            ],

            (err, result) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
}

// ================= REVISAR DUPLICADO =================

function existePacienteDuplicado(
    nombre,
    primer_apellido,
    segundo_apellido,
    fecha_nac,
    sexo,
    telefono
) {

    return new Promise((resolve, reject) => {

        const sql = `
        SELECT Id_Pacientes
        FROM pacientes
        WHERE Nombre = ?
        AND Apellido_Paterno = ?
        AND Apellido_Materno = ?
        AND Fecha_Nac = ?
        AND Sexo = ?
        AND Telefono = ?
        LIMIT 1
        `;

        db.query(
            sql,
            [
                nombre,
                primer_apellido,
                segundo_apellido,
                fecha_nac,
                sexo,
                telefono
            ],

            (err, result) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(result.length > 0);
                }
            }
        );
    });
}

function obtenerCitasPorEmail(email) {

    return new Promise((resolve, reject) => {

        const sql = `
        SELECT 
            c.Id_Citas,
            c.Fecha,
            c.Hora,
            c.Especialidad_Nombre
        FROM citas c
        INNER JOIN pacientes p
            ON c.Pacientes_Id_Pacientes = p.Id_Pacientes
        WHERE p.Email = ?
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

function obtenerPacientePorEmail(email) {

    return new Promise((resolve, reject) => {

        const sql = `
        SELECT
            Nombre,
            Apellido_Paterno,
            Apellido_Materno,
            Fecha_Nac,
            Sexo,
            Telefono,
            Tipo_Seguro,
            Contacto_Emergencia_Nombre,
            Contacto_Emergencia_Telefono
        FROM pacientes
        WHERE Email = ?
        LIMIT 1
        `;

        db.query(
            sql,
            [email],
            (err, result) => {

                if (err) {

                    reject(err);

                }

                else {

                    resolve(
                        result.length > 0
                            ? result[0]
                            : null
                    );

                }

            }
        );

    });

}

function editarPaciente(
    tipo_seguro,
    contacto_emergencia,
    telefono_emergencia,
    email
) {

    return new Promise((resolve, reject) => {

        const sql = `
        UPDATE pacientes
        SET
            Tipo_Seguro = ?,
            Contacto_Emergencia_Nombre = ?,
            Contacto_Emergencia_Telefono = ?
        WHERE Email = ?
        `;

        db.query(
            sql,
            [
                tipo_seguro,
                contacto_emergencia,
                telefono_emergencia,
                email
            ],

            (err, result) => {

                if (err) {

                    reject(err);

                }

                else {

                    resolve(result);

                }

            }

        );

    });

}

// Exportamos funciones
module.exports = {
    agregarPaciente,
    existePacienteDuplicado,
    obtenerCitasPorEmail,
    obtenerPacientePorEmail,
    editarPaciente
};