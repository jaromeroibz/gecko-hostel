const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:5000/api'

export type Extra = {
  id: number
  name: string
  description: string | null
  price: number
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`)
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }
  return response.json() as Promise<T>
}

export async function getExtras(): Promise<Extra[]> {
  return apiGet<Extra[]>('/extras')
}
