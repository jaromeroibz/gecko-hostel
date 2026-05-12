const TOKEN_KEY = 'admin_token'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:5000/api'

type LoginResponse = {
  access_token: string
}

export async function login(username: string, password: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  const body = (await response.json().catch(() => ({}))) as { error?: string } & Partial<LoginResponse>
  if (!response.ok || !body.access_token) {
    throw new Error(body.error ?? 'No se pudo iniciar sesion')
  }

  localStorage.setItem(TOKEN_KEY, body.access_token)
  return body.access_token
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function isAuthenticated() {
  return Boolean(getToken())
}
