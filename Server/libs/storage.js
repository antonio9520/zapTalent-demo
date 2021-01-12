const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.substring(0, 3) === "ima") {
      cb(null, "./storage/usuario");
      // console.log("entro imagen");
    } else {
      cb(null, "./storage/cv");
      // console.log("entro archivo");
    }
  },
  filename: function (req, file, cb) {
    let extension = file.originalname.split(".").reverse()[0];
    cb(null, `${file.fieldname}-${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
