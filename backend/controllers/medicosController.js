'use strict';

const {
    agregarMedico,
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

// ================= CREAR MÉDICO =================
exports.create = async function (req, res) {

    try {

        const {
            nombre,
            apellido_paterno,
            apellido_materno,
            especialidad
        } = req.body;

        let errores = [];

        const regexTexto = /^[a-zA-ZÁÉÍÓÚÑáéíóúñ ]+$/;

        // Nombre
        if (!nombre || nombre.trim() === "") {
            errores.push("El nombre es obligatorio.");
        } else if (!regexTexto.test(nombre)) {
            errores.push("El nombre solo puede contener letras y espacios.");
        }

        // Apellido paterno
        if (!apellido_paterno || apellido_paterno.trim() === "") {
            errores.push("El primer apellido es obligatorio.");
        } else if (!regexTexto.test(apellido_paterno)) {
            errores.push("El primer apellido solo puede contener letras.");
        }

        // Apellido materno
        if (!apellido_materno || apellido_materno.trim() === "") {
            errores.push("El segundo apellido también es obligatorio.");
        } else if (!regexTexto.test(apellido_materno)) {
            errores.push("El segundo apellido solo puede contener letras.");
        }

        // Especialidad
        if (!especialidad || especialidad === "Seleccione una especialidad") {
            errores.push("Debe seleccionar una especialidad válida.");
        }

        if (errores.length > 0) {
            return res.json({
                ok: false,
                errores
            });
        }

        const resultado = await agregarMedico(
            nombre,
            apellido_paterno,
            apellido_materno,
            especialidad
        );

        return res.json({
            ok: true,
            mensaje: "Médico agregado correctamente",
            idMedico: resultado.insertId
        });

    } catch (error) {

        console.log(error);

        return res.json({
            ok: false,
            errores: ["Error interno del servidor"]
        });

    }

};
