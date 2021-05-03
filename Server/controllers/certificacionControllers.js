const Certificacion = require("../models/certificacion");
const upload = require("../libs/storageCertificados");
const fs = require("fs").promises;

exports.SubirArchivo = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({ msg: error });
    }
    return next();
  });
};

//GUARDAR
exports.crearCertificacion = async (req, res) => {
  try {
    //Crear nueva certificacion
    const certificado = new Certificacion(req.body);
    //Guardar Certificacion
    //subida de imagen
    if (req.file) {
      const { filename } = req.file;
      certificado.setcertificado(filename);
    } 
    await certificado.save();
    res.json(certificado);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

//OBTENER
exports.mostrarCertificacion = async (req, res) => {
  try {
    const certificado = await Certificacion.find({
      idusuario: req.params.idusuario,
    }).sort({ fecha: -1 });
    res.json(certificado);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};

//ACTUALIZAR
exports.putCertificacion = async (req, res) => {
  const idcertificacion = req.params.idcertificacion;
  console.log(req.body);
  const {
    certificacion,
    universidad,
    fecha,
    pais,
    estado,
    obs,
    certificado,
  } = req.body;
  try {
    Certificacion.findById(idcertificacion, function (err, certifi) {
      if (req.file) {
        if (certifi.certificadoURL === undefined) {
          //subida de imagen
          if (req.file) {
            const { filename } = req.file;
            certifi.setcertificado(filename);
          }
        } else {
          var str = certifi.certificadoURL;
          var tr = certifi.certificadoURL.length;
          var ur = str.substr(28, tr.length);
          var stor =
            "C:/Users/Abraham/Desktop/SapReact/Server/storage/estudios";
          fs.unlink(stor.concat(ur))
            .then(() => {
              console.log("File removed");
            })
            .catch((err) => {
              console.error("Something wrong happened removing the file", err);
            });
        }
        if (req.file) {
          const { filename } = req.file;
          certifi.setcertificado(filename);
        }
      }
      if (certificacion) certifi.certificacion = certificacion;
      if (universidad) certifi.universidad = universidad;
      if (fecha) certifi.fecha = fecha;
      if (pais) certifi.pais = pais;
      if (estado) certifi.estado = estado;
      if (obs) certifi.obs = obs;
      if (certificado) certifi.certificado = certificado;

      if (err)
        return res.status(404).json({ msg: "Certificado no encontrado" });
      certifi.save(function (err) {
        if (err) return res.status(500).json({ msg: "Error al actualizar." });
        res.status(200).send(certifi);
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};

//ELIMINAR
exports.deleteCertificacion = async (req, res) => {
  const certifiid = req.params.idcertificacion;
  try {
    Certificacion.findById(certifiid, (err, certificacion) => {
      if (err) res.status(402).json({ msg: `Error al borrar el trabajo ` });
      certificacion.remove((err) => {
        if (err) res.status(402).send({ msg: "Error al borrar certificado" });
        res.status(200).send({ msg: "Certificado eliminado exitosamente." });
      });
    });
  } catch (error) {
    res.status(500).send({ msg: "Error en el servidor." });
  }
};
