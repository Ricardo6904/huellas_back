const express = require('express');
const router = express.Router();

const razasController = require('../controllers/razasController')

router.get('/', razasController.obtener)

router.post('/', razasController.crear)

router.get('/:id', razasController.obtenerRaza)

router.get('/especie/:idEspecie', razasController.obtenerRazaPorIdEspecie)

router.put('/:id', razasController.actualizar)

router.delete('/:id', razasController.eliminar)


module.exports = router;
