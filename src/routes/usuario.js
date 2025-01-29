const express = require('express');
const { validatorCrearUsuario } = require('../validators/usuario')
const customHeader = require('../middleware/customHeader')
const authMiddleware = require('../middleware/session')

const router = express.Router();

const usuarioController = require('../controllers/usuarioController')

router.get('/', authMiddleware, usuarioController.obtenerUsuarios)

router.post('/', validatorCrearUsuario, usuarioController.crearUsuario)

router.get('/:idUsuario', authMiddleware, usuarioController.obtenerUsuario)

router.put('/:idUsuario', authMiddleware, usuarioController.actualizarUsuario)

router.delete('/:idUsuario', authMiddleware, usuarioController.eliminarUsuario)

router.put('/:id/solicitudPendiente', authMiddleware, usuarioController.actualizarCampoSolicitud)

module.exports = router;
