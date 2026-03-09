const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const {
  bookRide,
  getPassengerRides,
  searchRides,
  submitRating,
  getDriverRating,
  getDriverReviews 
} = require('../controllers/rideController')

router.post('/book', auth, bookRide)
router.get('/my-rides', auth, getPassengerRides)
router.get('/search', auth, searchRides)
router.post('/rate', auth, submitRating)
router.get('/driver-rating/:driver_id', auth, getDriverRating)
router.get('/driver-reviews/:driver_id', auth, getDriverReviews)

module.exports = router