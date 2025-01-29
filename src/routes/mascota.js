const express = require('express')
const router = express.Router()
const mascotaController = require('../controllers/mascotaController')
const authMiddleware = require('../middleware/session')

router.get('/', authMiddleware, mascotaController.obtenerMascotas)

router.get('/:id', authMiddleware, mascotaController.obtenerMascota)

router.get('/refugio/:idRefugio', authMiddleware, mascotaController.obtenerMascotasPorIdFundacion)

router.post('/', authMiddleware, mascotaController.crearMascota)

router.put('/:idMascota', authMiddleware, mascotaController.actualizarMascota)

router.delete('/:idMascota', authMiddleware, mascotaController.eliminarMascota)

router.post('/:id/incrementar-solicitudes', controller.incrementarSolicitudes)

router.post('/:id/decrementar-solicitudes', controller.decrementarSolicitudes)

router.put('/:id/mascotaAdoptada', authMiddleware, controller.mascotaAdoptada)

module.exports = router