const Adnsap = require("../models/adnsap");
const upload = require("../libs/storageadn");
const fs = require("fs").promises;

exports.SubirArchivo = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({ msg: error });
    }
    return next();
  });
};
//CREAR
exports.crearAdnsap = async (req, res) => {
  // console.log(req.body);
  const { name, desc, submodulos, idcert, obs, iduser } = req.body;
  try {
    let obj = JSON.parse(submodulos);

    const adnsap = new Adnsap({
      name: name,
      desc: desc ? desc : null,
      submodulos: obj,
      idcert: idcert,
      obs: obs ? obs : null,
      iduser: iduser,
    });
    if (req.file) {
      const { filename } = req.file;
      await adnsap.setcertificadoURL(filename);
    }
    console.log(adnsap);
    await adnsap.save();
    console.log("finish");
    res.status(200).json(adnsap);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

//OBTENER
exports.mostrarAdnSap = async (req, res) => {
  try {
    const adnsap = await Adnsap.find({ iduser: req.params.iduser });

    res.json(adnsap);
  } catch (err) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

//ELIMINAR
exports.deleteAdnsap = async (req, res) => {
  const idadn = req.params.idadn;
  console.log(idadn);
  try {
    Adnsap.findById(idadn, (err, adnsap) => {
      if (err) res.status(402).json({ msg: "Error al borrar AdnZap" });
      adnsap.remove((err) => {
        if (err) res.status(402).json({ msg: "Error al borrar AdnZap" });
        res.status(200).json({ msg: "AdnZap Eliminado Correctamente" });
      });
    });
  } catch (err) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

//ACTUALIZAR
exports.putAdnsap = async (req, res) => {
  console.log(req.body);
  const idadn = req.params.idadn;
  const { name, desc, submodulos, idcert, obs } = req.body;
  let obj = null;
  if (submodulos) {
    obj = JSON.parse(submodulos);
    console.log(obj);
  }

  try {
    Adnsap.findById(idadn, function (err, adnsap) {
      if (req.file) {
        if (adnsap.adnURL === undefined) {
          //subida de imagen
          if (req.file) {
            const { filename } = req.file;
            adnsap.setcertificadoURL(filename);
          }
        } else {
          var str = adnsap.adnURL;
          var tr = adnsap.adnURL.length;
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
          adnsap.setcertificadoURL(filename);
        }
      }
      if (err) return res.status(404).json({ msg: "Adn no encontrado" });
      if (name) adnsap.name = name;
      if (obj) adnsap.submodulos = obj;
      if (idcert) adnsap.idcert = idcert;
      if (obs) adnsap.obs = obs;
      if (desc) adnsap.desc = desc;

      adnsap.save(function (err) {
        if (err) return res.status(500).json({ msg: "Error al Actualizar" });
        res.status(200).send(adnsap);
      });
    });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};
