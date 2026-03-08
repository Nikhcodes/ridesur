import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../api/axios'

function AdminUsers() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get('/admin/users')
      .then(res => {
        setUsers(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const roleColor = (role) => {
    if (role === 'admin') return '#FB923C'
    if (role === 'driver') return '#16A34A'
    return '#FACC15'
  }

  return (
    <div className="min-h-screen px-4 py-8" style={{ backgroundColor: '#0F172A' }}>
      <div className="max-w-md mx-auto">

        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="p-2 rounded-xl"
            style={{ backgroundColor: '#1E293B' }}
          >
            ←
          </button>
          <h1 className="text-xl font-bold">All Users</h1>
        </div>

        {loading && <p style={{ color: '#64748B' }}>Loading...</p>}

        {!loading && users.length === 0 && (
          <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: '#1E293B' }}>
            <p className="font-bold">No users found</p>
          </div>
        )}

        {!loading && users.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm mb-2" style={{ color: '#64748B' }}>{users.length} users registered</p>
            {users.map(user => (
              <div
                key={user.id}
                className="rounded-2xl p-5"
                style={{ backgroundColor: '#1E293B' }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold">{user.name}</p>
                    <p className="text-sm mt-1" style={{ color: '#64748B' }}>{user.email}</p>
                    <p className="text-sm mt-1" style={{ color: '#64748B' }}>{user.phone || 'No phone'}</p>
                  </div>
                  <span
                    className="px-2 py-1 rounded-lg text-xs font-bold"
                    style={{ backgroundColor: `${roleColor(user.role)}20`, color: roleColor(user.role) }}
                  >
                    {user.role}
                  </span>
                </div>
                <p className="text-xs mt-3" style={{ color: '#64748B' }}>
                  Joined {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default AdminUsers