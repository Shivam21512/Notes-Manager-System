import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const { register } = useContext(AuthContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await register({ email, password })
      navigate('/')
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 card-shadow">
        <h2 className="text-2xl font-semibold">Create account</h2>
        <p className="text-sm text-slate-600 mt-2">Start managing your notes securely.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-md border px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-md border px-3 py-2"
            />
          </div>

          <div className="flex flex-col items-center mt-4">
            <button
              disabled={loading}
              className="w-full px-4 py-2 bg-primary-600 text-white rounded-md"
            >
              {loading ? 'Creating...' : 'Create account'}
            </button>
            <p className="mt-3 text-sm text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 font-medium">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
