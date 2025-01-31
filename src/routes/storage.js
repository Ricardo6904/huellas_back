const express = require('express')
const router = express.Router()
const uploadMiddleware = require('../utils/handleStorage')
const storageController = require('../controllers/storageController')
const upload = require('../utils/handleMulter')

router.get('/:idStorage', storageController.obtenerStoragePorId)

router.get('/', storageController.obtenerStorages)

router.post('/', upload.single('file'), storageController.crearStorage)

router.delete('/:idStorage', storageController.eliminarStorage)

module.exports = router