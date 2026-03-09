import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import LanguageToggle from '../../components/LanguageToggle'

function AdminDashboard() {
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen px-4 py-8" style={{ backgroundColor: '#0F172A' }}>
      <div className="max-w-md mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#FACC15' }}>🛡️ RideSur</h1>
            <p className="text-sm mt-1" style={{ color: '#64748B' }}>{t('adminPanel')} — {user?.name}</p>
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

        {/* Actions */}
        <div className="rounded-2xl p-6" style={{ backgroundColor: '#1E293B' }}>
          <h2 className="font-bold text-lg mb-4">{t('managePlatform')}</h2>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/admin/users')}
              className="w-full p-4 rounded-xl text-left flex items-center gap-4"
              style={{ backgroundColor: '#0F172A', border: '1px solid rgba(250,204,21,0.15)' }}
            >
              <div className="text-2xl">👥</div>
              <div>
                <div className="font-bold text-sm">{t('users')}</div>
                <div className="text-xs mt-1" style={{ color: '#64748B' }}>{t('viewAllUsers')}</div>
              </div>
              <div className="ml-auto" style={{ color: '#64748B' }}>→</div>
            </button>
            <button
              onClick={() => navigate('/admin/drivers')}
              className="w-full p-4 rounded-xl text-left flex items-center gap-4"
              style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="text-2xl">🚕</div>
              <div>
                <div className="font-bold text-sm">{t('drivers')}</div>
                <div className="text-xs mt-1" style={{ color: '#64748B' }}>{t('viewAllDrivers')}</div>
              </div>
              <div className="ml-auto" style={{ color: '#64748B' }}>→</div>
            </button>
            <button
              onClick={() => navigate('/admin/rides')}
              className="w-full p-4 rounded-xl text-left flex items-center gap-4"
              style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="text-2xl">📋</div>
              <div>
                <div className="font-bold text-sm">{t('rides')}</div>
                <div className="text-xs mt-1" style={{ color: '#64748B' }}>{t('viewAllRides')}</div>
              </div>
              <div className="ml-auto" style={{ color: '#64748B' }}>→</div>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminDashboard