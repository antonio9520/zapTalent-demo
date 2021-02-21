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

  try {
    const avisos = await Avisos.find({ idusuario: req.params.id }, undefined, {
      skip: parseInt(skip),
      limit: 5,
    });
    const dataAvisos = await datapostulaciones(avisos);
    res.json(dataAvisos);
  } catch (err) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

const datapostulaciones = async (avisos) => {
  for (let i = 0; i < avisos.length; i++) {
    const postulaciones = await Postulacion.find({
      idaviso: avisos[i]._id,
    }).countDocuments();
    avisos[i].postulaciones = postulaciones;
  }
  return avisos;
};

exports.deleteAvisos = async (req, res) => {
  const id = req.params.id;

  try {
    await Avisos.findById(id, (err, aviso) => {
      if (err) res.status(402).json({ msg: "Error al borrar aviso" });
      aviso.remove((err) => {
        if (err) res.status(402).json({ msg: "Error al borrar aviso" });
        res.status(200).json({ msg: "aviso Eliminado Correctamente" });
      });
    });
  } catch (error) {
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

