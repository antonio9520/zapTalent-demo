const express = require("express");
const router = express.Router();
const adnsapControllers = require("../controllers/adnsapControllers");

//Crear adnSap
router.post("/", adnsapControllers.SubirArchivo, adnsapControllers.crearAdnsap);
//Mostrar ADNSAP
router.get("/:iduser", adnsapControllers.mostrarAdnSap);
//Eliminar AdnSap por id de ADNSAP
router.delete("/:idadn", adnsapControllers.deleteAdnsap);
//Editar por id de adnSAP
router.put(
  "/:idadn",
  adnsapControllers.SubirArchivo,
  adnsapControllers.putAdnsap
);

module.exports = router;
