'use strict';

const express = require("express");

const router = express.Router();

// Importamos controller
const citasController =
    require("../controllers/CitasController");

// ================= OBTENER CITAS =================
router.post(
    "/paciente",
    citasController.obtenerCitasPaciente
);

// ================= CREAR CITA =================
router.post(
    "/",
    citasController.crearCita
);

// Exportamos
module.exports = router;