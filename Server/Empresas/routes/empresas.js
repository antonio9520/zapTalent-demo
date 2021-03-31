//Rutas para autentificar user
const express = require("express");
const router = express.Router();
const empresasControl = require("../controllers/empresasControllers");

//login usuario
//api/auth

router.post("/", empresasControl.SubirArchivo, empresasControl.CrearEmpresa);

router.put("/obtener/empresas/:skip", empresasControl.mostrarEmpresas);

router.put(
  "/:idempresa",
  empresasControl.SubirArchivo,
  empresasControl.putEmpresas
);

router.put("/validar/rut", empresasControl.validarEmpresaUnica);

router.get("/total/empresas", empresasControl.totalEmpresas);

router.get("/total/morosos", empresasControl.totalMorosos);

router.delete("/:idemp", empresasControl.deleteEmp);

// router.put("/", usuarioAdminControllers.putUserAdmin);

module.exports = router;
