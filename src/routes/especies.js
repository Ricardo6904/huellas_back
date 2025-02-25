const express = require('express');
const router = express.Router();

const especiesController = require('../controllers/especieController')

router.get('/', especiesController.obtener)

router.post('/', especiesController.crear)

router.get('/:id', especiesController.obtenerEspecie)

router.put('/:id', especiesController.actualizar)

router.delete('/:id', especiesController.eliminar)


module.exports = router;
