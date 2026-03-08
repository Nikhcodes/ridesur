import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/axios'
import { useAuth } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const {login} = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
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
    const res = await API.post('/auth/login', formData)
    login(res.data.user, res.data.token)

    const role = res.data.user.role
    if (role === 'passenger') navigate('/passenger/dashboard')
    else if (role === 'driver') navigate('/driver/dashboard')
    else if (role === 'admin') navigate('/admin/dashboard')

  } catch (err) {
    setError(err.response?.data?.message || 'Something went wrong')
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{backgroundColor: '#0F172A'}}>
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold" style={{color: '#FACC15'}}>🚕 RideSur</h1>
          <p className="mt-2" style={{color: '#64748B'}}>Welcome back</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8" style={{backgroundColor: '#1E293B'}}>
          <h2 className="text-xl font-bold mb-6">Log in to your account</h2>

          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{backgroundColor: 'rgba(239,68,68,0.1)', color: '#f87171'}}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{color: '#64748B'}}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@email.com"
                className="w-full px-4 py-3 rounded-xl text-white outline-none"
                style={{backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.08)'}}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{color: '#64748B'}}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl text-white outline-none"
                style={{backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.08)'}}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-sm mt-2"
              style={{backgroundColor: '#FACC15', color: '#0F172A'}}
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <p className="text-center mt-6 text-sm" style={{color: '#64748B'}}>
            Don't have an account?{' '}
            <Link to="/register" style={{color: '#FACC15'}}>Register here</Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Login