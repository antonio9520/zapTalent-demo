const Avisos = require("../Empresas/models/avisos");

//OBTENER
exports.mostrarAvisos = async (req, res) => {
  const skip = req.params.skip;

  try {
    const avisos = await Avisos.find({}, undefined, {
      skip: parseInt(skip),
      limit: 5,
    });

    res.json(avisos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};

//FILTRAR
exports.filtrarAvisos = async (req, res) => {
  const { skip } = req.body;
  const query = await createQuery(req.body);
  console.log(query);
  try {
    const avisos = await Avisos.find(query, undefined, {
      skip: parseInt(skip),
      limit: 5,
    }).sort({ creacion: -1 });
    // console.log(avisos);
    console.log(avisos);
    res.json(avisos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};

const createQuery = (data) => {
  const {
    tipoConsultor,
    anosExpMin,
    anosExpMax,
    area,
    minimo,
    maximo,
    fechaini,
    fechafin,
    tipoContrato,
    region,
    comuna,
    jornadaLaboral,
    modulos,
    submodulos,
    estado,
    activo,
    caducado,
  } = data;
  let query;

  // $or: [ { qty: { $lt: 30 } }, { item: /^p/ } ]
  console.log(new Date());
  if (tipoContrato) {
    query = { "tipoContrato.value": tipoContrato };
  } else {
    query = {};
  }
  if (activo) {
    query.$or = [{ estado: estado, fechaTermino: { $gte: new Date() } }];
    // query.fechaTermino = { $gte: new Date() };
  }
  if (caducado) {
    query.fechaTermino = { $lte: new Date() };
    // query.fechaTermino = { $lte: new Date() };
  }
  if (tipoConsultor) query.tipoConsultor = tipoConsultor;

  if (modulos) query.modulos = modulos;
  if (submodulos) query.submodulos = submodulos;
  if (area) query.area = area;
  if (minimo && maximo) {
    query.renta = { $gte: minimo, $lte: maximo };
  } else if (minimo) {
    query.renta = { $gte: minimo };
  } else if (maximo) {
    query.renta = { $lte: maximo };
  }
  if (anosExpMin && anosExpMax) {
    query.anosExpSap = { $gte: anosExpMin, $lte: anosExpMax };
  } else if (anosExpMin) {
    query.anosExpSap = { $gte: anosExpMin };
  } else if (anosExpMax) {
    query.anosExpSap = { $lte: anosExpMax };
  }

  if (fechaini && fechafin) {
    query.creacion = {
      $gte: new Date(`${fechaini.substring(0, 10)}T00:00:00.000Z`),
      $lte: new Date(`${fechafin.substring(0, 10)}T23:59:59.999Z`),
    };
  } else if (fechaini) {
    query.creacion = {
      $gte: new Date(`${fechaini.substring(0, 10)}T00:00:00.000Z`),
      $lte: new Date(),
    };
  }
  if (region) query.region = region;
  if (comuna) query.ciudad = comuna;
  if (jornadaLaboral) query.jornadaLaboral = jornadaLaboral;

  // if (estado) query.estado = estado;
  //2021-01-21T22:42:30.000Z
  return query;
};
