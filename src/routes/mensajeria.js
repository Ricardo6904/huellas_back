const express = require('express')
const router = express.Router()
const mensajeriaController = require('../controllers/mensajeriaController')

router.post('/solicitar-adopcion', mensajeriaController.solicitarAdopcion)

module.exports = router;