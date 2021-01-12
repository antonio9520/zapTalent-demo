const passport = require("passport");
const dotenv = require("dotenv");
const strategy = require("passport-facebook");
const usuario = require("../models/usuario");
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const FacebookStrategy = strategy.Strategy;
dotenv.config();

exports.facebooklogin = (req, res) => {
  const { userID, accessToken } = req.body;
  let urlGraphFacebook = `https://graph.facebook.com/v8.0/${userID}/?fields=id,name,email&access_token=${accessToken}`;
  fetch(urlGraphFacebook, {
    method: "GET",
  })
    .then((rese) =>  {  return (rese.json()) })
    .then((rese) => {
     console.log(rese);
      const { email, name, id} = rese;
      usuario.findOne({ email }).exec((err, Usuario) => {
        if (err) {
          return res.status(400).json({
            error: "Something went wrong",
          });
        } else {
          if (Usuario) {
            const token = jwt.sign({ usuario: {id: Usuario.id} }, process.env.SECRETA, {
              expiresIn: "7d",
            });
            const { id, nombres, email } = Usuario;
            res.json({
              token,
              Usuario: { id, nombres, email },
              type: "USUARIO_ENCONTRADO",
            }); 
          } else {
            res.json({
              type: "USUARIO_NUEVO",
              email , id, name
            })
          }
        }
      }); 
    });
};
