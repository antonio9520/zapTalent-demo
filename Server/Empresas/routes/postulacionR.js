//Rutas para autentificar user
const express = require("express");
const router = express.Router();
const postulacionControllers = require("../controllers/postulacionControllers");

//login usuario
//api/auth

router.post("/", postulacionControllers.crearPostulacion);

router.put("/:id", postulacionControllers.obtenerPostulaciones);

// router.put("/:idaviso", postulacionControllers.putPostulacion);
router.put("/postulados/:id/:skip", postulacionControllers.usuarioPostulados);

router.delete("/:idpostulacion", postulacionControllers.deletePostulacion);

router.put("/leido/:id", postulacionControllers.changeLeido);
// router.put("/", usuarioAdminControllers.putUserAdmin);

module.exports = router;
