const express = require('express');
const router = express.Router();

const redesSocialesController = require('../controllers/redesSocialesController')

router.get('/', redesSocialesController.obtener)

router.post('/', redesSocialesController.crear)

router.get('/:idRefugio', redesSocialesController.obtenerRedSocialPorIdRefugio)

router.put('/:id', redesSocialesController.actualizar)

router.delete('/:id', redesSocialesController.eliminar)


module.exports = router;
