const Usuario = require('../models/usuarioAdmin');
const bcryptjs = require('bcryptjs');
const fs = require("fs").promises;
const jwtf = require('jsonwebtoken');

exports.creaUserAdmin = async (req, res) => {
    //Extracion de email y pass
    const {email, password} = req.body;

    try {
        //revisar si el usuario registrado es unico
        let usuario = await Usuario.findOne({email});

        if(usuario) {
            return res.status(400).json({msg: "el email ya se encuentra en uso"});
        }

        //Creacio nnuevo usuario
        usuario = new Usuario(req.body);

        //Hasheo de pass
        const salt = await bcryptjs.genSalt(15);
        usuario.password = await bcryptjs.hash(password, salt);

        //guardar nuevo usuario
        await usuario.save();

        //Creacion y firma JWT
        const payload = {
            usuario: {
                id: usuario.id,
            },
        };

        //firma JWT
        jwtf.sign(
            payload,
            process.env.SECRETA,
            {
                expiresIn: 3600000,
            },
            (error, tokenadmin) => {
                if( error) throw error;

                //mensaje de confirmacion
                res.json({tokenadmin});
            }
        )

    } catch (error) {
        console.log(error);
    }
}