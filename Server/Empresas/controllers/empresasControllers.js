const Empresas = require("../models/empresas");
const Usuario = require("../models/usuarioEmpresa");
const upload = require("../../libs/storageempresalogo");
const fs = require("fs").promises;

exports.SubirArchivo = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({ msg: error });
    }
    return next();
  });
};

exports.CrearEmpresa = async (req, res) => {
  const Empresa = req.body;
  console.log(Empresa.fechaTermino);
  try {
    Empresa.direcciones = JSON.parse(Empresa.direcciones);
    Empresa.telefonos = JSON.parse(Empresa.telefonos);
    const empresa = new Empresas(Empresa);
    //subida de archivo
    if (req.file) {
      console.log(req.file);
      const { filename } = req.file;
      empresa.setcertificado(filename);
    }
    await empresa.save();
    res.status(200).send(empresa);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "error en el servidor " + error });
  }
};

exports.mostrarEmpresas = async (req, res) => {
  const skip = req.params.skip;
  const query = req.body;

  try {
    const _query = await createQuery(query);

    const empresas = await Empresas.find(_query, undefined, {
      skip: parseInt(skip),
      limit: 10,
    }).sort({ fechaTermino: 1 });

    res.json(empresas);
    res.end();
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "error en el servidor " + error });
  }
};

const createQuery = (data) => {
  const { state, search } = data;
  let query = {};
  query.$and = [];
  const now = new Date();
  switch (state) {
    case "activo":
      query.$and.push({ fechaTermino: { $gte: new Date() } });
      break;
    case "caducado":
      query.$and.push({ fechaTermino: { $lte: new Date() } });
      break;
    default:
      break;
  }

  if (search) {
    query.$and.push({ razonSocial: { $regex: `${search}`, $options: "i" } });
  }

  return query;
};
exports.putEmpresas = async (req, res) => {
  const idempresa = req.params.idempresa;

  let {
    razonSocial,
    rut,
    giro,
    fechaInicio,
    fechaTermino,
    resena,
    direcciones,
    telefonos,
    tipoPlan,
  } = req.body;

  try {
    if (direcciones !== "undefined") direcciones = JSON.parse(direcciones);

    if (telefonos !== "undefined") telefonos = JSON.parse(telefonos);

    const empresa = await Empresas.findById(idempresa);

    if (razonSocial !== "undefined") empresa.razonSocial = razonSocial;
    if (rut !== "undefined") empresa.rut = rut;
    if (giro !== "undefined") empresa.giro = giro;
    if (fechaInicio !== "undefined") empresa.fechaInicio = fechaInicio;
    if (fechaTermino !== "undefined") empresa.fechaTermino = fechaTermino;
    if (resena !== "undefined") empresa.resena = resena;
    if (direcciones !== "undefined") empresa.direcciones = direcciones;
    if (telefonos !== "undefined") empresa.telefonos = telefonos;
    if (tipoPlan !== "undefined") empresa.tipoPlan = tipoPlan;
    if (req.file) {
      const { filename } = req.file;
      empresa.setcertificado(filename);
    }

    await empresa.save();
    res.status(200).send(empresa);
    res.end();
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "error en el servidor " + error });
  }
};

//ELIMINAR
exports.deleteEmp = async (req, res) => {
  const idemp = req.params.idemp;
  try {
    await Usuario.deleteMany({ idemp: idemp });
    const empresa = await Empresas.findById(idemp);
    empresa.remove();
    res.status(200).send({ msg: "Empresa eliminada exitosamente." });
    res.end();
  } catch (error) {
    res.status(500).send({ msg: "Error en el servidor." });
    res.end();
  }
};

//VALIDACION EMPRESA UNICA
exports.validarEmpresaUnica = async (req, res) => {
  const { rut } = req.body;
  try {
    let rutValidado = await Empresas.findOne({ rut });
    //subida de archivo
    let _rut = Boolean(rutValidado);
    res.status(200).json({ _rut });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "error en el servidor " + error });
  }
};

//TOTAL EMPRESAS
exports.totalEmpresas = async (req, res) => {
  try {
    const totalempresas = await Empresas.find({}).countDocuments();

    res.status(200).json({ total: totalempresas });
  } catch (error) {
    console.log(error);
  }
};

//TOTAL MOROSOS
exports.totalMorosos = async (req, res) => {
  try {
    const totalmorosos = await Empresas.find({
      fechaTermino: { $lte: new Date() },
    }).countDocuments();

    res.status(200).json({ total: totalmorosos });
  } catch (error) {
    console.log(error);
  }
};
