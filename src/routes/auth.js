const express = require('express')
const router = express.Router()
const validator = require('../validators/auth')
const authController = require('../controllers/authController')

router.post('/register', validator.validatorRegistrarUsuario, authController.register)

router.post('/login', validator.validatorLogin, authController.login)

router.post('/registerRefugio', validator.validatorRegistrarRefugio, authController.registerRefugio)

router.post('/loginRefugio', validator.validatorLoginRefugio,authController.loginRefugio)


module.exports = router