const Usuario = require("../../models/usuario");
const Adnsap = require("../../models/adnsap");

exports.obtenerUsuarios = async (req, res) => {
  const skip = req.params.skip;

  // console.log(req.body);
  try {
    const query = await createQuery(req.body);
    // console.log(query);
    const Usuarios = await Usuario.find(query, undefined, {
      skip: parseInt(skip),
      limit: 15,
    });
    const dataUsers = await dataUsuarios(Usuarios);
    // console.log(dataUsers);
    res.json(dataUsers);
  } catch (err) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};
/**ADN DE USUARIO */
const dataUsuarios = async (data) => {
  let usuarios = [];

  for (let i = 0; i < data.length; i++) {
    const adnsap = await Adnsap.find(
      { iduser: data[i]._id },
      { name: 1, desc: 1 }
    );

    data[i].adns = adnsap;
    usuarios.push(data[i]);
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
    pretencionMax,
    pretencionMin,
    search,
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
  if (search) {
    query.$text = {
      $search: search,
      $caseSensitive: false,
      $diacriticSensitive: false,
    };
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
  if (pretencionMin && pretencionMax) {
    query.pretencion = { $gte: pretencionMin, $lte: pretencionMax };
  } else if (pretencionMin) {
    query.pretencion = { $gte: pretencionMin };
  } else if (pretencionMax) {
    query.pretencion = { $lte: pretencionMax };
  }

  if (region) query.region = region;
  if (comuna) query.comuna = comuna;
  if (industria) query.industria = { $elemMatch: { industria: industria } };
  //2021-01-21T22:42:30.000Z
  return query;
};
