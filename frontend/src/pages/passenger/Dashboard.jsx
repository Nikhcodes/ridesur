import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Notifications from '../../components/Notifications'

function PassengerDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen px-4 py-8" style={{ backgroundColor: '#0F172A' }}>
      <div className="max-w-md mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
  <div>
    <h1 className="text-2xl font-bold" style={{ color: '#FACC15' }}>🚕 RideSur</h1>
    <p className="text-sm mt-1" style={{ color: '#64748B' }}>Welcome back, {user?.name}</p>
  </div>
  <div className="flex items-center gap-3">
    <Notifications />
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-xl text-sm font-semibold"
      style={{ backgroundColor: '#1E293B', color: '#64748B' }}
    >
      Logout
    </button>
  </div>
</div>

        {/* Quick actions */}
        <div className="rounded-2xl p-6 mb-4" style={{ backgroundColor: '#1E293B' }}>
          <h2 className="font-bold text-lg mb-4">What do you need?</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/passenger/book')}
              className="p-4 rounded-xl text-left"
              style={{ backgroundColor: '#0F172A', border: '1px solid rgba(250,204,21,0.15)' }}
            >
              <div className="text-2xl mb-2">🚕</div>
              <div className="font-bold text-sm">Book a Ride</div>
              <div className="text-xs mt-1" style={{ color: '#64748B' }}>Request a taxi now</div>
            </button>
            <button
              onClick={() => navigate('/passenger/history')}
              className="p-4 rounded-xl text-left"
              style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="text-2xl mb-2">📋</div>
              <div className="font-bold text-sm">Ride History</div>
              <div className="text-xs mt-1" style={{ color: '#64748B' }}>View past rides</div>
            </button>
            <button
              onClick={() => navigate('/passenger/profile')}
              className="p-4 rounded-xl text-left"
              style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="text-2xl mb-2">👤</div>
              <div className="font-bold text-sm">Profile</div>
              <div className="text-xs mt-1" style={{ color: '#64748B' }}>Manage your info</div>
            </button>
            <button
              onClick={() => navigate('/passenger/status')}
              className="p-4 rounded-xl text-left"
              style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="text-2xl mb-2">📍</div>
              <div className="font-bold text-sm">Ride Status</div>
              <div className="text-xs mt-1" style={{ color: '#64748B' }}>Track your ride</div>
            </button>
          </div>
        </div>

        {/* User info card */}
        <div className="rounded-2xl p-6" style={{ backgroundColor: '#1E293B' }}>
          <h2 className="font-bold mb-4">Your Account</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span style={{ color: '#64748B' }}>Name</span>
              <span>{user?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: '#64748B' }}>Email</span>
              <span>{user?.email}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: '#64748B' }}>Role</span>
              <span className="px-2 py-1 rounded-lg text-xs font-bold" style={{ backgroundColor: 'rgba(250,204,21,0.1)', color: '#FACC15' }}>
                Passenger
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PassengerDashboard