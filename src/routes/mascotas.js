const express = require('express')
const router = express.Router()
const mascotaController = require('../controllers/animalRescatadoController')
const authMiddleware = require('../middleware/session')

router.get('/', mascotaController.obtenerMascotas)

router.get('/:id', mascotaController.obtenerMascota)

router.post('/', authMiddleware, mascotaController.crearMascota)

router.put('/:id', authMiddleware, mascotaController.actualizarMascota)

router.delete('/:id', authMiddleware, mascotaController.eliminarMascota)


module.exports = router