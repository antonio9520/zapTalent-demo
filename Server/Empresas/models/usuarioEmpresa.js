const moongose = require("mongoose");

const usuarioEmpresaSchema = moongose.Schema({
  tipoPerfil: {
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
  rut: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  fechaInicio: {
    type: Date,
  },
  fechaTermino: {
    type: Date,
  },
  idemp: {
    type: String,
    trim: true,
  },
});

module.exports = moongose.model("usuarioEmpresa", usuarioEmpresaSchema);
