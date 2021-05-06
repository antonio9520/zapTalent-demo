const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const fs = require("fs").promises;
const jwt = require("jsonwebtoken");
const enviarEmail = require("../handlers/email");

exports.crearUsuarios = async (req, res) => {
  //extraer email y pass
  const { email, password } = req.body;

  try {
    // //Revisar el usuario registrado sea unico
    let usuario = await Usuario.findOne({ email });
    // console.log(req.body);
    if (usuario) {
      return res
        .status(400)
        .json({ msg: "El email ya se encuentra registrado" });
    }
    //Crear nuevo usuario
    usuario = new Usuario(req.body);

    //Hasheo de pass
    const salt = await bcryptjs.genSalt(15);
    usuario.password = await bcryptjs.hash(password, salt);

    //guardar nuevo usuario
    await usuario.save();

    //Creacion y firma de JWT
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
        expiresIn: 3600000,
      },
      (error, token) => {
        if (error) throw error;

        //mensaje de confirmacion
        res.json({ token, dato: true });
      }
    );

    //Crear URL de confirmacion
    const confirmarUrl = `http://${req.headers.host}/api/confirmar/${email}`;
    // const confirmarUrl = `http://zaptalent.cl/login-register/${email}`;

    //crear objeto usuario
    const userconfi = {
      email,
    };
    //Enviar email
    await enviarEmail.enviar({
      userconfi,
      subject: "Confirma tu cuenta de ZapTalent",
      confirmarUrl,
      archivo: "emailconfirm",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("hubo un error");
  }
};

exports.enviarEmailActivacion = async (req, res) => {
  const { email } = req.body;
  try {
    const confirmarUrl = `http://${req.headers.host}/api/confirmar/${email}`;

    //crear objeto usuario
    const userconfi = {
      email,
    };
    //Enviar email
    await enviarEmail.enviar({
      userconfi,
      subject: "Confirma tu cuenta de ZapTalent",
      confirmarUrl,
      archivo: "emailconfirm",
    });

    res.json({ enviado: true });
  } catch (error) {
    console.log(error);
    res.status(400).send("hubo un error");
  }
};

exports.mostarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findById(req.params.id);

    if (!usuarios) {
      res.status(404).json({ msg: "Usuario no existe" });
    }

    res.json(usuarios);
  } catch (error) {
    console.log(error);
  }
};

exports.putUsuario = async (req, res) => {
  console.log(req.file);
  const {
    rut,
    passport,
    nombres,
    apellidos,
    phone,
    email,
    ecivil,
    comuna,
    region,
    direccion,
    nacion,
    sexo,
    consultor,
    anosExp,
    anosZap,
    registro,
    habilidades,
    profesion,
    rrss,
    pretencion,
    modulos,
    submodulos,
    industria,
    carreras,
    dateActCV,
    fechaNacimiento,
  } = req.body;

  try {
    const iduser = req.params.iduser;

    await Usuario.findById(iduser, function (err, usuario) {
      if (err) {
        console.log(err);
        return res.status(404).json({ msg: "Usuario no encontrado" });
      }
      if (rut) usuario.rut = rut;
      if (passport) usuario.passport = passport;
      if (nombres) usuario.nombres = nombres;
      if (apellidos) usuario.apellidos = apellidos;
      if (phone) usuario.phone = phone;
      if (email) usuario.email = email;
      if (ecivil) usuario.ecivil = ecivil;
      if (comuna) usuario.comuna = comuna;
      if (region) usuario.region = region;
      if (direccion) usuario.direccion = direccion;
      if (nacion) usuario.nacion = nacion;
      if (sexo) usuario.sexo = sexo;
      if (consultor) usuario.consultor = consultor;
      if (anosExp) usuario.anosExp = anosExp;
      if (anosZap) usuario.anosZap = anosZap;
      if (registro) usuario.registro = registro;
      if (habilidades) usuario.habilidades = habilidades;
      if (profesion) usuario.profesion = profesion;
      if (rrss) usuario.rrss = rrss;
      if (pretencion) usuario.pretencion = pretencion;
      if (modulos) usuario.modulos = modulos;
      if (submodulos) usuario.submodulos = submodulos;
      if (industria) usuario.industria = industria;
      if (carreras) usuario.carreras = carreras;
      if (dateActCV) usuario.dateActCV = dateActCV;
      if (fechaNacimiento) usuario.fechaNacimiento = fechaNacimiento;
      usuario.save(function (err) {
        if (err)
          return res.status(500).json({ msg: "error al actualizar datos" });
        res.status(200).send(usuario);
      });
      // }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en Servidor" });
  }
};

exports.actualizarPassword = async (req, res) => {
  const { passwordActual, password } = req.body;
  const iduser = req.params.iduser;
  try {
    const usuario = await Usuario.findById(iduser);
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

exports.actualizarFotoPerfil = async (req, res) => {
  const iduser = req.params.iduser;

  try {
    const usuario = await Usuario.findById(iduser);

    if (usuario.imageURL === undefined) {
      //subida de imagen
      if (req.file) {
        const { filename } = req.file;
        usuario.setImgUrl(filename);
      } else {
        return res.status(500).json({ msg: "No hay archivo" });
      }
    } else {
      let url = usuario.imageURL;
      let largoUrl = usuario.imageURL.length;
      let nameImage = url.substr(28, largoUrl);
      let urlServer =
        "C:/Users/Abraham/Desktop/SapReact/Server/storage/usuario";
      fs.unlink(urlServer.concat(nameImage))
        .then(() => {
          console.log("Archivo eliminado");
        })
        .catch((err) => {
          console.log(err);
          console.error("Hubo un error al eliminar el archivo. ", err);
        });

      if (req.file) {
        const { filename } = req.file;
        usuario.setImgUrl(filename);
      } else {
        return res.status(500).json({ msg: "No hay archivo" });
      }
    }
    usuario.save(function (err) {
      if (err) {
        return res.status(500).json({ msg: "Error en el servidor" });
      }
      res.status(200).json({ msg: "Se ha actualizado tu foto de perfil." });
    });
  } catch (error) {
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

exports.actualizarCV = async (req, res) => {
  const iduser = req.params.iduser;
  try {
    const usuario = await Usuario.findById(iduser);
    if (usuario.cvURL) {
      const url = usuario.cvURL;
      const largoUrl = usuario.cvURL.length;
      const nameDocument = url.substr(28, largoUrl);
      const urlServer = "C:/Users/Abraham/Desktop/SapReact/Server/storage/cv";
      fs.unlink(urlServer.concat(nameDocument))
        .then(() => {
          console.log("Archivo eliminado");
        })
        .catch((err) => {
          console.log(err);
          console.error("Hubo un error al eliminar el archivo", err);
        });

      if (req.file) {
        const { filename } = req.file;
        usuario.setCvUrl(filename);
      } else {
        return res.status(500).json({ msg: "No hay archivo" });
      }
    } else {
      //subida de imagen
      if (req.file) {
        const { filename } = req.file;
        usuario.setCvUrl(filename);
      } else {
        return res.status(500).json({ msg: "No hay archivo" });
      }
    }
    usuario.save(function (err) {
      if (err) {
        return res.status(500).json({ msg: "Error en el servidor" });
      }
      res.status(200).json({ msg: "Se ha actualizado tu foto de perfil." });
    });
  } catch (error) {
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

exports.confirmarCuenta = async (req, res) => {
  const email = req.params.correo;

  let usuario = await Usuario.findOne({ email });

  if (!usuario) {
    res.status(404).send("No valido");
    res.redirect("https://www.zaptalent.cl/login");
    return;
  } //crear objeto usuario
  const userconfi = {
    email,
  };
  const name = usuario.nombres;
  const apellidos = usuario.apellidos;
  const rut = usuario.rut;
  const emails = usuario.email;
  const phone = usuario.phone;
  const ecivil = usuario.ecivil;
  const nacion = usuario.nacion;
  const direccion = usuario.direccion;

  usuario.activo = 1;

  await usuario.save();
  //Enviar email
  await enviarEmail.enviar({
    userconfi,
    subject:
      "Felicidades! hemos activado tu cuenta correctamente. Tus datos son: ",
    name,
    apellidos,
    rut,
    emails,
    phone,
    ecivil,
    nacion,
    direccion,
    archivo: "infouser",
  });

  //si el usuario no existe
  // Opens the URL in the default browser.
  res.writeHead(301, { Location: "https://www.zaptalent.cl/login" });
  res.end();
};

//VALIDAR EMAIL/RUT UNICOS
exports.validacionEmailRut = async (req, res) => {
  const { email, rut } = req.body;
  try {
    const emailValidado = await Usuario.findOne({ email: email });
    const rutValidado = await Usuario.findOne({ rut: rut });
    let _email = Boolean(emailValidado);
    let _rut = Boolean(rutValidado);
    return res.status(200).json({ _rut, _email });
  } catch (error) {
    res.status(400).json({ msg: "Error en el servidor" });
  }
};

exports.totalUsers = async (req, res) => {
  try {
    const totalusers = await Usuario.find({}).countDocuments();
    return res.status(200).json(totalusers);
  } catch (error) {
    console.log(error);
  }
};

exports.totalUsersDay = async (req, res) => {
  let inicio = new Date();
  let termino = new Date();

  query = {
    registro: {
      $gte: new Date(
        `${inicio.getFullYear()}-${String(inicio.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(inicio.getDate()).padStart(2, "0")}T00:00:00.000Z`
      ),
      $lte: new Date(
        `${termino.getFullYear()}-${String(termino.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(termino.getDate()).padStart(2, "0")}T23:59:59.999Z`
      ), 
    },
  };

  try {
    const totalusers = await Usuario.find(query).countDocuments();

    return res.status(200).json(totalusers);
  } catch (error) {
    console.log(error);
  }
};
