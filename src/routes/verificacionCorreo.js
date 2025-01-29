const express = require('express');
const router = express.Router();

const verificacionCorreoController = require('../controllers/verificacionCorreoController')

router.get('/verify-email', verificacionCorreoController.verifyEmail)


module.exports = router;
