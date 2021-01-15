const Postulacion = require("../models/postulacion");



exports.crearPostulacion = async (req, res) => {
    try {
        const postulacion = new Postulacion(req.body);

        await postulacion.save();
        res.status(200).json({ msg: "Postulacion echa correctamente" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Postulacion Cancelada Error en el servidor" })
    }
}


exports.mostrarPostulacion = async (req, res) => {
    try {
        const postulacion = await Postulacion.find({
            idaviso: req.params.idaviso,
        });
        res.status(200).json({ msg: "Postulacion para ide de aviso " + postulacion });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error en el servidor." });
    }
};


exports.deletePostulacion = async (req, res) => {
    const idpostulacion = req.params.idpostulacion;

    try {
        Postulacion.findById(idpostulacion, (err, postulacions) => {
            postulacions.remove((err) => {
                if (err) res.status(402).json({ msg: "Error al borrar postulacion" });
                res.status(200).send({ msg: "Postulacion eliminada correctamente" });
            });
        });
    } catch (error) {
        res.status(500).send({ msg: "Error en el servidor" });
    }
}