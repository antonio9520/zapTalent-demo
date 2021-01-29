const mongoose = require("mongoose");

const postulacionSchema = mongoose.Schema({

    iduser: {
        type: String,
        trim: true,
    },
    idaviso: {
        type: String,
        trim: true
    },
    creacion: {
        type: Date,
        default: Date()
    }

})
module.exports = mongoose.model("postulacion", postulacionSchema);