//Rutas para autentificar user
const express = require("express");
const router = express.Router();
const usuarioAdminControllers = require("../controllers/usuarioEmpresaControllers");

//login usuario
//api/auth
router.get("/:id", usuarioAdminControllers.mostrarEmpresasID);
router.post("/", usuarioAdminControllers.creaUserEmp);

router.put("/:idperfil", usuarioAdminControllers.putUsuarioEmp);

router.put(
  "/actualizar-password/:iduserEmp",
  usuarioAdminControllers.actualizarPasswordEmp
);
router.put("/validar/email", usuarioAdminControllers.validarPerfilUnico);

router.get("/obtener/perfiles/:idemp", usuarioAdminControllers.obtenerPerfiles);
// router.put("/", usuarioAdminControllers.putUserAdmin);

module.exports = router;
