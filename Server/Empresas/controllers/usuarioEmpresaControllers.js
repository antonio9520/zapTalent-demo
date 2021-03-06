const Usuario = require("../models/usuarioEmpresa");
const Empresa = require("../models/empresas");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const jwtf = require("jsonwebtoken");
const enviarEmail = require("../../handlers/email");

exports.creaUserEmp = async (req, res) => {
  //Extracion de email y pass
  const { idemp, perfil } = req.body;
  const { email, password } = perfil;

  try {
    //revisar si el usuario registrado es unico
    let user = await Usuario.findOne({ email });
    let empresa = await Empresa.findById(idemp);

    if (user) {
      return res.status(400).json({ msg: "el email ya se encuentra en uso" });
    }

    perfil.idemp = idemp;
    //Creacio nnuevo usuario

    usuario = new Usuario(perfil);
    usuario.token = crypto.randomBytes(20).toString("hex");
    usuario.expiracion = Date.now() + 3600000;
    //email
    const userconfi = {
      email,
    };

    //Informacion de empresa
    const razon = empresa.razonSocial;
    const rut = empresa.rut;
    const giro = empresa.giro;
    const emailen = usuario.email;
    const direcciones = empresa.direcciones[0].direccion;
    const comuna = empresa.direcciones[0].comuna;
    const region = empresa.direcciones[0].region;
    const telefono = empresa.telefonos[0].telefono;
    const resena = empresa.resena;
    const resetUrl = `https://www.zaptalent.cl/restablecerEmp/${usuario.token}`;
    //envio email cuenta creada
    await enviarEmail.enviar({
      userconfi,
      subject: "Felicidades! hemos creado tu cuenta ZAPTalent",
      razon,
      rut,
      giro,
      emailen,
      direcciones,
      telefono,
      region,
      comuna,
      resena,
      resetUrl,
      archivo: "infoEmpresa",
    });

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
      (error, tokenEmp) => {
        if (error) throw error;

        //mensaje de confirmacion
        res.json({ tokenEmp });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en Servidor" });
  }
};

exports.putUsuarioEmp = async (req, res) => {
  const {
    email,
    fechaInicio,
    fechaTermino,
    tipoPerfil,
    nombres,
    apellidos,
    rut,
  } = req.body;

  const idperfil = req.params.idperfil;

  try {
    const perfil = await Usuario.findById(idperfil);
    if (!perfil) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    if (tipoPerfil) perfil.tipoPerfil = tipoPerfil;
    if (email) perfil.email = email;
    if (fechaInicio) perfil.fechaInicio = fechaInicio;
    if (fechaTermino) perfil.fechaTermino = fechaTermino;
    if (nombres) perfil.nombres = nombres;
    if (apellidos) perfil.apellidos = apellidos;
    if (rut) perfil.rut = rut;

    await perfil.save();
    return res.status(200).send(perfil);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en Servidor" });
  }
};

exports.actualizarPasswordEmp = async (req, res) => {
  const { passwordActual, password } = req.body;
  const iduserEmp = req.params.iduserEmp;
  try {
    const usuario = await Usuario.findById(iduserEmp);
    const resultado = await bcryptjs.compare(passwordActual, usuario.password);
    if (resultado) {
      usuario.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync(15));
      usuario.save(function (err) {
        if (err) {
          return res.status(500).json({ msg: "Error en el servidor" });
        }
        res.status(200).json({ msg: "Contraseña actualizada correctamente" });
      });
    } else {
      return res.status(470).json({ msg: "Contraseña incorrecta" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

/**Informacion de empresa por id */
exports.mostrarEmpresasID = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    // throw n;
    const userEmpresa = await Empresa.findById(id);
    if (!userEmpresa) {
      return res.status(404).json({ msg: "Empresa no encontrada" });
    }

    // const empresa = await Empresa.findOne({ _id: userEmpresa.idemp });
    res.json(userEmpresa);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "error en el servidor " + error });
  }
};

//VALIDACION EMPRESA UNICA
exports.validarPerfilUnico = async (req, res) => {
  const { email } = req.body;
  try {
    let emailValidado = await Usuario.findOne({ email });
    //subida de archivo
    let _email = Boolean(emailValidado);
    res.status(200).json({ _email });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "error en el servidor " + error });
  }
};

//OBTENER PERFILES DE EMPRESAS
exports.obtenerPerfiles = async (req, res) => {
  const idemp = req.params.idemp;
  try {
    const perfiles = await Usuario.find({ idemp: idemp });
    res.status(200).json(perfiles);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "error en el servidor " + error });
  }
};

//ELIMINAR PERFIL
exports.deletePerfil = async (req, res) => {
  const id = req.params.id;
  try {
    const usuario = await Usuario.findById(id);
    usuario.remove();
    res.status(200).send({ msg: "Empresa eliminada exitosamente." });
    res.end();
  } catch (error) {
    res.status(500).send({ msg: "Error en el servidor." });
    res.end();
  }
};
