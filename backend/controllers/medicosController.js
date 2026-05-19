'use strict';

const {
    obtenerMedicos
} = require("../models/medicosModelo");

exports.obtenerMedicos = async (req, res) => {

    try {

        const medicos = await obtenerMedicos();

        // Verificar si hay médicos
        if (medicos.length === 0) {

            return res.json({
                ok: false,
                errores: ["No hay médicos registrados"]
            });

        }

        res.json({
            ok: true,
            medicos
        });

    } catch (error) {

        console.log(error);

        res.json({
            ok: false,
            errores: ["Error al obtener médicos"]
        });

    }

};