import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../api/axios'

function CurrentRide() {
  const navigate = useNavigate()
  const [ride, setRide] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get('/drivers/current-ride')
      .then(res => {
        setRide(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const updateStatus = async (newStatus) => {
    try {
      await API.put(`/drivers/ride-status/${ride.id}`, { status: newStatus })
      setRide({ ...ride, status: newStatus })
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
          <h1 className="text-xl font-bold">Current Ride</h1>
        </div>

        {loading && (
          <p style={{ color: '#64748B' }}>Loading...</p>
        )}

        {!loading && !ride && (
          <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: '#1E293B' }}>
            <div className="text-4xl mb-4">🚕</div>
            <p className="font-bold mb-2">No active ride</p>
            <p className="text-sm mb-6" style={{ color: '#64748B' }}>Accept a ride request first</p>
            <button
              onClick={() => navigate('/driver/requests')}
              className="px-6 py-3 rounded-xl font-bold text-sm"
              style={{ backgroundColor: '#FACC15', color: '#0F172A' }}
            >
              View Requests
            </button>
          </div>
        )}

        {!loading && ride && (
          <div className="space-y-4">

            <div className="rounded-2xl p-6" style={{ backgroundColor: '#1E293B' }}>
              <div className="flex justify-between items-start mb-4">
                <div className="font-bold">Ride #{ride.id}</div>
                <span
                  className="px-2 py-1 rounded-lg text-xs font-bold"
                  style={{
                    backgroundColor: ride.status === 'accepted' ? 'rgba(250,204,21,0.1)' : 'rgba(96,165,250,0.1)',
                    color: ride.status === 'accepted' ? '#FACC15' : '#60A5FA'
                  }}
                >
                  {ride.status}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#64748B' }}>Pickup</span>
                  <span>{ride.pickup}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#64748B' }}>Destination</span>
                  <span>{ride.destination}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#64748B' }}>Price</span>
                  <span className="font-bold" style={{ color: '#FACC15' }}>SRD {ride.price}</span>
                </div>
              </div>

              {/* Action buttons based on status */}
              {ride.status === 'accepted' && (
                <button
                  onClick={() => updateStatus('in_progress')}
                  className="w-full py-3 rounded-xl font-bold text-sm"
                  style={{ backgroundColor: '#60A5FA', color: '#0F172A' }}
                >
                  🚕 Start Ride
                </button>
              )}

              {ride.status === 'in_progress' && (
                <button
                  onClick={() => updateStatus('completed')}
                  className="w-full py-3 rounded-xl font-bold text-sm"
                  style={{ backgroundColor: '#16A34A', color: 'white' }}
                >
                  🏁 Complete Ride
                </button>
              )}

              {ride.status === 'completed' && (
                <div className="text-center py-3">
                  <p className="font-bold" style={{ color: '#16A34A' }}>✅ Ride completed!</p>
                  <button
                    onClick={() => navigate('/driver/requests')}
                    className="mt-4 px-6 py-2 rounded-xl font-bold text-sm"
                    style={{ backgroundColor: '#FACC15', color: '#0F172A' }}
                  >
                    Find next ride
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  )
}

export default CurrentRide