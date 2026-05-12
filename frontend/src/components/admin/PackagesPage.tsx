import { useState } from 'react'

import type { AdminPackage } from '../../services/adminApi'
import { ModalPortal } from '../ui/ModalPortal'

type PackagesPageProps = {
  packages: AdminPackage[]
  isLoading: boolean
  error: string | null
  onUpdate: (
    id: number,
    payload: Partial<{
      name: string
      description: string
      price: number
      duration_days: number
      includes: string
      image_url: string
    }>,
  ) => Promise<void>
  onDelete: (id: number) => void
}

export function PackagesPage({ packages, isLoading, error, onUpdate, onDelete }: PackagesPageProps) {
  const [editing, setEditing] = useState<AdminPackage | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const saveEdit = async () => {
    if (!editing) return
    setSaveError(null)
    setIsSaving(true)
    try {
      await onUpdate(editing.id, {
        name: editing.name,
        description: editing.description,
        price: editing.price,
        duration_days: editing.duration_days,
        includes: editing.includes,
        image_url: editing.image_url ?? '',
      })
      setEditing(null)
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save package')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="card-title h4 mb-1">Packages</h2>
        <p className="text-muted small mb-4">Curate bundles with nights and included experiences.</p>

        {error ? <div className="alert alert-danger py-2 small mb-3">{error}</div> : null}

        <div className="table-responsive rounded border">
          <table className="table table-striped table-hover align-middle mb-0 small">
            <thead className="table-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Nights</th>
                <th scope="col">Price</th>
                <th scope="col">Included extras</th>
                <th scope="col" className="text-end">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-5">
                    Loading packages...
                  </td>
                </tr>
              ) : (
                packages.map((item) => (
                  <tr key={item.id}>
                    <td className="fw-medium">{item.name}</td>
                    <td>{item.duration_days}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td className="text-break">{item.includes}</td>
                    <td className="text-end text-nowrap">
                      <div className="btn-group btn-group-sm" role="group">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setEditing(item)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => {
                            const shouldDelete = window.confirm(
                              `Delete package "${item.name}"? This cannot be undone.`,
                            )
                            if (!shouldDelete) return
                            onDelete(item.id)
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <ModalPortal onBackdropClick={() => setEditing(null)}>
          <div
            className="modal-content mx-auto admin-modal-panel"
            style={{ maxWidth: '28rem', maxHeight: '90vh' }}
          >
            <div className="modal-header border-bottom d-flex align-items-center justify-content-between flex-nowrap">
              <h3 className="modal-title fs-6 mb-0 me-3 text-truncate">Edit package</h3>
              <button
                type="button"
                className="btn-close flex-shrink-0"
                aria-label="Close"
                onClick={() => setEditing(null)}
              />
            </div>
            <div className="modal-body overflow-auto">
              <div className="vstack gap-3">
                <div>
                  <label className="form-label small">Name</label>
                  <input
                    value={editing.name}
                    onChange={(event) => setEditing((prev) => (prev ? { ...prev, name: event.target.value } : prev))}
                    className="form-control"
                  />
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label small">Nights</label>
                    <input
                      type="number"
                      value={editing.duration_days}
                      onChange={(event) =>
                        setEditing((prev) =>
                          prev
                            ? { ...prev, duration_days: Number(event.target.value) || prev.duration_days }
                            : prev,
                        )
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label small">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editing.price}
                      onChange={(event) =>
                        setEditing((prev) =>
                          prev ? { ...prev, price: Number(event.target.value) || prev.price } : prev,
                        )
                      }
                      className="form-control"
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label small">Description</label>
                  <textarea
                    value={editing.description}
                    onChange={(event) =>
                      setEditing((prev) => (prev ? { ...prev, description: event.target.value } : prev))
                    }
                    rows={3}
                    className="form-control"
                  />
                </div>
                <div>
                  <label className="form-label small">Includes</label>
                  <textarea
                    value={editing.includes}
                    onChange={(event) =>
                      setEditing((prev) => (prev ? { ...prev, includes: event.target.value } : prev))
                    }
                    rows={2}
                    className="form-control"
                  />
                </div>
              </div>
              {saveError ? <p className="text-danger small mt-3 mb-0">{saveError}</p> : null}
            </div>
            <div className="modal-footer border-top d-flex flex-wrap justify-content-end gap-3">
              <button type="button" className="btn btn-outline-dark" onClick={() => setEditing(null)}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary" disabled={isSaving} onClick={saveEdit}>
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </ModalPortal>
      )}
    </div>
  )
}
