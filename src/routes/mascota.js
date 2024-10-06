const express = require('express')
const router = express.Router()
const mascotaController = require('../controllers/mascotaController')

/**
 * Obtener todas las mascotas
 * @swagger
 * /mascota:
 *    get:
 *      tags:
 *        - Mascota
 *      summary: "Listar mascotas"
 *      description: Mostrar todas las mascotas existentes
 *      responses:
 *        '200':
 *          description: OK
 *        '402':
 *          description: Not allow because you need more permissions
 *    responses:
 *      '201':
 *        description: retorna el objeto insertado en la coleccion con stado '201'
 */
router.get('/', mascotaController.obtenerMascotas)

router.get('/:idMascota', mascotaController.obtenerMascota)

router.get('/refugio/:idRefugio', mascotaController.obtenerMascotasPorIdFundacion)

router.post('/', mascotaController.crearMascota)

router.put('/:idMascota', mascotaController.actualizarMascota)

router.delete('/:idMascota', mascotaController.eliminarMascota)

module.exports = router