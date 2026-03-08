import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import API from '../../api/axios'

function DriverDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [available, setAvailable] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    API.get('/drivers/status')
      .then(res => setAvailable(res.data.is_available))
      .catch(() => {})
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const toggleAvailability = async () => {
    setLoading(true)
    try {
      const res = await API.put('/drivers/availability', { is_available: !available })
      setAvailable(res.data.is_available)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen px-4 py-8" style={{ backgroundColor: '#0F172A' }}>
      <div className="max-w-md mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#FACC15' }}>🚕 RideSur</h1>
            <p className="text-sm mt-1" style={{ color: '#64748B' }}>Driver panel — {user?.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl text-sm font-semibold"
            style={{ backgroundColor: '#1E293B', color: '#64748B' }}
          >
            Logout
          </button>
        </div>

        {/* Availability toggle */}
        <div className="rounded-2xl p-6 mb-4" style={{ backgroundColor: '#1E293B' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold">Availability</p>
              <p className="text-sm mt-1" style={{ color: '#64748B' }}>
                {available ? 'You are visible to passengers' : 'You are hidden from passengers'}
              </p>
            </div>
            <button
              onClick={toggleAvailability}
              disabled={loading}
              className="px-5 py-2 rounded-xl font-bold text-sm"
              style={{
                backgroundColor: available ? 'rgba(22,163,74,0.15)' : 'rgba(100,116,139,0.15)',
                color: available ? '#16A34A' : '#64748B',
                border: `1px solid ${available ? 'rgba(22,163,74,0.3)' : 'rgba(100,116,139,0.2)'}`
              }}
            >
              {available ? '🟢 Online' : '⚫ Offline'}
            </button>
          </div>
        </div>

        {/* Quick actions */}
        <div className="rounded-2xl p-6 mb-4" style={{ backgroundColor: '#1E293B' }}>
          <h2 className="font-bold text-lg mb-4">Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/driver/requests')}
              className="p-4 rounded-xl text-left"
              style={{ backgroundColor: '#0F172A', border: '1px solid rgba(250,204,21,0.15)' }}
            >
              <div className="text-2xl mb-2">📋</div>
              <div className="font-bold text-sm">Ride Requests</div>
              <div className="text-xs mt-1" style={{ color: '#64748B' }}>View open rides</div>
            </button>
            <button
              onClick={() => navigate('/driver/current')}
              className="p-4 rounded-xl text-left"
              style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="text-2xl mb-2">🚕</div>
              <div className="font-bold text-sm">Current Ride</div>
              <div className="text-xs mt-1" style={{ color: '#64748B' }}>Manage active ride</div>
            </button>
            <button
              onClick={() => navigate('/driver/earnings')}
              className="p-4 rounded-xl text-left"
              style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="text-2xl mb-2">💰</div>
              <div className="font-bold text-sm">Earnings</div>
              <div className="text-xs mt-1" style={{ color: '#64748B' }}>View your income</div>
            </button>
            <button
              onClick={() => navigate('/driver/history')}
              className="p-4 rounded-xl text-left"
              style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="text-2xl mb-2">📅</div>
              <div className="font-bold text-sm">Ride History</div>
              <div className="text-xs mt-1" style={{ color: '#64748B' }}>Past completed rides</div>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DriverDashboard