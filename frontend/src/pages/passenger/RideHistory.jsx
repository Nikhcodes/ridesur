import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../api/axios'

function RideHistory() {
  const navigate = useNavigate()
  const [rides, setRides] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get('/rides/my-rides')
      .then(res => {
        setRides(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const statusColor = (status) => {
    if (status === 'requested') return '#FB923C'
    if (status === 'accepted') return '#FACC15'
    if (status === 'in_progress') return '#60A5FA'
    if (status === 'completed') return '#16A34A'
  }

  return (
    <div className="min-h-screen px-4 py-8" style={{ backgroundColor: '#0F172A' }}>
      <div className="max-w-md mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/passenger/dashboard')}
            className="p-2 rounded-xl"
            style={{ backgroundColor: '#1E293B' }}
          >
            ←
          </button>
          <h1 className="text-xl font-bold">Ride History</h1>
        </div>

        {loading && (
          <p style={{ color: '#64748B' }}>Loading...</p>
        )}

        {!loading && rides.length === 0 && (
          <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: '#1E293B' }}>
            <div className="text-4xl mb-4">📋</div>
            <p className="font-bold mb-2">No rides yet</p>
            <p className="text-sm mb-6" style={{ color: '#64748B' }}>Your ride history will appear here</p>
            <button
              onClick={() => navigate('/passenger/book')}
              className="px-6 py-3 rounded-xl font-bold text-sm"
              style={{ backgroundColor: '#FACC15', color: '#0F172A' }}
            >
              Book your first ride
            </button>
          </div>
        )}

        {!loading && rides.length > 0 && (
          <div className="space-y-3">
            {rides.map(ride => (
              <div
                key={ride.id}
                className="rounded-2xl p-5"
                style={{ backgroundColor: '#1E293B' }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="text-sm font-bold">Ride #{ride.id}</div>
                  <span
                    className="px-2 py-1 rounded-lg text-xs font-bold"
                    style={{ backgroundColor: `${statusColor(ride.status)}20`, color: statusColor(ride.status) }}
                  >
                    {ride.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#64748B' }}>From</span>
                    <span>{ride.pickup}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#64748B' }}>To</span>
                    <span>{ride.destination}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#64748B' }}>Price</span>
                    <span className="font-bold" style={{ color: '#FACC15' }}>SRD {ride.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#64748B' }}>Date</span>
                    <span>{new Date(ride.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default RideHistory