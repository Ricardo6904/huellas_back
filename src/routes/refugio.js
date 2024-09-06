const express = require('express')
const router = express.Router()
const uploadMiddleware = require('../utils/handleStorage')

const refugioController = require('../controllers/refugioController')

router.get('/', refugioController.obtenerRefugios)

router.post('/', refugioController.crearRefugio)

router.get('/:idRefugio', refugioController.obtenerRefugio)

router.put('/:idRefugio', refugioController.actualizarRefugio)

router.delete('/:idRefugio', refugioController.eliminarRefugio)

module.exports = router;