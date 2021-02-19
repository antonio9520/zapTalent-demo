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
/*/empresas*/
exports.obtenerPostulacionesEmp = async (req, res) => {
  const iduser = req.params.iduser;
  const idemp = req.params.idemp;

  try {
    const postulaciones = await Postulacion.find({
      iduser: iduser,
      idemp: idemp,
    });

    const data = await dataAvisos(postulaciones);
    console.log(data);
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
    if (aviso) {
      aviso.id_post = data[i]._id;
      aviso.eliminado = false;
      postulaciones.push(aviso);
    } else {
      data[i].eliminado = true;
      postulaciones.push(data[i]);
    }
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
  const {
    leido,
    _id,
    tipoConsultor,
    modulo,
    submodulo,
    carrera,
    nivel,
    industria,
    sexo,
    comuna,
    region,
    anosExpMin,
    anosExpMax,
  } = req.body;

  let query = {};

  if (leido !== undefined) {
    query.leido = leido;
  }

  query.idemp = idemp;
  if (_id) {
    query.idaviso = _id;
  }

  try {
    const postulaciones = await Postulacion.find({
      $and: [query],
    });
    const query2 = await createQuery({
      tipoConsultor,
      modulo,
      submodulo,
      carrera,
      nivel,
      industria,
      sexo,
      comuna,
      region,
      anosExpMin,
      anosExpMax,
    });

    const data = await dataUsuarios(postulaciones, query2);
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};

const dataUsuarios = async (data, query) => {
  let usuarios = [];

  for (let i = 0; i < data.length; i++) {
    const aviso = await Avisos.findById(data[i].idaviso);
    if (aviso) {
      query._id = data[i].iduser;
      // ObjectId ("568c28fffc4be30d44d0398e")
      console.log(query);
      let usuario = await Usuario.findOne({
        $and: [query],
      });

      if (usuario) {
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
    }
  }
  return usuarios;
};
/**CREACION DE QUERY */
const createQuery = (data) => {
  const {
    tipoConsultor,
    modulo,
    submodulo,
    carrera,
    nivel,
    industria,
    sexo,
    comuna,
    region,
    anosExpMin,
    anosExpMax,
  } = data;
  let query;

  if (carrera && nivel) {
    query = {
      carreras: { $elemMatch: { carrera: carrera, tipoestudio: nivel } },
    };
  } else if (carrera) {
    query = { carreras: { $elemMatch: { carrera: carrera } } };
  } else {
    query = {};
  }
  if (sexo) query.sexo = sexo;
  if (tipoConsultor) query.consultor = tipoConsultor;
  if (modulo) query.modulos = modulo;
  if (submodulo) query.submodulos = submodulo;
  if (anosExpMin && anosExpMax) {
    query.anosZap = { $gte: anosExpMin, $lte: anosExpMax };
  } else if (anosExpMin) {
    query.anosZap = { $gte: anosExpMin };
  } else if (anosExpMax) {
    query.anosZap = { $lte: anosExpMax };
  }
  if (region) query.region = region;
  if (comuna) query.comuna = comuna;
  if (industria) query.industria = industria;
  //2021-01-21T22:42:30.000Z
  return query;
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

exports.obtenerAvisosCount = async (req, res) => {
  const idemp = req.params.id;
  try {
    const totalusers = await Avisos.find({ idusuario: idemp }).countDocuments();
    return res.status(200).json(totalusers);
  } catch (error) {
    console.log(error);
  }
};
exports.obtenerPostulantesCount = async (req, res) => {
  const idemp = req.params.id;
  try {
    const total = await Postulacion.find({ idemp: idemp }).countDocuments();

    return res.status(200).json(total);
  } catch (error) {
    console.log(error);
  }
};
exports.obtenerNoLeidosCount = async (req, res) => {
  const idemp = req.params.id;
  try {
    const total = await Postulacion.find({
      idemp: idemp,
      leido: false,
    }).countDocuments();
    return res.status(200).json(total);
  } catch (error) {
    console.log(error);
  }
};
