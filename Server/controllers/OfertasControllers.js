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
  const tipoContrato = "Indefinido";
  try {
    const avisos = await Avisos.find({
      $or: [{ "tipoContrato.value": tipoContrato }],
    });
    //{ $or: [{ tipoConsultor: "Junior" }] }
    res.json(avisos);
    // console.log(avisos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};
