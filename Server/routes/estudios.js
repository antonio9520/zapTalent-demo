//Rutas para crear usuario
const express = require("express");
const router = express.Router();
const estudiosController = require("../controllers/estudiosController");
const { check } = require("express-validator");
const auth = require("../middleware/Auth");

router.post(
  "/",
  estudiosController.SubirArchivo,
  estudiosController.crearEstudios
);
//recuperar estudio por id de usuario
router.get("/:idusuario", estudiosController.mostrarEstudio);
//editar estudio por id de estudio
router.put(
  "/:idestudio",
  estudiosController.SubirArchivo,
  estudiosController.putestudio
);
//Eliminar estudio por id de estudio
router.delete("/:idestudio", estudiosController.deleteestudio);

module.exports = router;
