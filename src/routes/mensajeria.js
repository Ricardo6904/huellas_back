const express = require('express')
const router = express.Router()
const mensajeriaController = require('../controllers/mensajeriaController')

router.post('/solicitar-adopcion', mensajeriaController.solicitarAdopcion)
router.post('/:id/solicitud-aceptada', mensajeriaController.solicitudAceptada)
router.post('/:id/solicitud-rechazada', mensajeriaController.solicitudRechazada)

module.exports = router;