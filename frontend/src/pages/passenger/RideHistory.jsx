import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../api/axios'

function DriverRideHistory() {
  const navigate = useNavigate()
  const [rides, setRides] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [date, setDate] = useState('')

  const fetchRides = useCallback(() => {
    setLoading(true)
    const params = {}
    if (search) params.search = search
    if (date) params.date = date

    API.get('/drivers/search-rides', { params })
      .then(res => {
        setRides(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [search, date])

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchRides()
    }, 400)
    return () => clearTimeout(timeout)
  }, [fetchRides])

  const statusColor = (status) => {
    if (status === 'requested') return '#FB923C'
    if (status === 'accepted') return '#FACC15'
    if (status === 'in_progress') return '#60A5FA'
    if (status === 'completed') return '#16A34A'
  }

  const clearFilters = () => {
    setSearch('')
    setDate('')
  }

  return (
    <div className="min-h-screen px-4 py-8" style={{ backgroundColor: '#0F172A' }}>
      <div className="max-w-md mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/driver/dashboard')}
            className="p-2 rounded-xl"
            style={{ backgroundColor: '#1E293B' }}
          >
            ←
          </button>
          <h1 className="text-xl font-bold">Ride History</h1>
        </div>

        {/* Search */}
        <div className="mb-3">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search pickup or destination..."
            className="w-full px-4 py-3 rounded-xl text-white outline-none text-sm"
            style={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.08)' }}
          />
        </div>

        {/* Date filter */}
        <div className="mb-4 flex gap-3">
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl text-white outline-none text-sm"
            style={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.08)', colorScheme: 'dark' }}
          />
          {(search || date) && (
            <button
              onClick={clearFilters}
              className="px-4 py-3 rounded-xl text-sm font-bold"
              style={{ backgroundColor: '#1E293B', color: '#FB923C', border: '1px solid rgba(251,146,60,0.2)' }}
            >
              Clear
            </button>
          )}
        </div>

        {!loading && rides.length > 0 && (
          <p className="text-xs mb-4" style={{ color: '#64748B' }}>
            {rides.length} ride{rides.length !== 1 ? 's' : ''} found
          </p>
        )}

        {loading && <p style={{ color: '#64748B' }}>Loading...</p>}

        {!loading && rides.length === 0 && (
          <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: '#1E293B' }}>
            <div className="text-4xl mb-4">📅</div>
            <p className="font-bold mb-2">No rides found</p>
            <p className="text-sm" style={{ color: '#64748B' }}>
              {search || date ? 'Try different search terms' : 'Your completed rides will appear here'}
            </p>
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
                  <div className="font-bold text-sm">Ride #{ride.id}</div>
                  <span
                    className="px-2 py-1 rounded-lg text-xs font-bold"
                    style={{ backgroundColor: `${statusColor(ride.status)}20`, color: statusColor(ride.status) }}
                  >
                    {ride.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#64748B' }}>Passenger</span>
                    <span>{ride.passenger_name || '—'}</span>
                  </div>
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

                {/* Rating received */}
                {ride.rating_score && (
                  <div
                    className="mt-4 p-3 rounded-xl"
                    style={{ backgroundColor: 'rgba(250,204,21,0.06)', border: '1px solid rgba(250,204,21,0.12)' }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span style={{ color: '#FACC15' }}>
                        {'★'.repeat(ride.rating_score)}{'☆'.repeat(5 - ride.rating_score)}
                      </span>
                      <span className="text-xs font-bold" style={{ color: '#FACC15' }}>
                        {ride.rating_score}/5
                      </span>
                    </div>
                    {ride.rating_comment && (
                      <p className="text-xs" style={{ color: '#64748B' }}>"{ride.rating_comment}"</p>
                    )}
                  </div>
                )}

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default DriverRideHistory