import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../api/axios'

function AdminDrivers() {
  const navigate = useNavigate()
  const [drivers, setDrivers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get('/admin/drivers')
      .then(res => {
        setDrivers(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen px-4 py-8" style={{ backgroundColor: '#0F172A' }}>
      <div className="max-w-md mx-auto">

        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="p-2 rounded-xl"
            style={{ backgroundColor: '#1E293B' }}
          >
            ←
          </button>
          <h1 className="text-xl font-bold">All Drivers</h1>
        </div>

        {loading && <p style={{ color: '#64748B' }}>Loading...</p>}

        {!loading && drivers.length === 0 && (
          <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: '#1E293B' }}>
            <p className="font-bold">No drivers found</p>
          </div>
        )}

        {!loading && drivers.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm mb-2" style={{ color: '#64748B' }}>{drivers.length} drivers registered</p>
            {drivers.map(driver => (
              <div
                key={driver.id}
                className="rounded-2xl p-5"
                style={{ backgroundColor: '#1E293B' }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold">{driver.name}</p>
                    <p className="text-sm mt-1" style={{ color: '#64748B' }}>{driver.email}</p>
                    <p className="text-sm mt-1" style={{ color: '#64748B' }}>🚗 {driver.vehicle || 'No vehicle'}</p>
                    <p className="text-sm mt-1" style={{ color: '#64748B' }}>🪪 {driver.license_number || 'No license'}</p>
                  </div>
                  <span
                    className="px-2 py-1 rounded-lg text-xs font-bold"
                    style={{
                      backgroundColor: driver.is_available ? 'rgba(22,163,74,0.1)' : 'rgba(100,116,139,0.1)',
                      color: driver.is_available ? '#16A34A' : '#64748B'
                    }}
                  >
                    {driver.is_available ? 'Online' : 'Offline'}
                  </span>
                </div>
                <p className="text-xs mt-3" style={{ color: '#64748B' }}>
                  Joined {new Date(driver.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default AdminDrivers