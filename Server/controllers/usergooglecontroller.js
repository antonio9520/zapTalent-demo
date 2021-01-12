const usuario = require("../models/usuario");
const { OAuth2Client } = require('google-auth-library');
const { response } = require("express");
const jwt = require('jsonwebtoken');

const client = new OAuth2Client('461564686457-ah096iok3dhnsimuqvhieom283j1d6ml.apps.googleusercontent.com')


exports.googlelogin = (req, res) => {
    const { tokenId } = req.body;
    client.verifyIdToken({ idToken: tokenId, audience: "461564686457-ah096iok3dhnsimuqvhieom283j1d6ml.apps.googleusercontent.com" }).then(response => {
        const { email_verified, email, given_name, family_name } = response.payload;
        console.log(response.payload);
        if (email_verified) {
            usuario.findOne({ email }).exec((err, user) => {
                if (err) {
                    return res.status(404).json({
                        msg: "El usuario no encontrado "
                    })
                } else {
                    if (user) {
                        const token = jwt.sign({usuario: {id: user.id} }, process.env.SECRETA, { expiresIn: '7d' })
                        const { id, nombres, email } = user;
                        res.json({
                            token,
                            user: { id, nombres, email },
                            type: "USUARIO_ENCONTRADO",
                        })
                    } else {
                        res.json({
                            type: "USUARIO_NUEVO",
                            given_name,
                            family_name, 
                            email,
                        })
                    }
                }
            })
        }
    })
}