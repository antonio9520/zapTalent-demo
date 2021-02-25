const mongoose = require("mongoose");
const { appConfig } = require("../../config/config");

const empresaSchema = mongoose.Schema({
  razonSocial: {
    type: String,
    trim: true,
  },
  rut: {
    type: String,
    trim: true,
  },
  giro: {
    type: String,
    trim: true,
  },
  fechaInicio: {
    type: Date,
  },
  fechaTermino: {
    type: Date,
  },
  resena: {
    type: String,
    trim: true,
  },
  direcciones: [
    {
      direccion: String,
      comuna: String,
      region: String,
    },
  ],
  telefonos: [
    {
      numero: String,
    },
  ],
  logoURL: {
    type: String,
  },
  tipoPlan: {
    type: String,
  },

});

module.exports = mongoose.model("empresa", empresaSchema);
