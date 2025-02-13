const express = require('express');
const { validatorCrearUsuario } = require('../validators/usuario')
const customHeader = require('../middleware/customHeader')
const authMiddleware = require('../middleware/session')
const { validarInfoAdicional } = require('../validators/infoAdicional');

const router = express.Router();

const usuarioController = require('../controllers/usuarioController');

router.get('/', authMiddleware, usuarioController.obtenerUsuarios)

router.post('/', validatorCrearUsuario, usuarioController.crearUsuario)

router.get('/:idUsuario', usuarioController.obtenerUsuario)

router.put('/:idUsuario', authMiddleware, usuarioController.actualizarUsuario)

router.delete('/:idUsuario', authMiddleware, usuarioController.eliminarUsuario)

router.put('/:id/solicitudPendiente', authMiddleware, usuarioController.actualizarCampoSolicitud)

router.put('/:idUsuario/info-adicional', authMiddleware, validarInfoAdicional, usuarioController.actualizarInfoAdicional)

router.get('/:idUsuario/info-adicional', authMiddleware, usuarioController.obtenerInfoAdicional)

module.exports = router;
