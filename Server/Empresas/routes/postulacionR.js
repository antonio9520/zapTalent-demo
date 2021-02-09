//Rutas para autentificar user
const express = require("express");
const router = express.Router();
const postulacionControllers = require("../controllers/postulacionControllers");

//login usuario
//api/auth

router.post("/", postulacionControllers.crearPostulacion);

router.put("/:id", postulacionControllers.obtenerPostulaciones);
router.get("/:iduser/:idemp", postulacionControllers.obtenerPostulacionesEmp);

// router.put("/:idaviso", postulacionControllers.putPostulacion);
router.put("/postulados/:id/:skip", postulacionControllers.usuarioPostulados);

router.delete("/:idpostulacion", postulacionControllers.deletePostulacion);

router.put("/leido/:id", postulacionControllers.changeLeido);
// router.put("/", usuarioAdminControllers.putUserAdmin);
/**total avisos */
router.get("/total/avisos/emp/:id", postulacionControllers.obtenerAvisosCount);
/**total postulantes */
router.get(
  "/total/postulantes/emp/:id",
  postulacionControllers.obtenerPostulantesCount
);
/*/total no leidos*/
router.get(
  "/total/noleidos/emp/:id",
  postulacionControllers.obtenerNoLeidosCount
);

module.exports = router;
