const mongoose = require("mongoose");
const { appConfig } = require("../config/config");

const estudioSchema = mongoose.Schema({
  idusuario: {
    type: String,
    require: true,
    trim: true,
  },
  tipoestudio: {
    type: String,

    trim: true,
  },
  carrera: {
    type: String,

    trim: true,
  },
  institucion: {
    type: String,

    trim: true,
  },
  areaestudio: {
    type: String,

    trim: true,
  },
  diainicio: {
    type: Date,
    default: Date(),
  },
  diafin: {
    type: Date,
    default: Date(),
  },
  escalanotas: {
    type: String,

    trim: true,
  },
  promedio: {
    type: String,

    trim: true,
  },
  pais: {
    type: String,

    trim: true,
  },
  estado: {
    type: String,

    trim: true,
  },
  observacion: {
    type: String,
    trim: true,
  },
  estudioURL: {
    type: String,
  },
});

estudioSchema.methods.setcertificado = function setcertificado(filename) {
  const { host, port } = appConfig;
  console.log(filename);
  console.log("entra a la funcion");
  this.estudioURL = `https://zaptalent.azurewebsites.net/public/estudios/${filename}`;
};

module.exports = mongoose.model("Estudio", estudioSchema);
