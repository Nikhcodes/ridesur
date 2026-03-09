import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../../api/axios'

function RateRide() {
  const navigate = useNavigate()
  const { ride_id, driver_id } = useParams()
  const [score, setScore] = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (score === 0) return setError('Please select a star rating')
    setLoading(true)
    setError('')

    try {
      await API.post('/rides/rate', {
        ride_id: parseInt(ride_id),
        driver_id: parseInt(driver_id),
        score,
        comment
      })
      navigate('/passenger/history')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen px-4 py-8" style={{ backgroundColor: '#0F172A' }}>
      <div className="max-w-md mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/passenger/history')}
            className="p-2 rounded-xl"
            style={{ backgroundColor: '#1E293B' }}
          >
            ←
          </button>
          <h1 className="text-xl font-bold">Rate your ride</h1>
        </div>

        <div className="rounded-2xl p-6" style={{ backgroundColor: '#1E293B' }}>

          {/* Stars */}
          <p className="text-sm font-bold mb-4" style={{ color: '#64748B' }}>
            How was your experience?
          </p>

          <div className="flex justify-center gap-3 mb-6">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onClick={() => setScore(star)}
                className="text-4xl transition-transform"
                style={{ transform: score >= star ? 'scale(1.2)' : 'scale(1)' }}
              >
                {score >= star ? '⭐' : '☆'}
              </button>
            ))}
          </div>

          {/* Score label */}
          {score > 0 && (
            <p className="text-center text-sm font-bold mb-6" style={{ color: '#FACC15' }}>
              {score === 1 && 'Poor'}
              {score === 2 && 'Fair'}
              {score === 3 && 'Good'}
              {score === 4 && 'Great'}
              {score === 5 && 'Excellent!'}
            </p>
          )}

          {/* Comment */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" style={{ color: '#64748B' }}>
              Leave a comment (optional)
            </label>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="How was your driver?"
              rows={3}
              className="w-full px-4 py-3 rounded-xl text-white outline-none text-sm resize-none"
              style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.08)' }}
            />
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#f87171' }}>
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-sm"
            style={{ backgroundColor: '#FACC15', color: '#0F172A' }}
          >
            {loading ? 'Submitting...' : 'Submit rating'}
          </button>

        </div>
      </div>
    </div>
  )
}

export default RateRide