const mongoose = require("mongoose");
const { appConfig } = require("../config/config");

const certificacionSchema = mongoose.Schema({
  idusuario: {
    type: String,
    require: true,
    trim: true,
  },
  certificacion: {
    type: String,
    require: true,
    trim: true,
  },
  universidad: {
    type: String,
    require: true,
    trim: true,
  },  
  fecha: {
    type: Date,
    default: Date(),
  },
  pais: {
    type: String,
    require: true,
    trim: true,
  },
  estado: {
    type: String,
    require: true,
    trim: true,
  },
  obs: {
    type: String,
    trim: true,
  },
  certificadoURL: {
    type: String,
    trim: true,
  },
});

certificacionSchema.methods.setcertificado = function setcertificado(filename) {
  const {host, port} = appConfig;
  console.log("funcion certificado")
  this.certificadoURL = `https://zaptalent.azurewebsites.net/public/certificados/${filename}`;
};

module.exports = mongoose.model("Certificacion", certificacionSchema);
