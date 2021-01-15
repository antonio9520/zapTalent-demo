const Avisos = require("../models/avisos");

exports.crearAviso = async (req, res) => {
  const {
    titulo,
    area,
    fechaInicio,
    fechaTermino,
    estado,
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
    adnsap,
  } = req.body;

  try {
    const aviso = new Avisos({
      titulo: titulo,
      area: area,
      fechaInicio: fechaInicio,
      fechaTermino: fechaTermino,
      estado: estado,
      jornadaLaboral: jornadaLaboral,
      tipoContrato: tipoContrato,
      fechaContratacion: fechaContratacion,
      cantidadVacantes: cantidadVacantes,
      pais: pais,
      ciudad: ciudad,
      region: region,
      dispResidencia: dispResidencia,
      dispViajar: dispViajar,
      renta: renta,
      beneficios: beneficios,
      descripcion: descripcion,
      adnsap: adnsap,
    });

    await aviso.save();
    res.status(200).json(aviso);
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.mostrarAvisos = async (req, res) => {
  try {
    const aviso = await Avisos.find();
    res.json(aviso);
  } catch (err) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.deleteAvisos = async (req, res) => {
  const idaviso = req.params.idaviso;

  try {
    Avisos.findById(idaviso, (err, aviso) => {
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
  const idaviso = req.params.idaviso;

  const {
    titulo,
    area_empresa,
    fecini,
    fecfin,
    estado,
    jornada_laboral,
    tipo_contrato,
    fecha_contratacion,
    cantidad_vacante,
    pais,
    ciudad,
    region,
    disp_residencia,
    disp_viaje,
    renta_ofrecida,
    beneficios,
    sobre_trabajo,
  } = req.body;

  try {
    Avisos.findById(idaviso, (err, aviso) => {
      if (err) return res.status(404).json({ msg: "aviso no encontrado" });
      if (titulo) aviso.titulo = titulo;
      if (area_empresa) aviso.area_empresa = area_empresa;
      if (fecini) aviso.fecini = fecini;
      if (fecfin) aviso.fecfin = fecfin;
      if (estado) aviso.estado = estado;
      if (jornada_laboral) aviso.jornada_laboral = jornada_laboral;
      if (tipo_contrato) aviso.tipo_contrato = tipo_contrato;
      if (fecha_contratacion) aviso.fecha_contratacion = fecha_contratacion;
      if (cantidad_vacante) aviso.cantidad_vacante = cantidad_vacante;
      if (pais) aviso.pais = pais;
      if (ciudad) aviso.ciudad = ciudad;
      if (region) aviso.region = region;
      if (disp_residencia) aviso.disp_residencia = disp_residencia;
      if (disp_viaje) aviso.disp_viaje = disp_viaje;
      if (renta_ofrecida) aviso.renta_ofrecida = renta_ofrecida;
      if (beneficios) aviso.beneficios = beneficios;
      if (sobre_trabajo) aviso.sobre_trabajo = sobre_trabajo;

      aviso.save((err) => {
        if (err) return res.status(500).json({ msg: "Error al Actualizar" });
        res.status(200).send(aviso);
      });
    });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};
