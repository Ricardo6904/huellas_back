const express = require('express')
const router = express.Router()
const mascotaController = require('../controllers/mascotaController')

router.get('/', mascotaController.obtenerMascotas)

router.get('/:id', mascotaController.obtenerMascota)

router.get('/refugio/:idRefugio', mascotaController.obtenerMascotasPorIdFundacion)

router.post('/', mascotaController.crearMascota)

router.put('/:idMascota', mascotaController.actualizarMascota)

router.delete('/:idMascota', mascotaController.eliminarMascota)

router.post('/:id/incrementar-solicitudes', controller.incrementarSolicitudes)

router.post('/:id/decrementar-solicitudes', controller.decrementarSolicitudes)

router.put('/:id/mascotaAdoptada', controller.mascotaAdoptada)

module.exports = router