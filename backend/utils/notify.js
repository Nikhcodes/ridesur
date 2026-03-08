const db = require('../config/db')

const notify = (user_id, message) => {
  db.query(
    'INSERT INTO notifications (user_id, message) VALUES (?, ?)',
    [user_id, message],
    (err) => {
      if (err) console.error('Notification error:', err)
    }
  )
}

module.exports = notify