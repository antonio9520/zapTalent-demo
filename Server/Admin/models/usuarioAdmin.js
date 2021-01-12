const mongoose = require('mongoose');

const userAdminSchema = mongoose.Schema({
    name: {type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        require: true
    },
    password: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    }
})

module.exports = mongoose.model("userAdmin", userAdminSchema);

