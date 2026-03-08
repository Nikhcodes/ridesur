import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../api/axios'

function RideRequests() {
  const navigate = useNavigate()
  const [rides, setRides] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get('/drivers/requests')
      .then(res => {
        setRides(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const acceptRide = async (rideId) => {
    try {
      await API.put(`/drivers/accept/${rideId}`)
      navigate('/driver/current')
    } catch (err) {
      console.error(err)
    }
  }

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
          <h1 className="text-xl font-bold">Ride Requests</h1>
        </div>

        {loading && (
          <p style={{ color: '#64748B' }}>Loading...</p>
        )}

        {!loading && rides.length === 0 && (
          <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: '#1E293B' }}>
            <div className="text-4xl mb-4">📋</div>
            <p className="font-bold mb-2">No ride requests</p>
            <p className="text-sm" style={{ color: '#64748B' }}>New requests will appear here</p>
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
                    style={{ backgroundColor: 'rgba(251,146,60,0.1)', color: '#FB923C' }}
                  >
                    requested
                  </span>
                </div>

                <div className="space-y-2 mb-4">
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
                </div>

                <button
                  onClick={() => acceptRide(ride.id)}
                  className="w-full py-3 rounded-xl font-bold text-sm"
                  style={{ backgroundColor: '#16A34A', color: 'white' }}
                >
                  ✅ Accept Ride
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default RideRequests