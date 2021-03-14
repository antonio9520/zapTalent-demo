
//Rutas para crear usuario
const express = require("express");
const router = express.Router();
const homeCounterController = require("../controllers/homeCounterControllers");

//Crea Trabajos
///api/homeCounter

//Recuperar trabajo por id usuario
router.get("/totalPostulaciones/:id", homeCounterController.postulacionesCount);
router.get("/totalAvisos", homeCounterController.avisosCount);

module.exports = router;
