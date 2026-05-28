'use strict';

const db = require("../config/db2");

// ================= INSERTAR MÉDICO =================
function agregarMedico(nombre, apellidoPaterno, apellidoMaterno, especialidad) {

    return new Promise((resolve, reject) => {

        const sql = `
            INSERT INTO medicos (
                Nombre,
                Apellido_Paterno,
                Apellido_Materno,
                Especialidad
            )
            VALUES (?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                nombre,
                apellidoPaterno,
                apellidoMaterno,
                especialidad
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

// ================= OBTENER MÉDICOS =================
function obtenerMedicos() {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT 
                Id_Medicos,
                Nombre,
                Apellido_Paterno,
                Apellido_Materno,
                Especialidad
            FROM medicos
        `;

        db.query(sql, (err, result) => {

            if (err) {
                reject(err);
            } else {
                resolve(result);
            }

        });

    });

}

module.exports = {
    agregarMedico,
    obtenerMedicos
};