//import  express  from 'express';
const express = require("express");
const conectarDB = require("./config/db");
const passport = require("passport");
const cors = require("cors");
//Creacion de servidor
const server = express();

//conectar a la bd
conectarDB();
server.use(cors());
//Habiltiar express.json
server.use(express.json({ extended: true }));

//puerto de la app
const port = process.env.PORT || 4000;

//Login ne general
//Login Face
server.use(passport.initialize());
// import de rutas Usuario
server.use("/public/empresas", express.static(`${__dirname}/storage/empresas`));
server.use("/public", express.static(`${__dirname}/storage/usuario`));
server.use("/public/cv", express.static(`${__dirname}/storage/cv`));
server.use("/public/estudios", express.static(`${__dirname}/storage/estudios`));
server.use("/public/imaemail", express.static(`${__dirname}/storage/imaemail`));
server.use("/public/logoEmp", express.static(`${__dirname}/storage/logoEmp`));
server.use(
  "/public/certificados",
  express.static(`${__dirname}/storage/certificados`)
);
server.use("/public/adns", express.static(`${__dirname}/storage/adns`));
server.use("/api/usuarios", require("./routes/usuarios"));
//autenticacion
server.use("/api/auth", require("./routes/auth"));
//import ruta user facebook
server.use("/api/facebooklogin", require("./routes/usuarioface"));
//google login
server.use("/api/googlelogin", require("./routes/googlelogin"));
//importar rutas de trabajos
server.use("/api/trabajos", require("./routes/mistrabajos"));
//importar rutas de estudios
server.use("/api/estudios", require("./routes/estudios"));
//importar rutas de certificaciones
server.use("/api/certificacion", require("./routes/certificacion"));
//Importar ruta de AdnSap
server.use("/api/adnsap", require("./routes/adnsap"));
//Importar ruta para restablecer contrasena
server.use("/api/restablecer", require("./routes/restablecer"));
//import actualizar contrase;a
server.use("/api/actualizarpass", require("./routes/cambiarpass"));
//ruta confirmacion
server.use("/api/confirmar", require("./routes/confirmar"));
//ruta imagenes email
server.use("/api/fotoemail", require("./routes/imaemail"));
//ruta ofertas laborales
server.use("/api/ofertasLaborales", require("./routes/ofertasLaborales"));
//ruta counter home
server.use("/api/homeCounter", require("./routes/homeCounter"));
//===================================================================================
//===================================================================================

//-----------------------------------
//Rutas Empresas
//-----------------------------------

//Autentificacion Usuario Empresa
server.use("/api/authEmpresa", require("./Empresas/routes/authEmpresa"));
//Usuario Empresa
server.use("/api/usuarioEmpresa", require("./Empresas/routes/usuarioEmpresa"));
//Avisos routes
server.use("/api/avisos", require("./Empresas/routes/avisos"));
//EcoSap routes
server.use("/api/ecoSap", require("./Empresas/routes/ecoSap")); 
//empresas datos
server.use("/api/empresas", require("./Empresas/routes/empresas"));
//postulacion routes
server.use("/api/postulacion", require("./Empresas/routes/postulacionR"));

//-----------------------------------
//Fin Rutas Empresas
//-----------------------------------

//===================================================================================
//===================================================================================

//-----------------------------------
//Rutas Admin
//-----------------------------------
//Autentificacion Admin
server.use("/api/authAdmin", require("./Admin/routes/authAdmin"));
//Usuario Admin
server.use("/api/usuarioAdmin", require("./Admin/routes/usuarioAdmin"));

//-----------------------------------
//Fin Rutas Admin
//-----------------------------------

//arrancar app
server.listen(port, "0.0.0.0", () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});

require("./handlers/email");
