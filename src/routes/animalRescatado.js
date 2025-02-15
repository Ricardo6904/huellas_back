const express = require('express')
const router = express.Router()
const animalRescatadoController = require('../controllers/animalRescatadoController')
const authMiddleware = require('../middleware/session')

router.get('/', animalRescatadoController.obtenerMascotas)

router.get('/:id', animalRescatadoController.obtenerMascota)

router.get('/refugio/:idRefugio', authMiddleware, animalRescatadoController.obtenerMascotasPorIdFundacion)

router.post('/', authMiddleware, animalRescatadoController.crearMascota)

router.put('/:id', authMiddleware, animalRescatadoController.actualizarMascota)

router.delete('/:id', authMiddleware, animalRescatadoController.eliminarMascota)

/* router.post('/:id/incrementar-solicitudes', controller.incrementarSolicitudes)

router.post('/:id/decrementar-solicitudes', controller.decrementarSolicitudes)
 */
router.put('/:id/mascotaAdoptada', authMiddleware, animalRescatadoController.mascotaAdoptada)

module.exports = router