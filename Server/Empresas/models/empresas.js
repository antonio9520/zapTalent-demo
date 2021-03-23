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
  direcciones: [],
  telefonos: [],
  logoURL: {
    type: String,
  },
  tipoPlan: {
    type: String,
  },
});

empresaSchema.methods.setcertificado = function setcertificado(filename) {
  const { host, port } = appConfig;
  console.log(filename);
  console.log("entra a la funcion");
  this.logoURL = `https://zaptalent.azurewebsites.net/public/empresas/${filename}`;
};

module.exports = mongoose.model("empresa", empresaSchema);
