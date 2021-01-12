//Rutas para crear usuario
const express = require("express");
const router = express.Router();
const certificacionControllers = require("../controllers/certificacionControllers");

//Api/certificacion
//Crear certificacion
router.post(
  "/",
  certificacionControllers.SubirArchivo,
  certificacionControllers.crearCertificacion
);
//Recuperar Certificacion por id de usuario
router.get("/:idusuario", certificacionControllers.mostrarCertificacion);
//Editar Certificacion por id de Certificacion
router.put(
  "/:idcertificacion",
  certificacionControllers.SubirArchivo,
  certificacionControllers.putCertificacion
);
//Eliminar Certificacion por id de Certificacion
router.delete(
  "/:idcertificacion",
  certificacionControllers.deleteCertificacion
);

module.exports = router;
