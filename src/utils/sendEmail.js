const nodemailer = require (`nodemailer`)
const { configObject : { nodemailer_user, nodemailer_password} } = require (`../config/confi.js`)


const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: true,
        auth: {   
            user: nodemailer_user,
            pass: "nnwblrnitkqsrhnn",
        },
});

const sendEmail = (ticket) => {
 const mailOptions = {
  from: `ecommerces <${nodemailer_user}>`,
  to: ticket.purchaser,
  subject: "Email verification",
  html:`<div>
            <h1>Ticket de compra</h1>
            <p>Gracias por tu compra</p>
            <p>Este es tu ticket de compra</p>
            <p>Código: ${ticket.code}</p>
            <p>Fecha: ${ticket.purchase_datetime}</p>
            <p>Total: ${ticket.amount}</p>
            
    
        </div>`,

    // attachments: [{
    //     filename:`1696984040162-kitbomba.png`,
    //     path: __dirname + `1696984040162-kitbomba.png`,
    //     cid: `1696984040162-kitbomba.png`
        
    // }],
    
           
    
};


transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log("Error in sending email  " + error);
    return true;
  } else {
   console.log("Email sent: " + info.response);
   return false;
  }
 });
};

module.exports = sendEmail;


