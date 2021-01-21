//Rutas para crear usuario
const express = require("express");
const router = express.Router();
const ofertasControllers = require("../controllers/OfertasControllers");

//Crea Trabajos
//Api/usuarios

//Recuperar trabajo por id usuario
router.get("/", ofertasControllers.mostrarAvisos);
router.post("/", ofertasControllers.filtrarAvisos);

module.exports = router;
