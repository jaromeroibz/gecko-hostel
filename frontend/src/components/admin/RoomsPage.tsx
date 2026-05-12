import { useState } from 'react'
import { ModalPortal } from '../ui/ModalPortal'

export type RoomRecord = {
  id: string
  name: string
  capacity: number
  type: string
  basePrice: number
}

type RoomsPageProps = {
  rooms: RoomRecord[]
  setRooms: React.Dispatch<React.SetStateAction<RoomRecord[]>>
}

export function RoomsPage({ rooms, setRooms }: RoomsPageProps) {
  const [editing, setEditing] = useState<RoomRecord | null>(null)

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="card-title h4 mb-1">Rooms</h2>
        <p className="text-muted small mb-4">Manage room inventory and base prices.</p>

        <div className="table-responsive rounded border">
          <table className="table table-striped table-hover align-middle mb-0 small">
            <thead className="table-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Capacity</th>
                <th scope="col">Type</th>
                <th scope="col">Base price</th>
                <th scope="col" className="text-end">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td className="fw-medium">{room.name}</td>
                  <td>{room.capacity}</td>
                  <td>{room.type}</td>
                  <td>${room.basePrice.toFixed(2)}</td>
                  <td className="text-end text-nowrap">
                    <div className="btn-group btn-group-sm" role="group">
                      <button type="button" className="btn btn-outline-secondary" onClick={() => setEditing(room)}>
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => {
                          const shouldDelete = window.confirm(
                            `Delete room "${room.name}"? This cannot be undone.`,
                          )
                          if (!shouldDelete) return
                          setRooms((prev) => prev.filter((item) => item.id !== room.id))
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <ModalPortal onBackdropClick={() => setEditing(null)}>
          <div className="modal-content mx-auto admin-modal-panel" style={{ maxWidth: '28rem' }}>
            <div className="modal-header border-bottom d-flex align-items-center justify-content-between flex-nowrap">
              <h3 className="modal-title fs-6 mb-0 me-3 text-truncate">Edit room</h3>
              <button
                type="button"
                className="btn-close flex-shrink-0"
                aria-label="Close"
                onClick={() => setEditing(null)}
              />
            </div>
            <div className="modal-body">
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
                    <label className="form-label small">Capacity</label>
                    <input
                      type="number"
                      value={editing.capacity}
                      onChange={(event) =>
                        setEditing((prev) =>
                          prev ? { ...prev, capacity: Number(event.target.value) || prev.capacity } : prev,
                        )
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label small">Type</label>
                    <input
                      value={editing.type}
                      onChange={(event) =>
                        setEditing((prev) => (prev ? { ...prev, type: event.target.value } : prev))
                      }
                      className="form-control"
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label small">Base price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editing.basePrice}
                    onChange={(event) =>
                      setEditing((prev) =>
                        prev ? { ...prev, basePrice: Number(event.target.value) || prev.basePrice } : prev,
                      )
                    }
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer border-top d-flex flex-wrap justify-content-end gap-3">
              <button type="button" className="btn btn-outline-dark" onClick={() => setEditing(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setRooms((prev) => prev.map((room) => (room.id === editing.id ? editing : room)))
                  setEditing(null)
                }}
              >
                Save
              </button>
            </div>
          </div>
        </ModalPortal>
      )}
    </div>
  )
}
