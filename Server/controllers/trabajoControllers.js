const Trabajo = require("../models/trabajos");

//GUARDAR
exports.crearTrabajo = async (req, res) => {
  try {
    //Crear nuevo Trabajo
    trabajo = new Trabajo(req.body);
    //guardar trabajo
    await trabajo.save();
    res.json(trabajo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

//OBTENER
exports.mostrarTrabajo = async (req, res) => {
  try {
    const trabajos = await Trabajo.find({ idusuario: req.params.idusuario });
    res.json(trabajos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};

//ELIMINAR
exports.deletetrabajo = async (req, res) => {
  const trabajoid = req.params.trabajoid;
  try {
    Trabajo.findById(trabajoid, (err, trabajo) => {
      if (err) res.status(402).json({ msg: `Error al borrar el trabajo ` });
      trabajo.remove((err) => {
        if (err) res.status(402).json({ msg: `Error al borrar el trabajo ` });
        res.status(200).json({ msg: "Trabajo eliminado exitosamente." });
      });
    });
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor." });
  }
};

//ACTUALIZAR
exports.puttrabajo = async (req, res) => {
  const idtrabajo = req.params.idtrabajo;

  try {
    Trabajo.findById(idtrabajo, function (err, trabajo) {
      trabajo.nomempresa = req.body.nomempresa;
      trabajo.actempresa = req.body.actempresa;
      trabajo.cargo = req.body.cargo;
      trabajo.areapuesto = req.body.areapuesto;
      trabajo.subarea = req.body.subarea;
      trabajo.pais = req.body.pais;
      trabajo.personacargo = req.body.personacargo;
      trabajo.manejopresupuesto = req.body.manejopresupuesto;
      trabajo.expzap = req.body.expzap;
      trabajo.refnombre = req.body.refnombre;
      trabajo.email = req.body.email;
      trabajo.refphone = req.body.refphone;
      trabajo.refrelacion = req.body.refrelacion;
      trabajo.reflogros = req.body.reflogros;
      trabajo.inidate = req.body.inidate;
      trabajo.findate = req.body.findate;

      if (err) return res.status(404).json({ msg: "Trabajo no encontrado" });
      trabajo.save(function (err) {
        if (err) return res.status(500).json({ msg: "Error al actualizar." });
        res.status(200).send(trabajo);
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};
