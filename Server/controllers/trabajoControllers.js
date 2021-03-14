const Trabajo = require("../models/trabajos");
const Usuario = require("../models/usuario");

//GUARDAR
exports.crearTrabajo = async (req, res) => {
  try {
    //Crear nuevo Trabajo
    trabajo = new Trabajo(req.body);
    //guardar trabajo
    await trabajo.save();

    await Usuario.findById(trabajo.idusuario, function (err, usuario) {
      if (err) {
        console.log(err);
      }
      let industria = usuario.industria;
      industria.push({
        _id: trabajo._id,
        industria: trabajo.actempresa,
      });
      usuario.industria = industria;
      usuario.save();
    });

    res.json(trabajo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

//OBTENER
exports.mostrarTrabajo = async (req, res) => {
  try {
    const trabajos = await Trabajo.find({
      idusuario: req.params.idusuario,
    }).sort({ findate: -1 });
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
    const trabajo = await Trabajo.findById(trabajoid, (err) => {
      if (err) res.status(402).json({ msg: `Error al borrar el trabajo ` });
    });

    await trabajo.remove((err) => {
      if (err) res.status(402).json({ msg: `Error al borrar el trabajo ` });
      res.status(200).json({ msg: "Trabajo eliminado exitosamente." });
    });

    await eliminarIndustriaUsuario({
      _id: trabajoid,
      idusuario: trabajo.idusuario,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor." });
  }
};
const eliminarIndustriaUsuario = async (data) => {
  try {
    const usuario = await Usuario.findById(data.idusuario);
    let industria = [];
    await usuario.industria.map((item) =>
      item._id.toString() === data._id.toString() ? null : industria.push(item)
    );

    usuario.industria = industria;
    await usuario.save();
  } catch (error) {
    console.log(error);
  }
};
//ACTUALIZAR
exports.puttrabajo = async (req, res) => {
  const idtrabajo = req.params.idtrabajo;

  try {
    const trabajo = await Trabajo.findById(idtrabajo);
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

    await trabajo.save(function (err) {
      if (err) return res.status(500).json({ msg: "Error al actualizar." });
    });

    await editarIndustriaUsuario({
      _id: trabajo.idusuario,
      idtrabajo: trabajo._id,
      industria: trabajo.actempresa,
    });

    res.status(200).send(trabajo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};

const editarIndustriaUsuario = async (data) => {
  try {
    const usuario = await Usuario.findById(data._id);
    let usuarioindustria = usuario.industria;
    let industria = [];
    await usuarioindustria.map((item) =>
      item._id.toString() === data.idtrabajo.toString()
        ? null
        : industria.push(item)
    );

    industria.push({
      _id: data.idtrabajo,
      industria: data.industria,
    });
    usuario.industria = industria;
    await usuario.save();
  } catch (error) {
    console.log(error);
  }
};
