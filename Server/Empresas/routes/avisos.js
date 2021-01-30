//Rutas para autentificar user
const express = require("express");
const router = express.Router();
const avisosControllers = require("../controllers/avisosControllers");

//login usuario
//api/auth
router.post("/", avisosControllers.crearAviso);

router.put("/:id", avisosControllers.putAviso);

router.get("/:id/:skip", avisosControllers.mostrarAvisos);

router.delete("/:id", avisosControllers.deleteAvisos);
// router.put("/", usuarioAdminControllers.putUserAdmin);


module.exports = router;
