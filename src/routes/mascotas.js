const express = require('express')
const router = express.Router()
const mascotaController = require('../controllers/mascotaController')
const authMiddleware = require('../middleware/session')

router.get('/', mascotaController.obtenerMascotas)

router.get('/:id', mascotaController.obtenerMascota)

router.get('/usuario/:id', mascotaController.obtenerMascotasPorIdUsuario)

router.post('/', authMiddleware, mascotaController.crearMascota)

router.put('/:id', authMiddleware, mascotaController.actualizarMascota)

router.delete('/:id', authMiddleware, mascotaController.eliminarMascota)

router.put('/estado/:id', mascotaController.cambiarEstado)

router.get('/redirect/:id', mascotaController.redirigirMascota);

module.exports = router