const mongoose = require("mongoose");

const trabajoSchema = mongoose.Schema({
  idusuario: {
    type: String,
    require: true,
    trim: true,
  },
  nomempresa: {
    type: String,
    require: true,
    trim: true,
  },
  actempresa: {
    type: String,
    require: true,
    trim: true,
  },
  cargo: {
    type: String,
    require: true,
    trim: true,
  },
  areapuesto: {
    type: String,
    require: true,
    trim: true,
  },
  subarea: {
    type: String,
    require: true,
    trim: true,
  },
  inidate: {
    type: Date,
    default: Date(),  
  },
  findate: {
    type: Date,
    default: Date(),
  },
  pais: {
    type: String,
    require: true,
    trim: true,
  },
  personacargo: {
    type: String,
    require: true,
    trim: true,
  },
  manejopresupuesto: {
    type: String,
    require: true,
    trim: true,
  },
  expzap: {
    type: String,
    require: true,
    trim: true,
  },
  refnombre: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  refphone: {
    type: String,
    trim: true,
  },
  refrelacion: {
    type: String,
    trim: true,
  },
  reflogros: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Trabajo", trabajoSchema);
