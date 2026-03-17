const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// REGISTER
exports.register = (req, res) => {
  const { name, email, password, phone, role } = req.body;

  // check if email already exists
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length > 0) return res.status(400).json({ message: 'Email already in use' });

    // hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: 'Error hashing password' });

      // save user to database
      db.query(
        'INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
        [name, email, hashedPassword, phone, role || 'passenger'],
        (err, result) => {
          if (err) return res.status(500).json({ message: 'Error saving user' });

          // only runs if registering as driver
          if (role === 'driver') {
            db.query(
              'INSERT INTO drivers (user_id, license_number, vehicle, is_available) VALUES (?, ?, ?, ?)',
              [result.insertId, 'N/A', 'N/A', false],
              (err) => {
                if (err) console.error('Error creating driver profile:', err)
              }
            )
          }

          res.status(201).json({ message: 'User registered successfully' });
        }
      );
    });
  });
};

// LOGIN
exports.login = (req, res) => {
  const { email, password } = req.body;

  // find user by email
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(400).json({ message: 'User not found' });

    const user = results[0];

    // check password
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return res.status(500).json({ message: 'Error checking password' });
      if (!match) return res.status(400).json({ message: 'Wrong password' });

      // create JWT token
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    });
  });
};

exports.updateProfile = (req, res) => {
  const { name, phone } = req.body
  const id = req.user.id

  db.query(
    'UPDATE users SET name = ?, phone = ? WHERE id = ?',
    [name, phone, id],
    (err) => {
      if (err) return res.status(500).json({ message: 'Error updating profile' })

      db.query('SELECT id, name, email, phone, role FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching updated user' })
        res.json({ user: results[0] })
      })
    }
  )
}

exports.getNotifications = (req, res) => {
  const user_id = req.user.id

  db.query(
    'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC',
    [user_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' })
      res.json(results)
    }
  )
}

exports.markAsRead = (req, res) => {
  const user_id = req.user.id

  db.query(
    'UPDATE notifications SET is_read = TRUE WHERE user_id = ?',
    [user_id],
    (err) => {
      if (err) return res.status(500).json({ message: 'Database error' })
      res.json({ message: 'Notifications marked as read' })
    }
  )
}