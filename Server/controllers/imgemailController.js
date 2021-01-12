const upload = require("../libs/storageemail");
const Email = require("../models/fotosemail");

exports.SubirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
      if (error) {
        res.json({ msg: error });
      }
      return next();
    });
  };

  
exports.crearImgEmail = async (req, res) => { 
    try {
        //Crear nueva certificacion
        const email = new Email(req.body);
        //Guardar Certificacion
        //subida de imagen
        if (req.file) {
          const { filename } = req.file;
          email.setimgURL(filename);
        }
        await email.save();
       res.status(200).json(email);
      } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Hubo un error" });
      }
}