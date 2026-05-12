import { getToken } from './auth'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:5000/api'

export type AdminExtra = {
  id: number
  name: string
  description: string | null
  price: number
  image_url: string | null
}

export type AdminPackage = {
  id: number
  name: string
  description: string
  price: number
  duration_days: number
  includes: string
  image_url: string | null
}

export type AdminImage = {
  id: number
  name: string
  category: string
  size: number
  original_url: string
  optimized_url: string
  uploaded_at: string | null
}

export type ExtraPayload = {
  name: string
  description: string
  price: number
  image_url: string
}

export type PackagePayload = {
  name: string
  description: string
  price: number
  duration_days: number
  includes: string
  image_url: string
}

export type ImagePayload = {
  name: string
  category: string
  size: number
  original_url: string
  optimized_url: string
}

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function apiRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getToken()
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers ?? {}),
    },
    ...options,
  })

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { error?: string }
    throw new ApiError(body.error ?? `Request failed: ${response.status}`, response.status)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

export function getExtras() {
  return apiRequest<AdminExtra[]>('/extras')
}

export function createExtra(payload: ExtraPayload) {
  return apiRequest<AdminExtra>('/extras', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateExtra(id: number, payload: Partial<ExtraPayload>) {
  return apiRequest<AdminExtra>(`/extras/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export function deleteExtra(id: number) {
  return apiRequest<{ message: string }>(`/extras/${id}`, {
    method: 'DELETE',
  })
}

export function getPackages() {
  return apiRequest<AdminPackage[]>('/packages')
}

export function createPackage(payload: PackagePayload) {
  return apiRequest<AdminPackage>('/packages', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updatePackage(id: number, payload: Partial<PackagePayload>) {
  return apiRequest<AdminPackage>(`/packages/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export function deletePackage(id: number) {
  return apiRequest<{ message: string }>(`/packages/${id}`, {
    method: 'DELETE',
  })
}

export function getImages(filters?: { search?: string; category?: string }) {
  const params = new URLSearchParams()
  const search = filters?.search?.trim()
  const category = filters?.category?.trim()
  if (search) params.set('search', search)
  if (category) params.set('category', category)
  const suffix = params.toString() ? `?${params.toString()}` : ''
  return apiRequest<AdminImage[]>(`/images${suffix}`)
}

export function createImage(payload: ImagePayload) {
  return apiRequest<AdminImage>('/images', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateImage(id: number, payload: Partial<ImagePayload>) {
  return apiRequest<AdminImage>(`/images/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export function deleteImage(id: number) {
  return apiRequest<{ message: string }>(`/images/${id}`, {
    method: 'DELETE',
  })
}
