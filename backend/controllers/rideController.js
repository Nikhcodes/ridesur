const db = require('../config/db')

exports.bookRide = (req, res) => {
  const { pickup, destination, price } = req.body
  const passenger_id = req.user.id

  db.query(
    'INSERT INTO rides (passenger_id, pickup, destination, price) VALUES (?, ?, ?, ?)',
    [passenger_id, pickup, destination, price],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Error booking ride' })
      res.status(201).json({ message: 'Ride booked successfully', rideId: result.insertId })
    }
  )
}

exports.getPassengerRides = (req, res) => {
  const passenger_id = req.user.id

  db.query(
    'SELECT * FROM rides WHERE passenger_id = ? ORDER BY created_at DESC',
    [passenger_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Error fetching rides' })
      res.json(results)
    }
  )
}