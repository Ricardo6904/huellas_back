const express = require('express')
const router = express.Router()
const mascotaController = require('../controllers/mascotaController')

router.get('/', mascotaController.obtenerMascotas)

router.get('/:idMascota', mascotaController.obtenerMascota)

router.get('/refugio/:idRefugio', mascotaController.obtenerMascotasPorIdFundacion)

router.post('/', mascotaController.crearMascota)

router.put('/:idMascota', mascotaController.actualizarMascota)

router.delete('/:idMascota', mascotaController.eliminarMascota)

module.exports = router