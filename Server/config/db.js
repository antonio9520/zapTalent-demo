const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      userFindAndModify: false,
    });
    console.log("DB CONECTADA");
  } catch (error) {
    console.log(error);
    console.log("valgo tula");
    process.exit(1); //Detencion de la app
  }
};

module.exports = conectarDB;
