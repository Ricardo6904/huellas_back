const express = require('express');
const { validatorCrearUsuario } = require('../validators/usuario')
const customHeader = require('../middleware/customHeader')
const router = express.Router();

const usuarioController = require('../controllers/usuarioController')

router.get('/', usuarioController.obtenerUsuarios)

router.post('/', validatorCrearUsuario, usuarioController.crearUsuario)

router.get('/:idUsuario', usuarioController.obtenerUsuario)

router.put('/:idUsuario', usuarioController.actualizarUsuario)

router.delete('/:idUsuario', usuarioController.eliminarUsuario)

router.put('/:id/solicitudPendiente', usuarioController.actualizarCampoSolicitud)

module.exports = router;
