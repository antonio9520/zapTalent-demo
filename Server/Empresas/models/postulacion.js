const mongoose = require("mongoose");

const postulacionSchema = mongoose.Schema({

    idusuario: {
        type: String,
        trim: true,
    },
    idaviso: {
        type: String,
        trim: true
    },
    fecpostu: {
        type: Date,
        default: Date()
    }

})
module.exports = mongoose.model("postulacion", postulacionSchema);