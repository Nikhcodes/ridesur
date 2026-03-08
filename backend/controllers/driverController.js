const db = require('../config/db')

// Get driver availability status
exports.getStatus = (req, res) => {
  const user_id = req.user.id

  db.query('SELECT is_available FROM drivers WHERE user_id = ?', [user_id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' })
    if (results.length === 0) return res.status(404).json({ message: 'Driver not found' })
    res.json({ is_available: results[0].is_available })
  })
}

// Toggle availability
exports.updateAvailability = (req, res) => {
  const user_id = req.user.id
  const { is_available } = req.body

  db.query(
    'UPDATE drivers SET is_available = ? WHERE user_id = ?',
    [is_available, user_id],
    (err) => {
      if (err) return res.status(500).json({ message: 'Error updating availability' })
      res.json({ is_available })
    }
  )
}

// Get all open ride requests
exports.getRideRequests = (req, res) => {
  db.query(
    'SELECT * FROM rides WHERE status = "requested" AND driver_id IS NULL ORDER BY created_at DESC',
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' })
      res.json(results)
    }
  )
}

// Accept a ride
exports.acceptRide = (req, res) => {
  const driver_id = req.user.id
  const ride_id = req.params.id

  db.query(
    'UPDATE rides SET driver_id = ?, status = "accepted" WHERE id = ? AND status = "requested"',
    [driver_id, ride_id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Error accepting ride' })
      if (result.affectedRows === 0) return res.status(400).json({ message: 'Ride no longer available' })
      res.json({ message: 'Ride accepted' })
    }
  )
}

// Get current active ride for driver
exports.getCurrentRide = (req, res) => {
  const driver_id = req.user.id

  db.query(
    'SELECT * FROM rides WHERE driver_id = ? AND status IN ("accepted", "in_progress") ORDER BY created_at DESC LIMIT 1',
    [driver_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' })
      if (results.length === 0) return res.status(404).json({ message: 'No active ride' })
      res.json(results[0])
    }
  )
}

// Update ride status
exports.updateRideStatus = (req, res) => {
  const { status } = req.body
  const ride_id = req.params.id
  const driver_id = req.user.id

  db.query(
    'UPDATE rides SET status = ? WHERE id = ? AND driver_id = ?',
    [status, ride_id, driver_id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Error updating status' })
      if (result.affectedRows === 0) return res.status(400).json({ message: 'Ride not found' })
      res.json({ message: 'Status updated', status })
    }
  )
}

// Get all rides for this driver
exports.getDriverRides = (req, res) => {
  const driver_id = req.user.id

  db.query(
    'SELECT * FROM rides WHERE driver_id = ? ORDER BY created_at DESC',
    [driver_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' })
      res.json(results)
    }
  )
}