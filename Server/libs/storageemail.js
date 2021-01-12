//Storage para pdf y jpge Certificaicones
const multer = require("multer");
const shortid = require("shortid");

const configuracionMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./storage/imaemail/");
    },
    filename: function (req, file, cb) {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  })),
  filefilter(req, file, cb) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Formato no Valido"));
    }
  },
};

//pasar la configuracion al cmapo
const upload = multer(configuracionMulter).single("imgURL");

module.exports = upload;
