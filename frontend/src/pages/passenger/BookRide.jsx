import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../api/axios'

function BookRide() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ pickup: '', destination: '', price: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await API.post('/rides/book', formData)
      navigate('/passenger/status')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
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
          <h1 className="text-xl font-bold">Book a Ride</h1>
        </div>

        <div className="rounded-2xl p-6" style={{ backgroundColor: '#1E293B' }}>

          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#f87171' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#64748B' }}>
                📍 Pickup location
              </label>
              <input
                type="text"
                name="pickup"
                value={formData.pickup}
                onChange={handleChange}
                required
                placeholder="e.g. Paramaribo Centrum"
                className="w-full px-4 py-3 rounded-xl text-white outline-none"
                style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.08)' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#64748B' }}>
                🏁 Destination
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
                placeholder="e.g. Johan Adolf Pengel Airport"
                className="w-full px-4 py-3 rounded-xl text-white outline-none"
                style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.08)' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#64748B' }}>
                💰 Offered price (SRD)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="e.g. 45"
                className="w-full px-4 py-3 rounded-xl text-white outline-none"
                style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.08)' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-sm mt-2"
              style={{ backgroundColor: '#FACC15', color: '#0F172A' }}
            >
              {loading ? 'Booking...' : '🚕 Confirm Booking'}
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default BookRide