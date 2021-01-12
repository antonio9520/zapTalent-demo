//Rutas para autentificar user
const express = require("express");
const router = express.Router();
const usuarioAdminControllers = require("../controllers/usuarioAdminControllers");


//login usuario
//api/auth

router.post("/", usuarioAdminControllers.creaUserAdmin);

// router.put("/", usuarioAdminControllers.putUserAdmin);

module.exports = router;
