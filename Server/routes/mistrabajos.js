//Rutas para crear usuario
const express = require('express');
const router = express.Router();
const trabajoControllers = require('../controllers/trabajoControllers');
const auth = require('../middleware/Auth');

//Crea Trabajos
//Api/usuarios
router.post('/', trabajoControllers.crearTrabajo);
//Recuperar trabajo por id usuario
router.get('/:idusuario', trabajoControllers.mostrarTrabajo);
//Eliminar Trabajo por id de trabjo
router.delete('/:trabajoid', trabajoControllers.deletetrabajo);
//Editar trabajo por id de trabajo
router.put('/:idtrabajo', trabajoControllers.puttrabajo );

module.exports = router;