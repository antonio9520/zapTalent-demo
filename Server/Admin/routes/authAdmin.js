//Rutas para autentificar user
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authAdminControllers");
const AuthAdmin = require("../middleware/AuthAdmin");

//login usuario
//api/auth

router.post("/", authController.autenticarUsuario);

router.get("/", AuthAdmin, authController.usuarioAutenticado);

module.exports = router;
