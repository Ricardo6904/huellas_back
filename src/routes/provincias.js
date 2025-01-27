const express = require('express');
const router = express.Router();

const provinciaController = require('../controllers/provinciaController')

router.get('/', provinciaController.obtenerProvincias)

router.post('/', provinciaController.crearProvincia)

router.get('/:idProvincia', provinciaController.obtenerProvincia)

router.put('/:idProvincia', provinciaController.actualizarProvincia)

router.delete('/:idProvincia', provinciaController.eliminarProvincia)


module.exports = router;
