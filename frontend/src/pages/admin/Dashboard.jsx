import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function AdminDashboard() {
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
            <h1 className="text-2xl font-bold" style={{ color: '#FACC15' }}>🛡️ RideSur</h1>
            <p className="text-sm mt-1" style={{ color: '#64748B' }}>Admin panel — {user?.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl text-sm font-semibold"
            style={{ backgroundColor: '#1E293B', color: '#64748B' }}
          >
            Logout
          </button>
        </div>

        {/* Actions */}
        <div className="rounded-2xl p-6" style={{ backgroundColor: '#1E293B' }}>
          <h2 className="font-bold text-lg mb-4">Manage Platform</h2>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/admin/users')}
              className="w-full p-4 rounded-xl text-left flex items-center gap-4"
              style={{ backgroundColor: '#0F172A', border: '1px solid rgba(250,204,21,0.15)' }}
            >
              <div className="text-2xl">👥</div>
              <div>
                <div className="font-bold text-sm">Users</div>
                <div className="text-xs mt-1" style={{ color: '#64748B' }}>View all registered users</div>
              </div>
              <div className="ml-auto" style={{ color: '#64748B' }}>→</div>
            </button>

            <button
              onClick={() => navigate('/admin/drivers')}
              className="w-full p-4 rounded-xl text-left flex items-center gap-4"
              style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="text-2xl">🚕</div>
              <div>
                <div className="font-bold text-sm">Drivers</div>
                <div className="text-xs mt-1" style={{ color: '#64748B' }}>View all registered drivers</div>
              </div>
              <div className="ml-auto" style={{ color: '#64748B' }}>→</div>
            </button>

            <button
              onClick={() => navigate('/admin/rides')}
              className="w-full p-4 rounded-xl text-left flex items-center gap-4"
              style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="text-2xl">📋</div>
              <div>
                <div className="font-bold text-sm">Rides</div>
                <div className="text-xs mt-1" style={{ color: '#64748B' }}>View all rides on the platform</div>
              </div>
              <div className="ml-auto" style={{ color: '#64748B' }}>→</div>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminDashboard