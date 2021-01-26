const Avisos = require("../Empresas/models/avisos");

//OBTENER
exports.mostrarAvisos = async (req, res) => {
  try {
    const avisos = await Avisos.find();
    res.json(avisos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};

//FILTRAR
exports.filtrarAvisos = async (req, res) => {
  console.log(req.body);

  const query = await createQuery(req.body);

  try {
    const avisos = await Avisos.find({
      $or: [query],
    });
    //{ $or: [{ tipoConsultor: "Junior" }] }
    res.json(avisos);
    // console.log(avisos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};

const createQuery = (data) => {
  const {
    tipoConsultor,
    anosExpSap,
    area,
    minimo,
    maximo,
    fecha,
    tipoContrato,
    region,
    comuna,
    jornadaLaboral,
  } = data;
  let query;

  if (tipoContrato) {
    query = { "tipoContrato.value": tipoContrato };
  } else {
    query = {};
  }

  if (tipoConsultor) query.tipoConsultor = tipoConsultor;
  if (anosExpSap) query.anosExpSap = anosExpSap;
  if (area) query.area = area;
  if (minimo && maximo) {
    query.renta = { $gte: minimo, $lte: maximo };
  } else if (minimo) {
    query.renta = { $gte: minimo };
  } else if (maximo) {
    query.renta = { $lte: maximo };
  }
  if (fecha) {
    query.creacion = {
      $gte: new Date(`${fecha.substring(0, 10)}T00:00:00.000Z`),
      $lte: new Date(`${fecha.substring(0, 10)}T23:59:59.999Z`),
    };
  }
  if (region) query.region = region;
  if (comuna) query.ciudad = comuna;
  if (jornadaLaboral) query.jornadaLaboral = jornadaLaboral;
  //2021-01-21T22:42:30.000Z
  return query;
};
