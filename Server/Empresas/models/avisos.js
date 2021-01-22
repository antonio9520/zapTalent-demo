const mongoose = require("mongoose");
const { appConfig } = require("../../config/config");

const avisosSchema = mongoose.Schema({
  idusuario: {
    type: String,
    require: true,
    trim: true,
  },
  nameusuario: {
    type: String,
  },
  titulo: {
    type: String,
    trim: true,
  },
  profesion: {
    type: String,
    trim: true,
  },
  area: {
    type: String,
    trim: true,
  },
  anosExp: {
    type: String,
    trim: true,
  },
  anosExpSap: {
    type: String,
    trim: true,
  },
  fechaInicio: {
    type: Date,
    default: Date(),
  },
  fechaTermino: {
    type: Date,
    default: Date(),
  },
  tipoConsultor: {
    type: String,
    trim: true,
  },
  estado: {
    type: String,
    trim: true,
  },
  adns: [],
  jornadaLaboral: {
    type: String,
    trim: true,
  },
  tipoContrato: {
    value: {
      type: String,
      trim: true,
    },
    desc: {
      type: String,
      trim: true,
    },
  },
  fechaContratacion: {
    type: Date,
    default: Date(),
  },
  cantidadVacantes: {
    type: String,
    trim: true,
  },
  pais: {
    type: String,
    trim: true,
  },
  ciudad: {
    type: String,
    trim: true,
  },
  region: {
    type: String,
    trim: true,
  },
  dispViajar: {
    type: Boolean,
  },
  dispResidencia: {
    type: Boolean,
  },
  renta: {
    type: Number,
    trim: true,
  },
  beneficios: [],
  descripcion: {
    type: String,
    trim: true,
  },
  creacion: {
    type: Date,
    default: Date(),
  },
});

module.exports = mongoose.model("avisos", avisosSchema);
