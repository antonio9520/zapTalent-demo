const mongoose = require("mongoose");
const { appConfig } = require("../config/config");
const Sequelize = require("sequelize");
const { INTEGER } = require("sequelize");
const UsuariosSchema = mongoose.Schema({
  rut: {
    type: String,
    trim: true,
  },
  passport: {
    type: String,
    trim: true,
  },
  nombres: {
    type: String,
    trim: true,
  },
  apellidos: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
  },
  ecivil: {
    type: String,
    trim: true,
  },
  comuna: {
    type: String,
    trim: true,
  },
  region: {
    type: String,
    trim: true,
  },
  direccion: {
    type: String,
    trim: true,
  },
  nacion: {
    type: String,
    trim: true,
  },
  sexo: {
    type: String,
    trim: true,
  },
  consultor: {
    type: String,
    trim: true,
  },
  anosExp: {
    type: String,
    trim: true,
  },
  anosZap: {
    type: String,
    trim: true,
  },
  registro: {
    type: Date,
    default: Date.now(),
  },
  imageURL: {
    type: String,
  },
  habilidades: [
    {
      key: String,
      name: String,
    },
  ],
  activo: {
    type: Number,
    defaultValue: 0,
  },
  cvURL: {
    type: String,
  },
  token: {
    type: String,
  },
  expiracion: {
    type: Date,
  },
  profesion: {
    _id: String,
    name: String,
    tipoestudio: String,
    carrera: String,
  },
  rrss: [],
  postulaciones: [],
  adns: [],
  id_post: {
    type: String,
  },
  titulo: {
    type: String,
  },
});

UsuariosSchema.methods.setImgUrl = function setImgUrl(filename) {
  const { host, port } = appConfig;
  this.imageURL = `https://zaptalent.azurewebsites.net/public/${filename}`;
};
UsuariosSchema.methods.setCvUrl = function setCvUrl(filename) {
  const { host, port } = appConfig;
  this.cvURL = `https://zaptalent.azurewebsites.net/public/cv/${filename}`;
};

module.exports = mongoose.model("Usuario", UsuariosSchema);
