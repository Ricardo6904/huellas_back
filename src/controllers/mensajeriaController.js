const { body } = require('express-validator');
const nodemailer = require('nodemailer');

controller = {}
const emailService = {}

controller.solicitarAdopcion = async (req, res) => {
    try {
        const { email, telefono, mascota } = req.body;

        //crear el mensaje
        const mensaje = `Tienes una solicitud pendiente para adoptar a ${mascota.nombreMascota}, 
        por favor verifica los datos del remitente ${email} para que te pongas en contacto y continúe el proceso de adopción...`;

        //enviar correo
        await emailService.sendEmail(email, 'Solicitud de adopción', mensaje);

        res.status(200).send({ message: 'Solicitud enviada con éxito' })


    } catch (error) {
        console.error('error', error);

    }
}

// Función para enviar correo
emailService.sendEmail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: 'mnzioss@gmail.com',
            to,
            subject,
            text,
        };

        await transporter.sendMail(mailOptions);
        console.log('Correo enviado con éxito');
    } catch (error) {
        console.error('Error enviando el correo:', error);
        throw error;
    }
};

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mnzioss@gmail.com',
        pass: 'sypv magx lwak kmqy',
    },
});
//test pass
//xpyq apuv ymaw bkbi

/*
//configuración de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mnzioss@gmail.com',
        pass: 'Minameismethos1*'
    },
});

//configuración de twilio 
const accountSid = '';
const authToken = '';
const client = twilio(accountSid, authToken)

//Función para enviar el correo
async function sendEmail(to, subject, text) {
    try {
        const mailOptions = {
            from: 'mnzioss@gmail.com',
            to,
            subject,
            text
        };

        await transporter.sendMail(mailOptions);
        console.log('Correo enviado con éxito');
        
    } catch (error) {  
        console.log('Error enviando el correo', error);
        
    }
}

//función para enviar whatsapp
async function sendWhatsApp(to, message) {
    try {
        await client.messages.create({
            from: 'whatsapp:+593983041387',
            to: `whatsapp:${to}`,
            body: message
        })
        console.log('Mesaje de WhatsApp enviado con éxito');
        
    } catch (error) {
        console.log('Error enviando mensaje de WhatsApss', error);
        
    }
}
*/
module.exports = controller