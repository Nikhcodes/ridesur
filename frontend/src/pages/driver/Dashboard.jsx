import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import LanguageToggle from '../../components/LanguageToggle'
import API from '../../api/axios'

function RatingCard({ driverId }) {
  const [rating, setRating] = useState(null)
  const [reviews, setReviews] = useState([])
  const [showReviews, setShowReviews] = useState(false)

  useEffect(() => {
    if (!driverId) return
    API.get(`/rides/driver-rating/${driverId}`)
      .then(res => setRating(res.data))
      .catch(() => {})

    API.get(`/rides/driver-reviews/${driverId}`)
      .then(res => setReviews(res.data))
      .catch(() => {})
  }, [driverId])

  return (
    <div className="rounded-2xl p-6 mb-4" style={{ backgroundColor: '#1E293B' }}>
      <p className="font-bold mb-3">Your Rating</p>
      {rating ? (
        <>
          <div className="flex items-center gap-4 mb-3">
            <div className="text-4xl font-bold" style={{ color: '#FACC15' }}>
              {isNaN(rating.average) ? '—' : rating.average}
            </div>
            <div>
              <div className="flex gap-1 mb-1">
                {[1,2,3,4,5].map(star => (
                  <span key={star} style={{ color: star <= Math.round(rating.average) ? '#FACC15' : '#1E293B', WebkitTextStroke: '1px #FACC15' }}>
                    ★
                  </span>
                ))}
              </div>
              <button
                onClick={() => setShowReviews(!showReviews)}
                className="text-xs"
                style={{ color: '#FACC15' }}
              >
                {rating.total} review{rating.total !== 1 ? 's' : ''} {showReviews ? '▲' : '▼'}
              </button>
            </div>
          </div>

          {/* Reviews list */}
          {showReviews && (
            <div className="space-y-2 mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {reviews.length === 0 && (
                <p className="text-xs" style={{ color: '#64748B' }}>No written reviews yet</p>
              )}
              {reviews.map(r => (
                <div key={r.id} className="p-3 rounded-xl" style={{ backgroundColor: '#0F172A' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ color: '#FACC15', fontSize: '0.75rem' }}>
                      {'★'.repeat(r.score)}{'☆'.repeat(5 - r.score)}
                    </span>
                    <span className="text-xs" style={{ color: '#64748B' }}>
                      {new Date(r.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  {r.comment && (
                    <p className="text-xs" style={{ color: '#94A3B8' }}>"{r.comment}"</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="text-sm" style={{ color: '#64748B' }}>No ratings yet</p>
      )}
    </div>
  )
}

function DriverDashboard() {
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [available, setAvailable] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    API.get('/drivers/status')
      .then(res => setAvailable(res.data.is_available))
      .catch(() => {})
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const toggleAvailability = async () => {
    setLoading(true)
    try {
      const res = await API.put('/drivers/availability', { is_available: !available })
      setAvailable(res.data.is_available)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen px-4 py-8" style={{ backgroundColor: '#0F172A' }}>
      <div className="max-w-md mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#FACC15' }}>🚕 RideSur</h1>
            <p className="text-sm mt-1" style={{ color: '#64748B' }}>{t('driverPanel')} — {user?.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl text-sm font-semibold"
              style={{ backgroundColor: '#1E293B', color: '#64748B' }}
            >
              {t('logout')}
            </button>
          </div>
        </div>

        {/* Availability toggle */}
        <div className="rounded-2xl p-6 mb-4" style={{ backgroundColor: '#1E293B' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold">{t('availability')}</p>
              <p className="text-sm mt-1" style={{ color: '#64748B' }}>
                {available ? t('visibleToPassengers') : t('hiddenFromPassengers')}
              </p>
            </div>
            <button
              onClick={toggleAvailability}
              disabled={loading}
              className="px-5 py-2 rounded-xl font-bold text-sm"
              style={{
                backgroundColor: available ? 'rgba(22,163,74,0.15)' : 'rgba(100,116,139,0.15)',
                color: available ? '#16A34A' : '#64748B',
                border: `1px solid ${available ? 'rgba(22,163,74,0.3)' : 'rgba(100,116,139,0.2)'}`
              }}
            >
              {available ? `🟢 ${t('online')}` : `⚫ ${t('offline')}`}
            </button>
          </div>
        </div>

        {/* Rating */}
        <RatingCard driverId={user?.id} />

        {/* Quick actions */}
        <div className="rounded-2xl p-6 mb-4" style={{ backgroundColor: '#1E293B' }}>
          <h2 className="font-bold text-lg mb-4">{t('actions')}</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/driver/requests')}
              className="p-4 rounded-xl text-left"
              style={{ backgroundColor: '#0F172A', border: '1px solid rgba(250,204,21,0.15)' }}
            >
              <div className="text-2xl mb-2">📋</div>
              <div className="font-bold text-sm">{t('rideRequests')}</div>
              <div className="text-xs mt-1" style={{ color: '#64748B' }}>{t('viewOpenRides')}</div>
            </button>
            <button
              onClick={() => navigate('/driver/current')}
              className="p-4 rounded-xl text-left"
              style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="text-2xl mb-2">🚕</div>
              <div className="font-bold text-sm">{t('currentRide')}</div>
              <div className="text-xs mt-1" style={{ color: '#64748B' }}>{t('manageActiveRide')}</div>
            </button>
            <button
              onClick={() => navigate('/driver/earnings')}
              className="p-4 rounded-xl text-left"
              style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="text-2xl mb-2">💰</div>
              <div className="font-bold text-sm">{t('earnings')}</div>
              <div className="text-xs mt-1" style={{ color: '#64748B' }}>{t('viewIncome')}</div>
            </button>
            <button
              onClick={() => navigate('/driver/history')}
              className="p-4 rounded-xl text-left"
              style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="text-2xl mb-2">📅</div>
              <div className="font-bold text-sm">{t('rideHistory')}</div>
              <div className="text-xs mt-1" style={{ color: '#64748B' }}>{t('pastRides')}</div>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DriverDashboard