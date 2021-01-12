const mongoose = require("mongoose");
const { appConfig } = require("../../config/config");


const empresaSchema = mongoose.Schema({
    razon_social: {
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
    fecini: {
        type: Date,
        default: Date()
    },
    fecterm: {
        type: Date,
        default: Date(),
    },
    resena_empresa: {
        type: String,
        trim: true,
    },
    direcciones: [{
      direccion: String,
      comuna: String,
      region: String  
    }],
    telefono: [{
        numero: String
    }],
    logoURL: {
        type: String,
    }
})

module.exports = mongoose.model("empresa", empresaSchema);