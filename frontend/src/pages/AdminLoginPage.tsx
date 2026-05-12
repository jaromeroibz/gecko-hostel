import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { login } from '../services/auth'

type LocationState = {
  from?: string
}

export function AdminLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const from = ((location.state as LocationState | null)?.from ?? '/admin') as string

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (!username.trim() || !password) {
      setError('Usuario y contrasena son requeridos')
      return
    }

    setIsLoading(true)
    try {
      await login(username.trim(), password)
      navigate(from, { replace: true })
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Credenciales invalidas')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">Admin login</h1>
      <p className="mt-1 text-sm text-slate-600">Inicia sesion para acceder al panel administrativo.</p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          autoComplete="username"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-teal-500 focus:ring-2"
        />
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          type="password"
          autoComplete="current-password"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-teal-500 focus:ring-2"
        />

        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:opacity-60"
        >
          {isLoading ? 'Ingresando...' : 'Login'}
        </button>
      </form>
    </section>
  )
}
