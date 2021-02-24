const Usuario = require('../models/usuarioEmpresa');
const Empresa = require('../models/empresas');
const bcryptjs = require('bcryptjs');
const fs = require("fs").promises;
const jwtf = require('jsonwebtoken');
const enviarEmail = require("../../handlers/email");


exports.creaUserEmp = async (req, res) => {
    //Extracion de email y pass
    const {email, password, idemp } = req.body;

    try {
        //revisar si el usuario registrado es unico
        let usuario = await Usuario.findOne({email});
        let empresa = await Empresa.findOne({_id: idemp});

        if(usuario) {
            return res.status(400).json({msg: "el email ya se encuentra en uso"});
        }

        //Creacio nnuevo usuario
        usuario = new Usuario(req.body);

        //email
        const userconfi= {
          email
        } 
        
        //Informacion de empresa
        const razon = empresa.razon_social;
        const rut = empresa.rut;
        const giro = empresa.giro;
        const emailen = usuario.email;
        const direcciones = empresa.direcciones.direccion;
        const comuna = empresa.direcciones.comuna;
        const region = empresa.direcciones.region;
        const telefono = empresa.telefono;
        const resena = empresa.resena_empresa;


        //envio email cuenta creada
        await enviarEmail.enviar({
          userconfi,
          subject: "Felicidades te Acabas de inscribir en ZAPTalent",
          razon,
          rut,
          giro,
          emailen,
          direcciones,
          telefono,
          region,
          comuna,
          resena,
          archivo: "infoEmpresa"
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
                if( error) throw error;

                //mensaje de confirmacion
                res.json({tokenEmp});
            }
        )



    } catch (error) {
        console.log(error);
    }
}



  exports.putUsuarioEmp = async (req, res) => {
    console.log(req.file);
    const {
      email,
      fecinic,
      fecfin,
      tipo_perfil
    } = req.body;
  
    try {
      const iduserEmp = req.params.iduserEmp;
  
      await Usuario.findById(iduserEmp, function (err, usuario) {
        if (err) {
          console.log(err);
          return res.status(404).json({ msg: "Usuario no encontrado" });
        }
        if (tipo_perfil) usuario.tipo_perfil = tipo_perfil;
        if (email) usuario.email = email;
        if (fecinic) usuario.fecinic = fecinic;
        if (fecfin) usuario.fecfin = fecfin;
        // if (password) usuario.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync(15));
       
  
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
      const empresa = await Usuario.findById(id);
  
      res.json(empresa);
    } catch (error) {
      console.log(error);
      res.status(404).json({ msg: "error en el servidor " + error });
    }
  };
  