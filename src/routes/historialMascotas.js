const express = require('express')
const router = express.Router()
const historialMascotasController = require('../controllers/historialMascotaController')
const authMiddleware = require('../middleware/session')

router.get('/', historialMascotasController.obtenerHistorialMascotas)

router.get('/:id', historialMascotasController.obtener)

router.get('/usuario/:id', historialMascotasController.obtenerHistorialMascotasPorIdUsuario)

router.post('/', authMiddleware, historialMascotasController.crear)

router.put('/:id', authMiddleware, historialMascotasController.actualizar)

router.delete('/:id', authMiddleware, historialMascotasController.eliminar)

module.exports = router