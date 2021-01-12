const express = require("express");
const router = express.Router();
const imgemailController = require("../controllers/imgemailController");



router.post(
  "/",
  imgemailController.SubirArchivo,
  imgemailController.crearImgEmail
);


module.exports = router;

