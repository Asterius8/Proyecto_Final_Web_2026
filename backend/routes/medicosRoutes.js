'use strict';

const express = require("express");

const router = express.Router();

const medicosController = require("../controllers/medicosController");

router.get("/", medicosController.obtenerMedicos);

module.exports = router;