const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const {
  getStatus,
  updateAvailability,
  getRideRequests,
  acceptRide,
  getCurrentRide,
  updateRideStatus,
  getDriverRides

} = require('../controllers/driverController')

router.get('/my-rides', auth, getDriverRides)
router.put('/availability', auth, updateAvailability)
router.get('/requests', auth, getRideRequests)
router.put('/accept/:id', auth, acceptRide)
router.get('/current-ride', auth, getCurrentRide)
router.put('/ride-status/:id', auth, updateRideStatus)

module.exports = router