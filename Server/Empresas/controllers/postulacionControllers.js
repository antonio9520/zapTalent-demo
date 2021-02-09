const Postulacion = require("../models/postulacion");
const Avisos = require("../models/avisos");
const Usuario = require("../../models/usuario");
const Adnsap = require("../../models/adnsap");

exports.crearPostulacion = async (req, res) => {
  try {
    const postulacion = new Postulacion(req.body);
    const post = await postulacion.save();

    const id = postulacion.idaviso;
    const data = await Avisos.findById(id);
    data.id_post = post._id;
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Postulacion Cancelada Error en el servidor" });
  }
};

exports.obtenerPostulaciones = async (req, res) => {
  const iduser = req.params.id;

  try {
    const postulaciones = await Postulacion.find({
      iduser: iduser,
    });

    const data = await dataAvisos(postulaciones);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};

const dataAvisos = async (data) => {
  let postulaciones = [];

  for (let i = 0; i < data.length; i++) {
    let aviso = await Avisos.findById(data[i].idaviso);

    aviso.id_post = data[i]._id;

    postulaciones.push(aviso);
  }
  return postulaciones;
};

exports.deletePostulacion = async (req, res) => {
  const idpostulacion = req.params.idpostulacion;

  try {
    Postulacion.findById(idpostulacion, (err, postulacions) => {
      if (postulacions) {
        postulacions.remove((err) => {
          if (err) res.status(402).json({ msg: "Error al borrar postulacion" });
          res.status(200).send({ msg: "Postulacion eliminada correctamente" });
        });
      }
    });
  } catch (error) {
    res.status(500).send({ msg: "Error en el servidor" });
  }
};

/**EMPRESAS */

exports.usuarioPostulados = async (req, res) => {
  const idemp = req.params.id;
  const skip = req.params.skip;
  const { leido, _id } = req.body;

  let query = {};
  console.log("id" + _id);
  query.leido = leido;
  query.idemp = idemp;
  if (_id) {
    query.idaviso = _id;
  }
  // console.log("render-----------------------------------------------");
  try {
    const postulaciones = await Postulacion.find({
      $and: [query],
    });
    // console.log(postulaciones);
    const data = await dataUsuarios(postulaciones);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};

const dataUsuarios = async (data) => {
  let usuarios = [];

  for (let i = 0; i < data.length; i++) {
    let usuario = await Usuario.findById(data[i].iduser);
    const adnsap = await Adnsap.find(
      { iduser: usuario._id },
      { name: 1, desc: 1 }
    );

    usuario.id_post = data[i]._id;
    usuario.idaviso = data[i].idaviso;
    usuario.titulo = data[i].titulo;
    usuario.leido = data[i].leido;
    usuario.adns = adnsap;
    usuarios.push(usuario);
  }
  return usuarios;
};

exports.changeLeido = async (req, res) => {
  const id = req.params.id;
  try {
    await Postulacion.findById(id, (err, postulacion) => {
      if (err) return res.status(404).json({ msg: "aviso no encontrado" });
      postulacion.leido = true;
      postulacion.save((err) => {
        if (err) return res.status(500).json({ msg: "Error al Actualizar" });
        res.status(200).send(postulacion);
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};
