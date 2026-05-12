import { useEffect, useMemo, useRef, useState } from 'react'

import {
  formatImageCategoryLabel,
  IMAGE_FILTER_OPTIONS,
  IMAGE_SELECT_OPTIONS,
} from '../../lib/imageCategories'
import { UploadModal } from './UploadModal'
import { ModalPortal } from '../ui/ModalPortal'

export type ImageRecord = {
  id: string
  name: string
  category: string
  size: number
  uploadedAt: string
  originalUrl: string
  optimizedUrl: string
}

type ImagesPageProps = {
  images: ImageRecord[]
  isLoading: boolean
  error: string | null
  searchValue: string
  categoryValue: string
  onChangeFilters: (filters: { search: string; category: string }) => void
  cloudName: string
  uploadPreset: string
  onCreateImages: (
    items: Array<{
      name: string
      category: string
      size: number
      originalUrl: string
      optimizedUrl: string
      uploadedAt: string
    }>,
  ) => Promise<void>
  onUpdateImage: (imageId: string, payload: { name: string; category: string }) => Promise<void>
  onBulkUpdateCategory: (imageIds: string[], category: string) => Promise<void>
  onDeleteImage: (imageId: string) => Promise<void>
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function ImagesPage({
  images,
  isLoading,
  error,
  searchValue,
  categoryValue,
  onChangeFilters,
  cloudName,
  uploadPreset,
  onCreateImages,
  onUpdateImage,
  onBulkUpdateCategory,
  onDeleteImage,
}: ImagesPageProps) {
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [editingCategory, setEditingCategory] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set())
  const [bulkCategory, setBulkCategory] = useState<string>('general')
  const [isBulkSaving, setIsBulkSaving] = useState(false)
  const selectAllRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setSelectedIds(new Set())
  }, [searchValue, categoryValue])

  const visibleIds = useMemo(() => images.map((i) => i.id), [images])
  const allVisibleSelected =
    visibleIds.length > 0 && visibleIds.every((id) => selectedIds.has(id))
  const someVisibleSelected = visibleIds.some((id) => selectedIds.has(id))

  useEffect(() => {
    const el = selectAllRef.current
    if (el) el.indeterminate = someVisibleSelected && !allVisibleSelected
  }, [someVisibleSelected, allVisibleSelected])

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      setSelectedIds((prev) => {
        const next = new Set(prev)
        visibleIds.forEach((id) => next.delete(id))
        return next
      })
    } else {
      setSelectedIds((prev) => new Set([...prev, ...visibleIds]))
    }
  }

  const toggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleBulkApply = async () => {
    if (selectedIds.size === 0) return
    setIsBulkSaving(true)
    setFeedback(null)
    try {
      await onBulkUpdateCategory([...selectedIds], bulkCategory)
      setFeedback(`Updated category for ${selectedIds.size} image(s).`)
      setSelectedIds(new Set())
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : 'Bulk update failed.')
    } finally {
      setIsBulkSaving(false)
    }
  }

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setFeedback('Image URL copied to clipboard.')
    } catch {
      setFeedback('Could not copy URL. Please copy manually.')
    }
  }

  const handleDeleteImage = (imageId: string, imageName: string) => {
    const shouldDelete = window.confirm(`Delete "${imageName}"? This cannot be undone.`)
    if (!shouldDelete) return
    onDeleteImage(imageId)
      .then(() => {
        setFeedback('Image deleted.')
        setSelectedIds((prev) => {
          const next = new Set(prev)
          next.delete(imageId)
          return next
        })
      })
      .catch((err) => setFeedback(err instanceof Error ? err.message : 'Failed to delete image.'))
  }

  const startEdit = (image: ImageRecord) => {
    setEditingId(image.id)
    setEditingName(image.name)
    setEditingCategory(image.category ?? '')
  }

  const saveEdit = () => {
    if (!editingId) return
    const original = images.find((image) => image.id === editingId)
    const nextName = editingName.trim() || original?.name || ''
    onUpdateImage(editingId, { name: nextName, category: editingCategory })
      .then(() => {
        setFeedback('Image updated.')
        setEditingId(null)
      })
      .catch((err) => setFeedback(err instanceof Error ? err.message : 'Failed to update image.'))
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row align-items-md-start justify-content-between gap-3 mb-4">
          <div>
            <h2 className="card-title h4 mb-1">Images</h2>
            <p className="text-muted small mb-0">Manage Cloudinary assets for the site.</p>
          </div>
          <button
            type="button"
            onClick={() => setIsUploadOpen(true)}
            className="btn btn-primary d-inline-flex align-items-center gap-2"
          >
            <i className="bi bi-cloud-upload" aria-hidden />
            Upload images
          </button>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-8">
            <label htmlFor="admin-images-search" className="form-label small fw-semibold text-body mb-1">
              Filter by name
            </label>
            <input
              id="admin-images-search"
              value={searchValue}
              onChange={(event) =>
                onChangeFilters({
                  search: event.target.value,
                  category: categoryValue,
                })
              }
              placeholder="Search images by name..."
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="admin-images-category" className="form-label small fw-semibold text-body mb-1">
              Category filter
            </label>
            <select
              id="admin-images-category"
              value={categoryValue}
              onChange={(event) =>
                onChangeFilters({
                  search: searchValue,
                  category: event.target.value,
                })
              }
              className="form-select"
            >
              {IMAGE_FILTER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedIds.size > 0 ? (
          <div className="d-flex flex-wrap align-items-center gap-2 p-3 mb-3 rounded border border-primary-subtle bg-primary-subtle">
            <span className="small fw-semibold text-body me-2">
              {selectedIds.size} selected
            </span>
            <label htmlFor="bulk-category" className="visually-hidden">
              Apply category
            </label>
            <select
              id="bulk-category"
              value={bulkCategory}
              onChange={(e) => setBulkCategory(e.target.value)}
              className="form-select form-select-sm"
              style={{ maxWidth: '14rem' }}
            >
              {IMAGE_SELECT_OPTIONS.map((opt) => (
                <option key={opt.value || 'unset'} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              disabled={isBulkSaving}
              onClick={() => void handleBulkApply()}
            >
              {isBulkSaving ? 'Applying…' : 'Apply category'}
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-dark"
              disabled={isBulkSaving}
              onClick={() => setSelectedIds(new Set())}
            >
              Clear selection
            </button>
          </div>
        ) : null}

        {error ? <div className="alert alert-danger py-2 small mb-3">{error}</div> : null}
        {feedback ? <div className="alert alert-secondary py-2 small mb-3">{feedback}</div> : null}

        <div className="table-responsive rounded border">
          <table className="table table-striped table-hover align-middle mb-0 small">
            <thead className="table-light">
              <tr>
                <th scope="col" className="text-center" style={{ width: '2.5rem' }}>
                  <span className="visually-hidden">Select</span>
                  <input
                    ref={selectAllRef}
                    type="checkbox"
                    className="form-check-input"
                    checked={allVisibleSelected}
                    onChange={toggleSelectAll}
                    disabled={isLoading || visibleIds.length === 0}
                    aria-label="Select all visible images"
                  />
                </th>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Size</th>
                <th scope="col">Upload date</th>
                <th scope="col">Preview</th>
                <th scope="col" className="text-end">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-5">
                    Loading images...
                  </td>
                </tr>
              ) : (
                images.map((image) => (
                  <tr key={image.id}>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedIds.has(image.id)}
                        onChange={() => toggleRow(image.id)}
                        aria-label={`Select ${image.name}`}
                      />
                    </td>
                    <td className="fw-medium text-break">{image.name}</td>
                    <td>
                      <span className="text-body">{formatImageCategoryLabel(image.category)}</span>
                    </td>
                    <td>{formatBytes(image.size)}</td>
                    <td>{new Date(image.uploadedAt).toLocaleDateString()}</td>
                    <td>
                      <span className="admin-preview-wrap position-relative d-inline-block">
                        <a
                          href={image.optimizedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary"
                        >
                          <i className="bi bi-box-arrow-up-right me-1" aria-hidden />
                          Preview
                        </a>
                        <span className="admin-thumb-popover" role="tooltip">
                          <img src={image.optimizedUrl} alt="" loading="lazy" />
                        </span>
                      </span>
                    </td>
                    <td className="text-end text-nowrap">
                      <div className="btn-group btn-group-sm" role="group" aria-label="Actions">
                        <button type="button" className="btn btn-outline-secondary" onClick={() => startEdit(image)}>
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => handleDeleteImage(image.id, image.name)}
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => handleCopy(image.optimizedUrl)}
                        >
                          Copy URL
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
              {!isLoading && images.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-5">
                    No images found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editingId ? (
        <ModalPortal onBackdropClick={() => setEditingId(null)}>
          <div
            className="modal-content mx-auto admin-modal-panel"
            style={{ maxWidth: '28rem' }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-image-title"
          >
            <div className="modal-header border-bottom d-flex align-items-center justify-content-between flex-nowrap">
              <h3 id="edit-image-title" className="modal-title fs-6 mb-0 me-3 text-truncate">
                Edit image
              </h3>
              <button
                type="button"
                className="btn-close flex-shrink-0"
                aria-label="Close"
                onClick={() => setEditingId(null)}
              />
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label small fw-semibold" htmlFor="edit-image-name">
                    Name
                  </label>
                  <input
                    id="edit-image-name"
                    value={editingName}
                    onChange={(event) => setEditingName(event.target.value)}
                    className="form-control"
                    placeholder="Image name"
                  />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-semibold" htmlFor="edit-image-category">
                    Category
                  </label>
                  <select
                    id="edit-image-category"
                    value={editingCategory}
                    onChange={(event) => setEditingCategory(event.target.value)}
                    className="form-select"
                  >
                    {IMAGE_SELECT_OPTIONS.map((opt) => (
                      <option key={opt.value || 'unset'} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer border-top d-flex flex-wrap justify-content-end gap-3">
              <button type="button" className="btn btn-outline-dark" onClick={() => setEditingId(null)}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={saveEdit}>
                Save
              </button>
            </div>
          </div>
        </ModalPortal>
      ) : null}

      {isUploadOpen ? (
        <UploadModal
          cloudName={cloudName}
          uploadPreset={uploadPreset}
          onClose={() => setIsUploadOpen(false)}
          onUploaded={onCreateImages}
        />
      ) : null}
    </div>
  )
}
