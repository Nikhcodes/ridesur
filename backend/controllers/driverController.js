const db = require('../config/db')
const notify = require('../utils/notify')

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

      db.query('SELECT passenger_id FROM rides WHERE id = ?', [ride_id], (err, results) => {
        if (!err && results.length > 0) {
          notify(results[0].passenger_id, `Your ride #${ride_id} has been accepted by a driver!`)
        }
      })

      res.json({ message: 'Ride accepted' })
    }
  )
}

// Get current active ride for driver
exports.getCurrentRide = (req, res) => {
  const driver_id = req.user.id

  db.query(
    `SELECT rides.*, 
      users.name AS passenger_name,
      users.phone AS passenger_phone
     FROM rides 
     LEFT JOIN users ON rides.passenger_id = users.id
     WHERE rides.driver_id = ? AND rides.status IN ("accepted", "in_progress") 
     ORDER BY rides.created_at DESC LIMIT 1`,
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

      if (status === 'completed') {
        db.query('SELECT passenger_id FROM rides WHERE id = ?', [ride_id], (err, results) => {
          if (!err && results.length > 0) {
            notify(results[0].passenger_id, `Your ride #${ride_id} has been completed. Thanks for riding with RideSur!`)
          }
        })
      }

      res.json({ message: 'Status updated', status })
    }
  )
}

// Get all rides for this driver
exports.getDriverRides = (req, res) => {
  const driver_id = req.user.id

  db.query(
    `SELECT rides.*, 
      users.name AS passenger_name,
      ratings.score AS rating_score,
      ratings.comment AS rating_comment
     FROM rides 
     LEFT JOIN users ON rides.passenger_id = users.id
     LEFT JOIN ratings ON ratings.ride_id = rides.id
     WHERE rides.driver_id = ? 
     ORDER BY rides.created_at DESC`,
    [driver_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' })
      res.json(results)
    }
  )
}

exports.searchDriverRides = (req, res) => {
  const driver_id = req.user.id
  const { search, date } = req.query

  let query = `SELECT rides.*, 
    users.name AS passenger_name,
    ratings.score AS rating_score,
    ratings.comment AS rating_comment
   FROM rides 
   LEFT JOIN users ON rides.passenger_id = users.id
   LEFT JOIN ratings ON ratings.ride_id = rides.id
   WHERE rides.driver_id = ?`

  let params = [driver_id]

  if (search) {
    query += ' AND (rides.pickup LIKE ? OR rides.destination LIKE ?)'
    params.push(`%${search}%`, `%${search}%`)
  }

  if (date) {
    query += ' AND DATE(rides.created_at) = ?'
    params.push(date)
  }

  query += ' ORDER BY rides.created_at DESC'

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' })
    res.json(results)
  })
}

exports.getDriverInfo = (req, res) => {
  const { driver_id } = req.params

  db.query(
    `SELECT users.name, drivers.vehicle, drivers.license_number
     FROM drivers 
     LEFT JOIN users ON drivers.user_id = users.id
     WHERE drivers.user_id = ?`,
    [driver_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' })
      if (results.length === 0) return res.status(404).json({ message: 'Driver not found' })
      res.json(results[0])
    }
  )
}