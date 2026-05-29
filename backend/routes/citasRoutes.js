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

router.get("/admin", citasController.obtenerTodasCitas);

router.delete("/:id", citasController.eliminarCita);

// Exportamos
module.exports = router;