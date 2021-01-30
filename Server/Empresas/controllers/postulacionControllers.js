const Postulacion = require("../models/postulacion");
const Avisos = require("../models/avisos");

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
