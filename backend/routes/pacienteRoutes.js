'use strict';

const express = require("express");
const router = express.Router();

const pacienteController =
    require("../controllers/pacienteController");

router.post("/", pacienteController.create);

// NUEVA RUTA
router.get("/:email", pacienteController.obtenerPaciente);

router.put(
    "/editar",
    pacienteController.editarPaciente
);

module.exports = router;