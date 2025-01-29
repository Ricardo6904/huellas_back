const controller={}
const jwt = require('jsonwebtoken');

controller.verifyEmail = (req, res) => {
    const { token } = req.query;

    jwt.verify(token, 'secreto', (err, decoded) => {
        if (err) {
            return res.status(400).send('Token inválido o expirado.');
        }

        const { email } = decoded;
        // Aquí puedes actualizar la base de datos del usuario para marcarlo como verificado
        // Usuario.update({ email }, { verified: true });

        res.status(200).send('Correo verificado exitosamente.');
    });
};

module.exports = controller;
//app.get('/verify-email', verifyEmail);
