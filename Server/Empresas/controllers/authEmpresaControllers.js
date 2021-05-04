const UsuarioEmpresa = require("../models/usuarioEmpresa");
const Empresa = require("../models/empresas");
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
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    console.log(usuario);
    const data = await dataEmp(usuario);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

const dataEmp = async (data) => {
  let datos = {};

  // console.log(data.idemp);
  try {
    const empresa = await Empresa.findById(data.idemp);
    datos._id = data._id;
    datos.email = data.email;
    datos.idemp = data.idemp;
    datos.tipoPerfil = data.tipoPerfil;
    datos.fechaTermino = data.fechaTermino;
    datos.razonSocial = empresa.razonSocial;
    datos.rut = empresa.rut;
    datos.giro = empresa.giro;
    datos.direcciones = empresa.direcciones;
    datos.telefonos = empresa.telefonos;
    datos.resena = empresa.resena;
    datos.fechaInicioEmp = empresa.fechaInicio;
    datos.fechaTerminoEmp = empresa.fechaTermino;
    datos.tipoPlan = empresa.tipoPlan;
    datos.logoURL = empresa.logoURL;

    return datos;
  } catch (error) {
    console.log(error);
  }
};
