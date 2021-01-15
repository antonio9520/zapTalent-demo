//Rutas para autentificar user
const express = require("express");
const router = express.Router();
const avisosControllers = require("../controllers/avisosControllers");


//login usuario
//api/auth
router.post("/", avisosControllers.crearAviso);

router.put("/:idaviso", avisosControllers.putAviso);

router.get("/", avisosControllers.mostrarAvisos);

router.delete("/", avisosControllers.deleteAvisos);
// router.put("/", usuarioAdminControllers.putUserAdmin);

module.exports = router;
