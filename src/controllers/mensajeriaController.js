const { body } = require('express-validator');
const nodemailer = require('nodemailer');
const { refugioModel } = require('../models')

controller = {}
const emailService = {}

controller.solicitarAdopcion = async (req, res) => {
    try {
        const { email, usuario, mascota } = req.body;
        const idRefugio = mascota.idRefugio
        const refugio = await refugioModel.findOne({ where: { id: idRefugio } })

        const mensaje = `
            <p>Solicitud de adopción recibida, están interesados en la mascota <strong>${mascota.nombre}</strong>, ${mascota.raza}, ${mascota.edad},
            ${mascota.sexo} y les gustaría conocer más detalles sobre su personalidad, necesidades y requisitos de adopción.</p>
            <p>Están dispuestos/as a cumplir con los requisitos del proceso de adopción y asegurarse de proporcionar un hogar adecuado y lleno de cariño.</p>
            <p>Favor de revisar la solicitud a la brevedad para poder ejecutar los próximos pasos del proceso de adopción.</p>
            <p>El quipo de, <strong>Adopta Huellas</strong><br>
            <br>
            Datos de contacto para el proceso de adopción: <br> 
            ${usuario.nombres} ${usuario.apellidos}<br>
            ${usuario.celular}<br>
            ${email}</p>
        `;

        //enviar correo
        await emailService.sendEmail(refugio.dataValues.email, 'Solicitud de adopción', mensaje);

        res.status(200).send({ message: 'Solicitud enviada con éxito' })


    } catch (error) {
        console.error('error', error);

    }
}

// Función para enviar correos
emailService.sendEmail = async (to, subject,  html) => {
    try {
        const mailOptions = {
            from: '"Adopta Huellas" <info@adoptahuellas.pet>', // Nombre y correo remitente
            to,    // Destinatario
            subject, // Asunto del correo
            html,    // HTML opcional
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado: %s', info.messageId);
    } catch (error) {
        console.error('Error al enviar correo:', error);
    }
};

// Configuración del transporte para Zoho Mail
const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com', // Servidor SMTP de Zoho
    port: 465,            // Puerto seguro para SSL
    secure: true,         // Usar SSL
    auth: {
        user: 'info@adoptahuellas.pet', // Tu correo corporativo de Zoho
        pass: 'AdoptaHuellas2025',          // Contraseña de tu cuenta
    },
});

module.exports = controller