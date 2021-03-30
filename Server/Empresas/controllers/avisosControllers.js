const Avisos = require("../models/avisos");
const Postulacion = require("../models/postulacion");

exports.crearAviso = async (req, res) => {
  try {
    const aviso = new Avisos(req.body);

    await aviso.save();
    res.status(200).json(aviso);
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.mostrarAvisos = async (req, res) => {
  const skip = req.params.skip;
  const query = req.body;

  try {
    const querie = await createQuery(query);

    const avisos = await Avisos.find(querie, undefined, {
      skip: parseInt(skip),
      limit: 6,
    }).sort({ creacion: -1 });

    const dataAvisos = await datapostulaciones(avisos);
    res.json(dataAvisos);
  } catch (err) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

/**create query */
const createQuery = (data) => {
  const { _id, activo, caducado, search } = data;
  let query = {};
  if (activo || caducado || search) {
    query.$or = [];
  }
  if (_id) query.idusuario = _id;
  if (activo) {
    query.$or.push({ estado: "Activo" });
    query.$or.push({ fechaTermino: { $gte: new Date() } });
    // query.fechaTermino = { $gte: new Date() };
  }
  if (caducado) {
    query.$or.push({ estado: "Proceso Finalizado" });
    query.$or.push({ fechaTermino: { $lte: new Date() } });

    // query.fechaTermino = { $lte: new Date() };
  }
  if (search) {
    // query.$or = [];
    // query.$or.push({
    //   $text: {
    //     $search: search,
    //     $caseSensitive: false,
    //     $diacriticSensitive: false,
    //   },
    // });
    // query.$text = {
    //   $search: search,
    //   $caseSensitive: false,
    //   $diacriticSensitive: false,
    // };

    query.$or.push({ titulo: { $regex: `${search}`, $options: "i" } });
    // query.titulo = { $regex: `(^${search})`, $options: "i" };
  }
  console.log(query);
  return query;
};
const datapostulaciones = async (avisos) => {
  for (let i = 0; i < avisos.length; i++) {
    const postulaciones = await Postulacion.find({
      idaviso: avisos[i]._id,
    }).countDocuments();
    avisos[i].postulaciones = postulaciones;
  }
  for (let i = 0; i < avisos.length; i++) {
    const post = await Postulacion.find({
      idaviso: avisos[i]._id,
      leido: false,
    }).countDocuments();
    avisos[i].noLeido = post;
  }
  return avisos;
};

exports.deleteAvisos = async (req, res) => {
  const id = req.params.id;

  try {
    const aviso = await Avisos.findById(id);
    console.log(aviso);
    await aviso.remove();

    await Postulacion.update(
      { idaviso: aviso._id },
      { $set: { eliminado: true, leido: true } },
      { multi: true }
    );
    res.status(200).json({ msg: "aviso Eliminado Correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.putAviso = async (req, res) => {
  const id = req.params.id;

  const {
    titulo,
    profesion,
    area,
    anosExp,
    fechaInicio,
    fechaTermino,
    tipoConsultor,
    estado,
    anosExpSap,
    adns,
    jornadaLaboral,
    tipoContrato,
    fechaContratacion,
    cantidadVacantes,
    pais,
    ciudad,
    region,
    dispResidencia,
    dispViajar,
    renta,
    beneficios,
    descripcion,
    submodulos,
    modulos,
  } = req.body;

  try {
    await Avisos.findById(id, (err, aviso) => {
      if (err) return res.status(404).json({ msg: "aviso no encontrado" });
      if (titulo) aviso.titulo = titulo;
      if (profesion) aviso.profesion = profesion;
      if (area) aviso.area = area;
      if (anosExp) aviso.anosExp = anosExp;
      if (fechaInicio) aviso.fechaInicio = fechaInicio;
      if (fechaTermino) aviso.fechaTermino = fechaTermino;
      if (tipoConsultor) aviso.tipoConsultor = tipoConsultor;
      if (anosExpSap) aviso.anosExpSap = anosExpSap;
      if (adns) aviso.adns = adns;
      if (estado) aviso.estado = estado;
      if (jornadaLaboral) aviso.jornadaLaboral = jornadaLaboral;
      if (tipoContrato) aviso.tipoContrato = tipoContrato;
      if (fechaContratacion) aviso.fechaContratacion = fechaContratacion;
      if (cantidadVacantes) aviso.cantidadVacantes = cantidadVacantes;
      if (pais) aviso.pais = pais;
      if (ciudad) aviso.ciudad = ciudad;
      if (region) aviso.region = region;
      if (dispResidencia !== undefined) aviso.dispResidencia = dispResidencia;
      if (dispViajar !== undefined) aviso.dispViajar = dispViajar;
      if (renta) aviso.renta = renta;
      if (beneficios) aviso.beneficios = beneficios;
      if (descripcion) aviso.descripcion = descripcion;
      if (submodulos) aviso.submodulos = submodulos;
      if (modulos) aviso.modulos = modulos;

      aviso.save((err) => {
        if (err) return res.status(500).json({ msg: "Error al Actualizar" });
        res.status(200).send(aviso);
      });
    });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.mostrarAvisoId = async (req, res) => {
  const id = req.params.id;
  // throw n;
  try {
    const aviso = await Avisos.findById(id);
    // console.log(avisos);

    res.json(aviso);
  } catch (err) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};
