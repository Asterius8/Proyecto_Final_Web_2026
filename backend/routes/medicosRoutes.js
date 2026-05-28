'use strict';

const express = require("express");

const router = express.Router();

const medicosController = require("../controllers/medicosController");

router.get("/", medicosController.obtenerMedicos);

// Crear médico
router.post("/", medicosController.create);

module.exports = router;