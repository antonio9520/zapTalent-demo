const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  //Leer token del headear
  const token = req.header("x-auth-token");

  // console.log(token);
  //Revisar is hay token
  if (!token) {
    return res.status(401).json({ msg: "No hay token  permiso no valido" });
  }
  //validar token
  try {
    const cifrado = jwt.verify(token, process.env.SECRETA);
    // console.log(cifrado.usuario);
    req.usuario = cifrado.usuario;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token no valido" });
  }
};
