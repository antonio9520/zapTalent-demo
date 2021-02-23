//Rutas para crear usuario
const express = require("express");
const router = express.Router();
const ofertasControllers = require("../controllers/OfertasControllers");

//Crea Trabajos
//Api/usuarios

//Recuperar trabajo por id usuario
router.get("/:skip", ofertasControllers.mostrarAvisos);
router.post("/", ofertasControllers.filtrarAvisos);
router.put("/empleosSugeridos", ofertasControllers.empleosSugeridos);
router.put("/total/empleosSugeridos", ofertasControllers.totalEmpleosSugeridos);

module.exports = router;
