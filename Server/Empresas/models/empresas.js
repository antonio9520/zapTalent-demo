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
        default: Date()
    },
    fechaTermino: {
        type: Date,
        default: Date(),
    },
    resena: {
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