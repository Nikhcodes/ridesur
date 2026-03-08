import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../api/axios'
import { useAuth } from '../../context/AuthContext'

function Profile() {
  const navigate = useNavigate()
  const { user, login } = useAuth()
  const [formData, setFormData] = useState({ name: user?.name || '', phone: user?.phone || '' })
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const res = await API.put('/auth/profile', formData)
      login(res.data.user, localStorage.getItem('token'))
      setSuccess('Profile updated successfully!')
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
          <h1 className="text-xl font-bold">My Profile</h1>
        </div>

        <div className="rounded-2xl p-6" style={{ backgroundColor: '#1E293B' }}>

          {/* Avatar */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-3"
              style={{ backgroundColor: 'rgba(250,204,21,0.1)' }}>
              👤
            </div>
            <p className="font-bold">{user?.name}</p>
            <p className="text-sm" style={{ color: '#64748B' }}>{user?.email}</p>
          </div>

          {success && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(22,163,74,0.1)', color: '#4ade80' }}>
              {success}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#f87171' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#64748B' }}>Full name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl text-white outline-none"
                style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.08)' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#64748B' }}>Phone number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl text-white outline-none"
                style={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.08)' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-sm"
              style={{ backgroundColor: '#FACC15', color: '#0F172A' }}
            >
              {loading ? 'Saving...' : 'Save changes'}
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Profile