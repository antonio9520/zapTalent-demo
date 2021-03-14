//Rutas para autentificar user
const express = require("express");
const router = express.Router();
const empresasControl = require("../controllers/empresasControllers");

//login usuario
//api/auth

router.post("/", empresasControl.SubirArchivo, empresasControl.CrearEmpresa);

router.get("/", empresasControl.mostrarEmpresas);


router.put("/:idempresa", empresasControl.putEmpresas);

router.delete("/:idempresa", empresasControl.deleteEmp);

// router.put("/", usuarioAdminControllers.putUserAdmin);

module.exports = router;
