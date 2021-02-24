const Empresas = require("../models/empresas");

exports.CrearEmpresa = async (req, res) => {
  try {
    const empresa = new Empresas(req.body);
    await empresa.save();
    res.status(200).json({ msg: " Empresa Guardada Correctamente " + empresa });
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

  const {
    razonSocial,
    rut,
    giro,
    fechaInicio,
    fechaTermino,
    resena,
    direcciones,
    telefono,
  } = req.body;

  try {
    await Empresas.findById(idempresa, function (err, empresa) {
      if (razonSocial) empresa.razonSocial = razonSocial;
      if (rut) empresa.rut = rut;
      if (giro) empresa.giro = giro;
      if (fechaInicio) empresa.fechaInicio = fechaInicio;
      if (fechaTermino) empresa.fechaTermino = fechaTermino;
      if (resena) empresa.resena = resena;
      if (direcciones) empresa.direcciones = direcciones;
      if (telefono) empresa.telefono = telefono;

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

