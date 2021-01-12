const mongoose = require("mongoose");
const { appConfig } = require("../config/config");

const fotosemailSchema = mongoose.Schema({ 
    imgURL: {
        type: String
    },
    name: {
        type: String
    }
})

fotosemailSchema.methods.setimgURL = function setimgURL(filename) {
    const { host, port } = appConfig;
    this.imgURL = `https://zaptalent.azurewebsites.net/public/imaemail/${filename}`;
  };


module.exports = mongoose.model("fotoemail", fotosemailSchema);
