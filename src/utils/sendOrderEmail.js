const nodemailer = require (`nodemailer`)

const transporter = nodemailer.createTransport({
    service: `gmail`,
    port: 587,
    auth: {
        user: `tengoquecrearlo`,
        pass: `tengoquecrearlo`
    }
})

const sendOrderEmail = async (order) => {
    let result = await transporter.sendMail({
        from: "Ecommerce",
        to: order.purchaser,
        subject: `Ticket de compra ${order.code}`,

        html:`
        <h1> Orden Compra </h1>
        <p> Gracias por su Compra </p>
        <p> Esta es su Orden </p>
        <p> Código: ${order.code} </p>
        <p> Fecha: ${order.purchase_datetime} </p>
        <p> Total: ${order.amount} </p>
        
        `
    })

    return result
}

module.exports = { sendOrderEmail }