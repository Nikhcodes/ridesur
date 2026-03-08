const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { getAllUsers, getAllDrivers, getAllRides } = require('../controllers/adminController')

// simple admin check middleware
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admins only' })
  next()
}

router.get('/users', auth, adminOnly, getAllUsers)
router.get('/drivers', auth, adminOnly, getAllDrivers)
router.get('/rides', auth, adminOnly, getAllRides)

module.exports = router