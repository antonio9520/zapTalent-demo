const moongose = require("mongoose");

const usuarioEmpresaSchema = moongose.Schema({
    tipo_perfil: {
        type: String,
        trim: true
    },
    email: {
        type: String,     
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    fecinic:{
        type:Date,
        default: Date()
    },
    fecfin:{
        type:Date,
        default: Date()
    },
    idemp: {
        type: String,
        trim: true,
    }

});

module.exports = moongose.model("usuarioEmpresa", usuarioEmpresaSchema)