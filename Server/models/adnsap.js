const mongoose = require("mongoose");
const { appConfig } = require("../config/config");

const adnsapSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  submodulos: [{}],
  idcert: {
    type: String,
    trim: true,
  },
  obs: {
    type: String,
    trim: true,
  },
  iduser: {
    type: String,
    trim: true,
  },
  desc: {
    type: String,
    trim: true,
  },
  adnURL: {
    type: String,
  },
});

adnsapSchema.methods.setcertificadoURL = function setcertificadoURL(filename) {
  const { host, port } = appConfig;
  this.adnURL = `https://zaptalent.azurewebsites.net/public/adns/${filename}`;
};
module.exports = mongoose.model("Adnsap", adnsapSchema);
