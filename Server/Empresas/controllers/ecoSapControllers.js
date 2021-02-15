const Usuario = require("../../models/usuario");
const Adnsap = require("../../models/adnsap")
exports.obtenerUsuarios = async (req, res) => {
  const skip = req.params.skip;

  try {
    const Usuarios = await Usuario.find({}, undefined, {
      skip: parseInt(skip),
      limit: 40,
    });
    const dataUsers = await dataUsuarios(Usuarios);
    console.log(dataUsuarios)
    res.json(dataUsers);
  } catch (err) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

const dataUsuarios = async (data) => {
  let usuarios = [];

  for (let i = 0; i < data.length; i++) {
    const adnsap = await Adnsap.find(
      { iduser: data[i]._id },
      { name: 1, desc: 1 }
    );

    data[i].adns = adnsap;
    usuarios.push(data[i]);
  }
  console.log(usuarios)
  return usuarios;
};
