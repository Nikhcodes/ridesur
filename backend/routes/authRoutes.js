const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { register, login, updateProfile, getNotifications, markAsRead } = require('../controllers/authController')

router.post('/register', register)
router.post('/login', login)
router.put('/profile', auth, updateProfile)
router.get('/notifications', auth, getNotifications)
router.put('/notifications/read', auth, markAsRead)

module.exports = router