import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { login } = useContext(AuthContext)
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
      await login({ email, password })
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
        <h2 className="text-2xl font-semibold">Welcome back</h2>
        <p className="text-sm text-slate-600 mt-2">Log in to access your notes.</p>

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

          <div className="flex flex-col gap-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary-600 text-white rounded-md"
            >
              {loading ? 'Logging...' : 'Login'}
            </button>

            <div className="flex flex-col items-center gap-2 mt-2">
              <span className="text-sm text-slate-600">Don't have an account?</span>
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="px-4 py-2 bg-primary-100 text-primary-700 rounded-md hover:bg-primary-200"
              >
                Create account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
