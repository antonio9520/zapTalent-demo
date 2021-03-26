const Empresas = require("../models/empresas");
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
  try {
    const empresas = await Empresas.find();
    res.json(empresas);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "error en el servidor " + error });
  }
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
    console.log(razonSocial);
    direcciones = JSON.parse(direcciones);
    telefonos = JSON.parse(telefonos);
    await Empresas.findById(idempresa, function (err, empresa) {
      if (razonSocial) empresa.razonSocial = razonSocial;
      if (rut) empresa.rut = rut;
      if (giro) empresa.giro = giro;
      if (fechaInicio) empresa.fechaInicio = fechaInicio;
      if (fechaTermino) empresa.fechaTermino = fechaTermino;
      if (resena) empresa.resena = resena;
      if (direcciones) empresa.direcciones = direcciones;
      if (telefonos) empresa.telefonos = telefonos;
      if (tipoPlan) empresa.tipoPlan = tipoPlan;
      if (req.file) {
        console.log(req.file);
        const { filename } = req.file;
        empresa.setcertificado(filename);
      }
      if (err) return res.status(400).json({ msg: "Empresa no encontrada" });
      empresa.save(function (err) {
        if (err) return res.status(500).json({ msg: "error al actualizar" });
        res.status(200).send(empresa);
      });
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "error en el servidor " + error });
  }
};

//ELIMINAR
exports.deleteEmp = async (req, res) => {
  const idempresa = req.params.idempresa;
  try {
    await Empresas.findById(idempresa, (err, empresa) => {
      if (err) res.status(402).json({ msg: `Error al borrar la empresa ` });
      empresa.remove((err) => {
        if (err) res.status(402).send({ msg: "Error al borrar empresa" });
        res.status(200).send({ msg: "Empresa eliminada exitosamente." });
      });
    });
  } catch (error) {
    res.status(500).send({ msg: "Error en el servidor." });
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
    console.log(totalempresas);
    res.status(200).json({ total: totalempresas });
  } catch (error) {
    console.log(error);
  }
};
