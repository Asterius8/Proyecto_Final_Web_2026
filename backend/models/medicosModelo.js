'use strict';

const db = require("../config/db2");

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
    obtenerMedicos
};