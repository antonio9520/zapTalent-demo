const UsuarioEmpresa = require("../models/usuarioEmpresa");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
  //extraer emails y password
  const { email, password } = req.body;

  try {
    let usuario = await UsuarioEmpresa.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ msg: "El usuario no existe" });
    }

    //revisar pass
    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passCorrecto) {
      return res.status(400).json({ msg: "Password Incorrecto" });
    }

    //si todo es correcto
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };

    //Firma jwt
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: "24h",
      },
      (error, token) => {
        if (error) throw error;

        //mensaje de confirmacion
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// Obtiene que usuario esta autenticado
exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await UsuarioEmpresa.findById(req.usuario.id).select(
      "-password"
    );
    res.json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
