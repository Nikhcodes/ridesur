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

exports.searchRides = (req, res) => {
  const passenger_id = req.user.id
  const { search, date } = req.query

  let query = 'SELECT * FROM rides WHERE passenger_id = ?'
  let params = [passenger_id]

  if (search) {
    query += ' AND (pickup LIKE ? OR destination LIKE ?)'
    params.push(`%${search}%`, `%${search}%`)
  }

  if (date) {
    query += ' AND DATE(created_at) = ?'
    params.push(date)
  }

  query += ' ORDER BY created_at DESC'

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error searching rides' })
    res.json(results)
  })
}

exports.submitRating = (req, res) => {
  const { ride_id, driver_id, score, comment } = req.body
  const passenger_id = req.user.id

  // check if rating already exists for this ride
  db.query('SELECT * FROM ratings WHERE ride_id = ?', [ride_id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' })
    if (results.length > 0) return res.status(400).json({ message: 'Ride already rated' })

    db.query(
      'INSERT INTO ratings (ride_id, driver_id, passenger_id, score, comment) VALUES (?, ?, ?, ?, ?)',
      [ride_id, driver_id, passenger_id, score, comment],
      (err) => {
        if (err) return res.status(500).json({ message: 'Error saving rating' })
        res.status(201).json({ message: 'Rating submitted successfully' })
      }
    )
  })
}

exports.getDriverRating = (req, res) => {
  const { driver_id } = req.params

  db.query(
    'SELECT AVG(score) as average, COUNT(*) as total FROM ratings WHERE driver_id = ?',
    [driver_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Error fetching rating' })
      res.json({
        average: parseFloat(results[0].average).toFixed(1) || 0,
        total: results[0].total
      })
    }
  )
}

exports.getDriverReviews = (req, res) => {
  const { driver_id } = req.params

  db.query(
    `SELECT ratings.*, users.name AS passenger_name 
     FROM ratings 
     LEFT JOIN users ON ratings.passenger_id = users.id
     WHERE ratings.driver_id = ? 
     ORDER BY ratings.created_at DESC`,
    [driver_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' })
      res.json(results)
    }
  )
}