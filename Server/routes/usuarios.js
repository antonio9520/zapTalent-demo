//Rutas para crear usuario
const express = require("express");
const router = express.Router();
const usuarioControllers = require("../controllers/usuariosControllers");
const upload = require("../libs/storage");
//Crea usuario
//Api/usuarios
router.post("/", usuarioControllers.crearUsuarios);

router.get("/:id", usuarioControllers.mostarUsuarios);

router.post("/validacion/rut-email", usuarioControllers.validacionEmailRut);

router.put("/:iduser", usuarioControllers.putUsuario);

router.put(
  "/actualizar-password/:iduser",
  usuarioControllers.actualizarPassword
);
router.put(
  "/subir-foto-perfil/:iduser",
  upload.single("imageURL"),
  usuarioControllers.actualizarFotoPerfil
);

router.put(
  "/actualizar-cv/:iduser",
  upload.single("imageURL"),
  usuarioControllers.actualizarCV
);
router.get("/total/usuarios", usuarioControllers.totalUsers);
router.get("/totaldia/usuarios", usuarioControllers.totalUsersDay);
// router.get("/usuarioId/:id", usuarioControllers.obtenerUsuarioId);

module.exports = router;
