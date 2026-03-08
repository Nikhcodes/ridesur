const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { register, login, updateProfile } = require('../controllers/authController')

router.post('/register', register)
router.post('/login', login)
router.put('/profile', auth, updateProfile)

module.exports = router