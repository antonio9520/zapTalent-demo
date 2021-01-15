//Rutas para autentificar user
const express = require("express");
const router = express.Router();
const postulacionControllers = require("../controllers/postulacionControllers");



//login usuario
//api/auth

router.post("/", postulacionControllers.crearPostulacion);

router.get("/:idaviso", postulacionControllers.mostrarPostulacion);

// router.put("/:idaviso", postulacionControllers.putPostulacion);

router.delete("/:idpostulacion", postulacionControllers.deletePostulacion);

// router.put("/", usuarioAdminControllers.putUserAdmin);

module.exports = router;
