//Rutas para autentificar user
const express = require("express");
const router = express.Router();
const avisosControllers = require("../controllers/avisosControllers");

//login usuario
//api/auth
router.post("/", avisosControllers.crearAviso);

router.put("/:id", avisosControllers.putAviso);

router.put("/filter/:skip", avisosControllers.mostrarAvisos);

router.delete("/:id", avisosControllers.deleteAvisos);
// router.put("/", usuarioAdminControllers.putUserAdmin);
router.get("/:id", avisosControllers.mostrarAvisoId);
router.get("/total/avisos", avisosControllers.totalAvisos);

module.exports = router;
