const nodemailer = require (`nodemailer`)
const { configObject : { nodemailer_user, nodemailer_password} } = require (`../config/confi.js`);
const { logger } = require("./loggers.js");


const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: true,
        auth: {   
            user: nodemailer_user,
            pass: `nnwblrnitkqsrhnn`,
        },
});

const sendlinkEmail = async (token, email) => {
  let result = await transporter.sendMail({
    from: "ecommerce",
    to: email,
    subject: "Recuperar contraseña",
    // Mandamos el link de cambio de password"
    html: `
      <h1>Recuperar contraseña</h1>
      <p>Para recuperar tu contraseña haz click en el siguiente link</p>
      <a href="http://localhost:8080/changePassword/${token}">Recuperar contraseña</a>
    `,

  })

//   from: `ecommerces <${nodemailer_user}>`,
//   to: ticket.purchaser,
//   subject: "Email verification",
//   html:`<div>
//             <h1>Ticket de compra</h1>
//             <p>Gracias por tu compra</p>
//             <p>Este es tu ticket de compra</p>
//             <p>Código: ${ticket.code}</p>
//             <p>Fecha: ${ticket.purchase_datetime}</p>
//             <p>Total: ${ticket.amount}</p>
            
    
//         </div>`,

//     // attachments: [{
//     //     filename:`1696984040162-kitbomba.png`,
//     //     path: __dirname + `1696984040162-kitbomba.png`,
//     //     cid: `1696984040162-kitbomba.png`
        
//     // }],
    
           
    
// };


// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     logger.error("Error in sending email  " + error);
//     return true;
//   } else {
//    logger.info("Email sent: " + info.response);
//    return false;
//   }
//  });
};

module.exports = sendlinkEmail;


