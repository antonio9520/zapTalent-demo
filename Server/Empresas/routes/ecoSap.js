//Rutas para autentificar user
const express = require("express");
const router = express.Router();
const ecoSapControllers = require("../controllers/ecoSapControllers");

//login usuario
//api/auth


router.get("/:skip", ecoSapControllers.obtenerUsuarios);

// router.put("/", usuarioAdminControllers.putUserAdmin);

module.exports = router;
