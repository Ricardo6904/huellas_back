const { body, matchedData } = require('express-validator');
const nodemailer = require('nodemailer');
const { refugioModel, adopcionModel, usuarioModel, mascotaModel } = require('../models')

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
emailService.sendEmail = async (to, subject, html) => {
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
controller.solicitudAceptada = async (req, res) => {
    try {
        const { id } = req.params

        const adopcion = await adopcionModel.findOne({
            where: { id: id }
        })

        const usuario = await usuarioModel.findOne({
            where: { id: adopcion.idUsuario }
        })
        const mascota = await mascotaModel.findOne({
            where: { id: adopcion.idMascota }
        })
        const mensaje = `
            <p>¡Felicidades, ${usuario.nombres}  ${usuario.apellidos}!</p>
            <p>Nos complace informarte que tu solicitud para adoptar a <strong>${mascota.nombre}</strong>, un/a ${mascota.raza}, ${mascota.edad}, ${mascota.sexo}, ha sido <strong>aprobada</strong>.</p>
            <p>Estamos emocionados de que <strong>${mascota.nombre}</strong> pronto encuentre un hogar lleno de amor contigo. En breve, nuestro equipo se pondrá en contacto para coordinar los siguientes pasos y asegurarnos de que la transición sea lo más cómoda posible para ambos.</p>
            <p>Gracias por abrir tu corazón y tu hogar para darle a <strong>${mascota.nombre}</strong> una nueva oportunidad de ser feliz.</p>
            <p>Un saludo,<br>
            El equipo de <strong>Adopta Huellas</strong></p>
        `;

        // Enviar correo
        await emailService.sendEmail(usuario.email, '¡Felicidades! Tu solicitud ha sido aprobada 🎉', mensaje);

        res.status(200).send({ message: 'Correo de aprobación enviado con éxito' });
    } catch (error) {
        console.error('Error al enviar correo de aprobación:', error);
        res.status(500).send({ message: 'Hubo un error al procesar la solicitud' });
    }
};

controller.solicitudRechazada = async (req, res) => {
    try {
        const { id } = req.params

        const adopcion = await adopcionModel.findOne({
            where: { id: id }
        })
        console.log('adopcion acepata', id, adopcion);

        const usuario = await usuarioModel.findOne({
            where: { id: adopcion.idUsuario }
        })
        const mascota = await mascotaModel.findOne({
            where: { id: adopcion.idMascota }
        })

        const mensaje = `
            <p>Hola, ${usuario.nombres} ${usuario.apellidos}.</p>
            <p>Lamentamos informarte que, después de revisar tu solicitud para adoptar a <strong>${mascota.nombre}</strong>, ${mascota.raza}, ${mascota.edad}, ${mascota.sexo}, no ha sido posible aprobar la adopción en este momento.</p>
            <p>Esta decisión no refleja tu capacidad de ofrecer un hogar amoroso, sino que responde a las necesidades específicas de <strong>${mascota.nombre}</strong> y los criterios de adopción establecidos por nuestro equipo.</p>
            <p>Te invitamos a seguir participando en nuestras iniciativas de adopción, ya que muchas otras mascotas están esperando una oportunidad para formar parte de una familia.</p>
            <p>Agradecemos tu interés y comprensión.<br>
            Con afecto,<br>
            El equipo de <strong>Adopta Huellas</strong></p>
        `;

        // Enviar correo
        await emailService.sendEmail(usuario.dataValues.email, 'Decisión sobre tu solicitud de adopción', mensaje);

        res.status(200).send({ message: 'Correo de rechazo enviado con éxito' });
    } catch (error) {
        console.error('Error al enviar correo de rechazo:', error);
        res.status(500).send({ message: 'Hubo un error al procesar la solicitud' });
    }
};

controller.enviarVerificacionEmail = async (email, verificacionlink) => {
    //const { email, token } = req.body;
    await emailService.sendEmail(email, 'Verificación de correo' ,'Verificación de Correo', `<p>Por favor, haz clic en el siguiente enlace para verificar tu correo electrónico:</p><a href="${verificationLink}">${verificationLink}</a>`)
}

controller.recuperarContrasena = async(email, clave) => {
    const mensaje = `<p>Su nueva contraseña es: ${clave}<p/><br>
    <p>El equipo de <strong>Adopta Huellas</strong></p>`
    await emailService.sendEmail(email, 'Contraseña olvidada', mensaje)
}
module.exports = controller