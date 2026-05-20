const express = require('express')
const { registerUser, loginUser } = require('../controllers/authController')
const { registerValidator, loginValidator } = require('../validators/authValidator')
const validateRequest = require('../middleware/validateMiddleware')

const router = express.Router()

router.post('/register', registerValidator, validateRequest, registerUser)
router.post('/login', loginValidator, validateRequest, loginUser)

module.exports = router
