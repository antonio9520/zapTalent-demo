const express = require('express');
const router = express.Router();
const authController = require("../controllers/authEmpresaControllers");
const AuthEmp = require("../middleware/AuthEmp");

//login Usuario Empresa
//Api authempresas

router.post("/", authController.autenticarUsuario);

router.get("/", AuthEmp, authController.usuarioAutenticado);

module.exports = router;