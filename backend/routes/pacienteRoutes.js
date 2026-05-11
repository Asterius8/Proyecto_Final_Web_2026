'use strict';

const express = require("express");
const router = express.Router();

// Importamos el controller
const pacienteController = require("../controllers/pacienteController");

// Ruta POST
router.post("/", pacienteController.create);

// Exportamos rutas
module.exports = router;