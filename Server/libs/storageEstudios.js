//Storage para pdf y jpge Certificaicones
const multer = require("multer");
const shortid = require("shortid");

const configuracionMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./storage/estudios/");
    },
    filename: function (req, file, cb) {
      let extension = file.originalname.split(".").reverse()[0];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  })),
};

//pasar la configuracion al cmapo
const upload = multer(configuracionMulter).single("estudioURL");

module.exports = upload;
