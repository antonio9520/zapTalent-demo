const nodemailer = require('nodemailer');
const emailConfig = require('../config/email');
const util = require('util');
const htmlToText = require('html-to-text');
const pug = require('pug');
const juice = require('juice');


let transporter = nodemailer.createTransport({
    service: emailConfig.service,
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
    },
    starttls: { enable: true }, 
    secureConnection: true,
});

//generar HTML
const generarHTML = (archivo, opciones = {}) => {
    const html = pug.renderFile(`${__dirname}/../handlers/views/${archivo}.pug`, opciones);
    return juice(html);
}


exports.enviar = async (opciones) => {
    const html = generarHTML(opciones.archivo, opciones);
    const text = htmlToText.fromString(html);
     // send mail with defined transport object
 let info =  {
    from: '"ZapTalent ✔" <no-reply@ZapTalent.cl>', // sender address
    to: opciones.userconfi.email, // list of receivers
    subject: opciones.subject, // Subject line
    text, // plain text body
    html // html body
  };
  const enviarEmail = util.promisify(transporter.sendMail, transporter)
  return enviarEmail.call(transporter, info)
}
