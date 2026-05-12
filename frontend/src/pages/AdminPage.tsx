import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { AdminLayout } from '../components/admin/AdminLayout'
import { ExtrasPage } from '../components/admin/ExtrasPage'
import { ImagesPage, type ImageRecord } from '../components/admin/ImagesPage'
import { PackagesPage } from '../components/admin/PackagesPage'
import { RoomsPage, type RoomRecord } from '../components/admin/RoomsPage'
import { type AdminSectionKey } from '../components/admin/Sidebar'
import {
  ApiError,
  createImage,
  deleteImage,
  deleteExtra,
  deletePackage,
  getExtras,
  getImages,
  getPackages,
  updateImage,
  updateExtra,
  updatePackage,
  type AdminImage,
  type AdminExtra,
  type AdminPackage,
} from '../services/adminApi'
import { logout } from '../services/auth'

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? ''
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ?? ''

const SECTION_KEYS: AdminSectionKey[] = ['images', 'extras', 'packages', 'rooms', 'settings']

function parseSection(tab: string | null): AdminSectionKey {
  if (tab && SECTION_KEYS.includes(tab as AdminSectionKey)) return tab as AdminSectionKey
  return 'images'
}

export function AdminPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const activeSection = useMemo(
    () => parseSection(searchParams.get('tab')),
    [searchParams],
  )

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (!tab || !SECTION_KEYS.includes(tab as AdminSectionKey)) {
      setSearchParams({ tab: 'images' }, { replace: true })
    }
  }, [searchParams, setSearchParams])

  const [extras, setExtras] = useState<AdminExtra[]>([])
  const [isLoadingExtras, setIsLoadingExtras] = useState(false)
  const [extrasError, setExtrasError] = useState<string | null>(null)

  const [packages, setPackages] = useState<AdminPackage[]>([])
  const [isLoadingPackages, setIsLoadingPackages] = useState(false)
  const [packagesError, setPackagesError] = useState<string | null>(null)

  const [images, setImages] = useState<ImageRecord[]>([])
  const [isLoadingImages, setIsLoadingImages] = useState(false)
  const [imagesError, setImagesError] = useState<string | null>(null)
  const [imageSearch, setImageSearch] = useState('')
  const [imageCategory, setImageCategory] = useState('all')
  const [rooms, setRooms] = useState<RoomRecord[]>([
    { id: 'room-1', name: '6 Gecko', capacity: 6, type: 'Dorm', basePrice: 45 },
    { id: 'room-2', name: 'Doble - La Lora', capacity: 2, type: 'Private', basePrice: 95 },
    { id: 'room-3', name: 'Paraiso', capacity: 4, type: 'Family', basePrice: 120 },
    { id: 'room-4', name: 'Rocamar', capacity: 2, type: 'Private', basePrice: 110 },
  ])

  const handleUnauthorized = (error: unknown): boolean => {
    if (error instanceof ApiError && error.status === 401) {
      logout()
      navigate('/admin/login', { replace: true, state: { from: '/admin' } })
      return true
    }
    return false
  }

  useEffect(() => {
    const loadImages = async () => {
      setIsLoadingImages(true)
      setImagesError(null)
      try {
        const data = await getImages({
          search: imageSearch,
          category: imageCategory,
        })
        setImages(
          data.map((image: AdminImage) => ({
            id: String(image.id),
            name: image.name,
            category: image.category,
            size: image.size,
            uploadedAt: image.uploaded_at ?? new Date().toISOString(),
            originalUrl: image.original_url,
            optimizedUrl: image.optimized_url,
          })),
        )
      } catch (error) {
        if (handleUnauthorized(error)) return
        setImagesError(error instanceof Error ? error.message : 'Could not load images')
      } finally {
        setIsLoadingImages(false)
      }
    }

    loadImages()
  }, [imageCategory, imageSearch])

  useEffect(() => {
    const loadExtras = async () => {
      setIsLoadingExtras(true)
      setExtrasError(null)
      try {
        const data = await getExtras()
        setExtras(data)
      } catch (error) {
        if (handleUnauthorized(error)) return
        setExtrasError(error instanceof Error ? error.message : 'No se pudieron cargar extras')
      } finally {
        setIsLoadingExtras(false)
      }
    }

    loadExtras()
  }, [])

  useEffect(() => {
    const loadPackages = async () => {
      setIsLoadingPackages(true)
      setPackagesError(null)
      try {
        const data = await getPackages()
        setPackages(data)
      } catch (error) {
        if (handleUnauthorized(error)) return
        setPackagesError(error instanceof Error ? error.message : 'No se pudieron cargar paquetes')
      } finally {
        setIsLoadingPackages(false)
      }
    }

    loadPackages()
  }, [])

  const handleDeleteExtra = async (id: number) => {
    const shouldDelete = window.confirm('Estas seguro que deseas eliminar este extra?')
    if (!shouldDelete) return

    setExtrasError(null)
    try {
      await deleteExtra(id)
      setExtras((prev) => prev.filter((item) => item.id !== id))
    } catch (error) {
      if (handleUnauthorized(error)) return
      setExtrasError(error instanceof Error ? error.message : 'No se pudo eliminar el extra')
    }
  }

  const handleDeletePackage = async (id: number) => {
    const shouldDelete = window.confirm('Estas seguro que deseas eliminar este paquete?')
    if (!shouldDelete) return

    setPackagesError(null)
    try {
      await deletePackage(id)
      setPackages((prev) => prev.filter((item) => item.id !== id))
    } catch (error) {
      if (handleUnauthorized(error)) return
      setPackagesError(error instanceof Error ? error.message : 'No se pudo eliminar el paquete')
    }
  }

  const handleUpdateExtra = async (
    id: number,
    payload: Partial<{ name: string; description: string; price: number; image_url: string }>,
  ) => {
    try {
      const updated = await updateExtra(id, payload)
      setExtras((prev) => prev.map((item) => (item.id === id ? updated : item)))
    } catch (error) {
      if (handleUnauthorized(error)) return
      throw error
    }
  }

  const handleUpdatePackage = async (
    id: number,
    payload: Partial<{
      name: string
      description: string
      price: number
      duration_days: number
      includes: string
      image_url: string
    }>,
  ) => {
    try {
      const updated = await updatePackage(id, payload)
      setPackages((prev) => prev.map((item) => (item.id === id ? updated : item)))
    } catch (error) {
      if (handleUnauthorized(error)) return
      throw error
    }
  }

  const handleCreateImages = async (
    items: Array<{
      name: string
      category: string
      size: number
      originalUrl: string
      optimizedUrl: string
      uploadedAt: string
    }>,
  ) => {
    setImagesError(null)
    let created
    try {
      created = await Promise.all(
        items.map((item) =>
          createImage({
            name: item.name,
            category: item.category,
            size: item.size,
            original_url: item.originalUrl,
            optimized_url: item.optimizedUrl,
          }),
        ),
      )
    } catch (error) {
      if (handleUnauthorized(error)) return
      throw error
    }

    setImages((prev) => [
      ...created.map((image) => ({
        id: String(image.id),
        name: image.name,
        category: image.category,
        size: image.size,
        uploadedAt: image.uploaded_at ?? new Date().toISOString(),
        originalUrl: image.original_url,
        optimizedUrl: image.optimized_url,
      })),
      ...prev,
    ])
    if (imageCategory !== 'all') {
      setImageCategory('all')
    }
  }

  const handleUpdateImage = async (
    imageId: string,
    payload: { name: string; category: string },
  ) => {
    setImagesError(null)
    let updated
    try {
      updated = await updateImage(Number(imageId), {
        name: payload.name,
        category: payload.category,
      })
    } catch (error) {
      if (handleUnauthorized(error)) return
      throw error
    }
    setImages((prev) =>
      prev.map((image) =>
        image.id === imageId
          ? {
              ...image,
              name: updated.name,
              category: updated.category,
            }
          : image,
      ),
    )
  }

  const handleBulkUpdateImageCategory = async (imageIds: string[], category: string) => {
    setImagesError(null)
    try {
      const results = await Promise.all(
        imageIds.map((id) => updateImage(Number(id), { category })),
      )
      const byId = new Map(results.map((row) => [String(row.id), row.category]))
      setImages((prev) =>
        prev.map((img) => (byId.has(img.id) ? { ...img, category: byId.get(img.id)! } : img)),
      )
    } catch (error) {
      if (handleUnauthorized(error)) return
      throw error
    }
  }

  const handleDeleteImage = async (imageId: string) => {
    setImagesError(null)
    try {
      await deleteImage(Number(imageId))
    } catch (error) {
      if (handleUnauthorized(error)) return
      throw error
    }
    setImages((prev) => prev.filter((image) => image.id !== imageId))
  }

  const handleLogout = () => {
    logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <AdminLayout activeSection={activeSection} onLogout={handleLogout}>
      {activeSection === 'images' && (
        <ImagesPage
          images={images}
          isLoading={isLoadingImages}
          error={imagesError}
          searchValue={imageSearch}
          categoryValue={imageCategory}
          onChangeFilters={({ search, category }) => {
            setImageSearch(search)
            setImageCategory(category)
          }}
          cloudName={CLOUDINARY_CLOUD_NAME}
          uploadPreset={CLOUDINARY_UPLOAD_PRESET}
          onCreateImages={handleCreateImages}
          onUpdateImage={handleUpdateImage}
          onBulkUpdateCategory={handleBulkUpdateImageCategory}
          onDeleteImage={handleDeleteImage}
        />
      )}

      {activeSection === 'extras' && (
        <ExtrasPage
          extras={extras}
          isLoading={isLoadingExtras}
          error={extrasError}
          onUpdate={handleUpdateExtra}
          onDelete={handleDeleteExtra}
        />
      )}

      {activeSection === 'packages' && (
        <PackagesPage
          packages={packages}
          isLoading={isLoadingPackages}
          error={packagesError}
          onUpdate={handleUpdatePackage}
          onDelete={handleDeletePackage}
        />
      )}

      {activeSection === 'rooms' && <RoomsPage rooms={rooms} setRooms={setRooms} />}

      {activeSection === 'settings' && (
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h2 className="card-title h5">Settings</h2>
            <p className="card-text text-muted small mb-4">
              Cloudinary credentials are loaded from environment variables.
            </p>
            <div className="bg-light rounded p-3 small">
              <p className="mb-2">
                <span className="fw-semibold">Cloud name:</span>{' '}
                {CLOUDINARY_CLOUD_NAME || 'Not configured'}
              </p>
              <p className="mb-0">
                <span className="fw-semibold">Upload preset:</span>{' '}
                {CLOUDINARY_UPLOAD_PRESET || 'Not configured'}
              </p>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
