'use strict';

const express = require("express");

const router = express.Router();

const medicosController = require("../controllers/medicosController");

router.get("/", medicosController.obtenerMedicos);

// Crear médico
router.post("/", medicoController.create);

module.exports = router;