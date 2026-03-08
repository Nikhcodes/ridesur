import { useState, useEffect } from 'react'
import API from '../api/axios'

function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    API.get('/auth/notifications')
      .then(res => setNotifications(res.data))
      .catch(() => {})
  }, [])

  const unread = notifications.filter(n => !n.is_read).length

  const handleOpen = async () => {
    setOpen(!open)
    if (!open && unread > 0) {
      await API.put('/auth/notifications/read')
      setNotifications(notifications.map(n => ({ ...n, is_read: true })))
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={handleOpen}
        className="p-2 rounded-xl relative"
        style={{ backgroundColor: '#1E293B' }}
      >
        🔔
        {unread > 0 && (
          <span
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
            style={{ backgroundColor: '#FB923C', color: 'white' }}
          >
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-72 rounded-2xl shadow-xl z-50"
          style={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="p-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <p className="font-bold text-sm">Notifications</p>
          </div>

          {notifications.length === 0 && (
            <div className="p-4 text-center">
              <p className="text-sm" style={{ color: '#64748B' }}>No notifications yet</p>
            </div>
          )}

          <div className="max-h-64 overflow-y-auto">
            {notifications.map(n => (
              <div
                key={n.id}
                className="p-4 border-b"
                style={{
                  borderColor: 'rgba(255,255,255,0.04)',
                  backgroundColor: n.is_read ? 'transparent' : 'rgba(250,204,21,0.04)'
                }}
              >
                <p className="text-sm">{n.message}</p>
                <p className="text-xs mt-1" style={{ color: '#64748B' }}>
                  {new Date(n.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Notifications