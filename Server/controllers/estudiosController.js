const Estudio = require("../models/estudios");
const Usuario = require("../models/usuario");
const upload = require("../libs/storageEstudios");
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
exports.crearEstudios = async (req, res) => {
  try {
    //Crear nuevo Estudio
    const estudio = new Estudio(req.body);
    //subida de archivo
    if (req.file) {
      console.log(req.file);
      const { filename } = req.file;
      estudio.setcertificado(filename);
    }

    //Guardar nuevo estudio
    await estudio.save();

    await Usuario.findById(estudio.idusuario, function (err, usuario) {
      if (err) {
        console.log(err);
      }
      let carreras = usuario.carreras;
      carreras.push({
        _id: estudio._id,
        carrera: estudio.carrera,
        tipoestudio: estudio.tipoestudio,
      });
      usuario.carreras = carreras;
      usuario.save();
    });

    res.json(estudio);
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

//OBTENER
exports.mostrarEstudio = async (req, res) => {
  try {
    const estudios = await Estudio.find({
      idusuario: req.params.idusuario,
    }).sort({ diafin: -1 });
    res.json(estudios);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};

//ACTUALIZAR
exports.putestudio = async (req, res) => {
  const idestudio = req.params.idestudio;
  const {
    tipoestudio,
    carrera,
    institucion,
    areaestudio,
    escalanotas,
    promedio,
    pais,
    estado,
    observacion,
    certificado,
    diainicio,
    diafin,
  } = req.body;
  try {
    const estudio = await Estudio.findById(idestudio);

    if (req.file) {
      if (estudio.estudioURL === undefined) {
        //subida de imagen
        if (req.file) {
          const { filename } = req.file;
          estudio.setcertificado(filename);
        }
      } else {
        console.log("delete");
        var str = estudio.estudioURL;
        var tr = estudio.estudioURL.length;
        var ur = str.substr(28, tr.length);
        var stor = "C:/Users/Abraham/Desktop/SapReact/Server/storage/estudios";
        fs.unlink(stor.concat(ur))
          .then(() => {
            console.log("File removed");
          })
          .catch((err) => {
            console.log(err);
            console.error("Something wrong happened removing the file", err);
          });
      }
      if (req.file) {
        const { filename } = req.file;
        estudio.setcertificado(filename);
      }
    }

    if (tipoestudio) estudio.tipoestudio = tipoestudio;
    if (carrera) estudio.carrera = carrera;
    if (institucion) estudio.institucion = institucion;
    if (areaestudio) estudio.areaestudio = areaestudio;
    if (escalanotas) estudio.escalanotas = escalanotas;
    if (promedio) estudio.promedio = promedio;
    if (pais) estudio.pais = pais;
    if (estado) estudio.estado = estado;
    if (observacion) estudio.observacion = observacion;
    if (certificado) estudio.certificado = certificado;
    if (diainicio) estudio.diainicio = diainicio;
    if (diafin) estudio.diafin = diafin;

    await estudio.save(function (err) {
      if (err) {
        console.log(err);
        return res.status(501).json({ msg: "Error al actualizar." });
      }
    });
    if (tipoestudio || carrera) {
      await editarCarreraUsuario({
        _id: estudio.idusuario,
        idcarrera: estudio._id,
        carrera: estudio.carrera,
        tipoestudio: estudio.tipoestudio,
      });
    }

    res.status(200).send(estudio);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};

const editarCarreraUsuario = async (data) => {
  try {
    const usuario = await Usuario.findById(data._id);
    let usuariocarreras = usuario.carreras;
    let carreras = [];
    await usuariocarreras.map((item) =>
      item._id.toString() === data.idcarrera.toString()
        ? null
        : carreras.push(item)
    );

    carreras.push({
      _id: data.idcarrera,
      carrera: data.carrera,
      tipoestudio: data.tipoestudio,
    });
    usuario.carreras = carreras;
    await usuario.save();
  } catch (error) {
    console.log(error);
  }
};

//ELIMINAR
exports.deleteestudio = async (req, res) => {
  const idestudio = req.params.idestudio;
  try {
    const estudio = await Estudio.findById(idestudio);
    await estudio.remove();
    await eliminarCarreraUsuario({
      _id: idestudio,
      idusuario: estudio.idusuario,
    });
    res.status(200).json({ msg: "Estudio Eliminado Exitosamente" });
  } catch (error) {
    res.status(404).json({ msg: "Error en el servidor." });
  }
};

const eliminarCarreraUsuario = async (data) => {
  try {
    const usuario = await Usuario.findById(data.idusuario);
    let carreras = [];
    await usuario.carreras.map((item) =>
      item._id.toString() === data._id.toString() ? null : carreras.push(item)
    );

    usuario.carreras = carreras;
    await usuario.save();
  } catch (error) {
    console.log(error);
  }
};
