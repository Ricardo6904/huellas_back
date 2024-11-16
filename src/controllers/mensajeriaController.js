const { body } = require('express-validator');
const nodemailer = require('nodemailer');
const { refugioModel } = require('../models')

controller = {}
const emailService = {}

controller.solicitarAdopcion = async (req, res) => {
    try {
        const { email, telefono, mascota } = req.body;
        const refugio = refugioModel.findOne({idMascota:mascota.id})
        //crear el mensaje
        const mensaje = `Tienes una solicitud pendiente para adoptar a ${mascota.nombre}, 
        por favor verifica los datos del remitente ${email} para que te pongas en contacto y continúe el proceso de adopción...`;

        const msg = `En particular, estoy interesado/a en [especificar tipo de animal: perro, gato, etc.] y me gustaría conocer 
        más detalles sobre su personalidad, necesidades y requisitos de adopción. Estoy dispuesto/a a cumplir con los requisitos 
        del proceso de adopción y asegurarme de proporcionar un hogar adecuado y lleno de cariño. Agradezco de antemano la 
        información que puedan brindarme y quedo a la espera de su respuesta para saber los próximos pasos.

        Saludos cordiales,
        [Tu nombre]
        [Tu número de contacto]
        [Tu dirección de correo electrónico]`

        //enviar correo
        await emailService.sendEmail(refugio.email, 'Solicitud de adopción', mensaje);

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