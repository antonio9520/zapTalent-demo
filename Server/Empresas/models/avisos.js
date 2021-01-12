const mongoose = require("mongoose");
const {appConfig} = require("../../config/config");

const avisosSchema = mongoose.Schema({
    titulo: {
        type: String,
        trim: true
    },
    area_empresa: {
        type: String,
        trim: true
    },
    fecini: {
        type: Date,
        default: Date(),
    },
    fecfin: {
        type: Date,
        default: Date(),
    },
    estado: {
        type: String,
        trim: true,
    },
    adnsap: [{
        modulo: String,
        submodulo: String,
        descripcion: String,
        nivel: String
    }],
    jornada_laboral: {
        type: String,
        trim: true,
    },
    tipo_contrato: {
        type: String,
        trim: true
    },
    fecha_contratacion: {
        type: Date,
        default: Date(),
    },
    cantidad_vacante: {
        type: String,
        trim: true,
    },
    pais:{
        type: String,
        trim: true,
    },
    ciudad:{ 
        type: String,
        trim: true
    },
    region: {
        type: String,
        trim: true
    },
    disp_viaje: {
        type: String,
        trim: true
    },
    disp_residencia: {
        type: String,
        trim: true,
    },
    renta_ofrecida: {
        type: String,
        trim: true,
    },
    beneficios: {
        type: String,
        trim: true,
    },
    sobre_trabajo: {
        type: String,
        trim: true,
    }
    

})

module.exports = mongoose.model("avisos", avisosSchema);

