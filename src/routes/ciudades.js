const express = require('express');
const router = express.Router();

const ciudadController = require('../controllers/ciudadController')

router.get('/', ciudadController.obtenerCiudades)

router.post('/', ciudadController.crearCiudad)

router.get('/:idCiudad', ciudadController.obtenerCiudad)

router.get('/provincia/:idProvincia', ciudadController.obtenerCiudadPorIdprovincia)

router.put('/:idCiudad', ciudadController.actualizarCiudad)

router.delete('/:idCiudad', ciudadController.eliminarCiudad)


module.exports = router;
