//Rutas para crear usuario
const express = require("express");
const router = express.Router();
const usuarioControllers = require("../controllers/usuariosControllers");

//Crea usuario
//Api/usuarios

router.get('/:correo', usuarioControllers.confirmarCuenta);

module.exports = router;
