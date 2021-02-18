const Postulacion = require("../Empresas/models/postulacion");
const Avisos = require("../Empresas/models/avisos");

//OBTENER COUNT POSTULACIONES
exports.postulacionesCount = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Postulacion.find({ iduser: id }).countDocuments();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};

//OBTENER COUNT AVISOS
exports.avisosCount = async (req, res) => {
  try {
    const result = await Avisos.find({}).countDocuments();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};
