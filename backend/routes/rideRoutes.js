const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { bookRide, getPassengerRides } = require('../controllers/rideController')

router.post('/book', auth, bookRide)
router.get('/my-rides', auth, getPassengerRides)

module.exports = router