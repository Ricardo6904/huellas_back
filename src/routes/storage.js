const express = require('express')
const router = express.Router()
const uploadMiddleware = require('../utils/handleStorage')
const storageController = require('../controllers/storageController')

router.get('/:idStorage', storageController.obtenerStoragePorId)

router.get('/', storageController.obtenerStorages)

router.post('/', uploadMiddleware.single('myfile'), storageController.crearStorage)

router.delete('/:idStorage', storageController.eliminarStorage)

module.exports = router