import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../api/axios'

function Earnings() {
  const navigate = useNavigate()
  const [rides, setRides] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get('/drivers/my-rides')
      .then(res => {
        setRides(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const completedRides = rides.filter(r => r.status === 'completed')
  const totalEarnings = completedRides.reduce((sum, r) => sum + parseFloat(r.price || 0), 0)

  return (
    <div className="min-h-screen px-4 py-8" style={{ backgroundColor: '#0F172A' }}>
      <div className="max-w-md mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/driver/dashboard')}
            className="p-2 rounded-xl"
            style={{ backgroundColor: '#1E293B' }}
          >
            ←
          </button>
          <h1 className="text-xl font-bold">Earnings</h1>
        </div>

        {/* Total earnings card */}
        <div className="rounded-2xl p-6 mb-4 text-center" style={{ backgroundColor: '#1E293B', border: '1px solid rgba(250,204,21,0.15)' }}>
          <p className="text-sm mb-2" style={{ color: '#64748B' }}>Total Earnings</p>
          <p className="text-4xl font-bold" style={{ color: '#FACC15' }}>SRD {totalEarnings.toFixed(2)}</p>
          <p className="text-sm mt-2" style={{ color: '#64748B' }}>{completedRides.length} completed rides</p>
        </div>

        {loading && <p style={{ color: '#64748B' }}>Loading...</p>}

        {!loading && completedRides.length === 0 && (
          <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: '#1E293B' }}>
            <div className="text-4xl mb-4">💰</div>
            <p className="font-bold mb-2">No earnings yet</p>
            <p className="text-sm" style={{ color: '#64748B' }}>Complete rides to see your earnings here</p>
          </div>
        )}

        {!loading && completedRides.length > 0 && (
          <div className="space-y-3">
            <p className="font-bold text-sm mb-2" style={{ color: '#64748B' }}>COMPLETED RIDES</p>
            {completedRides.map(ride => (
              <div
                key={ride.id}
                className="rounded-2xl p-5 flex justify-between items-center"
                style={{ backgroundColor: '#1E293B' }}
              >
                <div>
                  <p className="font-bold text-sm">Ride #{ride.id}</p>
                  <p className="text-xs mt-1" style={{ color: '#64748B' }}>{ride.pickup} → {ride.destination}</p>
                  <p className="text-xs mt-1" style={{ color: '#64748B' }}>{new Date(ride.created_at).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold" style={{ color: '#FACC15' }}>SRD {ride.price}</p>
                  <span className="text-xs px-2 py-1 rounded-lg" style={{ backgroundColor: 'rgba(22,163,74,0.1)', color: '#16A34A' }}>
                    completed
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Earnings