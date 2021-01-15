const mongoose = require("mongoose");
const { appConfig } = require("../../config/config");

const avisosSchema = mongoose.Schema({
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
  adnsap: [],
  jornadaLaboral: {
    type: String,
    trim: true,
  },
  tipoContrato: {
    type: String,
    trim: true,
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
    type: String,
    trim: true,
  },
  dispResidencia: {
    type: String,
    trim: true,
  },
  rentaOfrecida: {
    type: String,
    trim: true,
  },
  beneficios: {
    type: String,
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("avisos", avisosSchema);
