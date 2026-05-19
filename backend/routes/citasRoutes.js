'use strict';

const express = require("express");

const router = express.Router();

// Importamos controller
const citasController = require("../controllers/pacienteController");

// Ruta POST
router.post("/", citasController.obtenerCitasPaciente);

// Exportamos
module.exports = router;