const express = require('express')
const router = express.Router()
const mensajeriaController = require('../controllers/mensajeriaController')
const authMiddleware = require('../middleware/session')

router.post('/solicitar-adopcion', authMiddleware, mensajeriaController.solicitarAdopcion)
router.post('/:id/solicitud-aceptada', authMiddleware, mensajeriaController.solicitudAceptada)
router.post('/:id/solicitud-rechazada', authMiddleware, mensajeriaController.solicitudRechazada)

module.exports = router;