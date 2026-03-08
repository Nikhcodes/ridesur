const db = require('../config/db')

exports.getAllUsers = (req, res) => {
  db.query('SELECT id, name, email, phone, role, created_at FROM users ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' })
    res.json(results)
  })
}

exports.getAllDrivers = (req, res) => {
  db.query(
    `SELECT drivers.*, users.name, users.email 
     FROM drivers 
     JOIN users ON drivers.user_id = users.id 
     ORDER BY drivers.created_at DESC`,
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' })
      res.json(results)
    }
  )
}

exports.getAllRides = (req, res) => {
  db.query('SELECT * FROM rides ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' })
    res.json(results)
  })
}