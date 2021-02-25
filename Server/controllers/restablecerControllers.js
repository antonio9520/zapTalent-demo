const User = require('../models/usuario');
const crypto = require('crypto');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcryptjs');
const enviarEmail = require("../handlers/email");

exports.enviarToken = async (req, res) => {

    try {
        //Verificar que el usuario exista
    const useri = await User.findOne({ email: (req.params.emails) });
    const email = req.params.emails;
    //Si no existe el usuario
    if (!useri) {
        return res.status(404).json({ msg: "Usuario no encontrado " });
    }
    //Usuario existe 

    useri.token = crypto.randomBytes(20).toString('hex');
    useri.expiracion = Date.now() + 3600000;

    await useri.save();
    //Url de reset
    const resetUrl = `https://www.zaptalent.cl/restablecer/${useri.token}`;
    //crear objeto usuario
    const userconfi = {
       email
     };
    console.log(resetUrl);
    //enviar el correo con el token
    await enviarEmail.enviar({
        userconfi,
        subject: "Restablece tu contraseña en ZapTalent.",
        resetUrl,
        archivo: "resspass"
    })

    res.status(200).json({ msg: "Usuario encontrado ya vamos por su nueva contrasena no se preocupe" })

    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
    
}

exports.resetPassword = async (req, res) => {
    const useri = await User.findOne({
        token: (req.params.token)
    })

    //si no se encuentra usuario
    if (!useri) {
        return res.status(404).json({ msg: "El usuario no encontrado" });
    }


}

exports.actualizarPassword = async (req, res) => {
   
try {
    const useri = await User.findOne({
        token: (req.params.token),
    });
    //si no se encuentra usuario
    if (!useri) {
        return res.status(404).json({ msg: "El usuario no encontrado" });
    }
    //hash de password
    useri.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    useri.token = null;
    useri.expiracion = null;
    //guardar el nuevo pass
    await useri.save();

    res.status(200).json({ msg: "Tu Contraseña se ha modificado correctamente" });

} catch (error) {
    console.log(error);
    res.status(404).json({msg: "Error en el servidor"})
}
}
