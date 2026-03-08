import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../api/axios'

function RideStatus() {
  const navigate = useNavigate()
  const [ride, setRide] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get('/rides/my-rides')
      .then(res => {
        const rides = res.data
        if (rides.length > 0) {
          setRide(rides[0]) // most recent ride
        }
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

  const statusLabel = (status) => {
    if (status === 'requested') return '⏳ Waiting for driver...'
    if (status === 'accepted') return '✅ Driver accepted!'
    if (status === 'in_progress') return '🚕 Ride in progress'
    if (status === 'completed') return '🏁 Ride completed'
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
          <h1 className="text-xl font-bold">Ride Status</h1>
        </div>

        {loading && (
          <p style={{ color: '#64748B' }}>Loading...</p>
        )}

        {!loading && !ride && (
          <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: '#1E293B' }}>
            <div className="text-4xl mb-4">🚕</div>
            <p className="font-bold mb-2">No active ride</p>
            <p className="text-sm mb-6" style={{ color: '#64748B' }}>You have no rides yet</p>
            <button
              onClick={() => navigate('/passenger/book')}
              className="px-6 py-3 rounded-xl font-bold text-sm"
              style={{ backgroundColor: '#FACC15', color: '#0F172A' }}
            >
              Book a Ride
            </button>
          </div>
        )}

        {!loading && ride && (
          <div className="space-y-4">

            {/* Status card */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: '#1E293B' }}>
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">🚕</div>
                <div className="text-lg font-bold" style={{ color: statusColor(ride.status) }}>
                  {statusLabel(ride.status)}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#64748B' }}>Pickup</span>
                  <span className="font-medium">{ride.pickup}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#64748B' }}>Destination</span>
                  <span className="font-medium">{ride.destination}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#64748B' }}>Price</span>
                  <span className="font-bold" style={{ color: '#FACC15' }}>SRD {ride.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#64748B' }}>Status</span>
                  <span className="px-2 py-1 rounded-lg text-xs font-bold" style={{ backgroundColor: `${statusColor(ride.status)}20`, color: statusColor(ride.status) }}>
                    {ride.status}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/passenger/book')}
              className="w-full py-3 rounded-xl font-bold text-sm"
              style={{ backgroundColor: '#1E293B', color: '#FACC15' }}
            >
              + Book another ride
            </button>

          </div>
        )}

      </div>
    </div>
  )
}

export default RideStatus