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
            <p>Solicitud de adopción creada, están interesados en la mascota <strong>${mascota.nombre}</strong>, ${mascota.raza}, ${mascota.edad},
            ${mascota.sexo} y me gustaría conocer más detalles sobre su personalidad, necesidades y requisitos de adopción.</p>
            <p>Estoy dispuesto/a a cumplir con los requisitos del proceso de adopción y asegurarme de proporcionar un hogar adecuado y lleno de cariño.</p>
            <p>Agradezco de antemano la información que puedan brindarme y quedo a la espera de su respuesta para saber los próximos pasos.</p>
            <p>Saludos cordiales,<br>
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

// Función para enviar correo
emailService.sendEmail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: 'mnzioss@gmail.com',
            to,
            subject,
            html: text,
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

module.exports = controller