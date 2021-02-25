const moongose = require("mongoose");

const usuarioEmpresaSchema = moongose.Schema({
  tipoPerfil: {
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
