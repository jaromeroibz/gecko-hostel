import { useEffect, useMemo, useRef, useState } from 'react'

import {
  optimizeCloudinaryUrl,
  prepareImageForUpload,
  uploadToCloudinary,
  type UploadedImageResult,
} from './ImageUploader'
import { IMAGE_UPLOAD_BATCH_OPTIONS } from '../../lib/imageCategories'
import { ModalPortal } from '../ui/ModalPortal'

const MAX_FILE_SIZE_MB = 10
const UPLOAD_CONCURRENCY = 4

type QueueItem = {
  id: string
  file: File
  progress: number
  status: 'ready' | 'uploading' | 'uploaded' | 'error'
  error: string | null
}

type UploadModalProps = {
  cloudName: string
  uploadPreset: string
  onClose: () => void
  onUploaded: (
    items: Array<
      UploadedImageResult & {
        size: number
        category: string
        uploadedAt: string
      }
    >,
  ) => void | Promise<void>
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function UploadModal({ cloudName, uploadPreset, onClose, onUploaded }: UploadModalProps) {
  const DEBUG_PREFIX = '[UploadModal]'
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const folderInputRef = useRef<HTMLInputElement | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [queue, setQueue] = useState<QueueItem[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [category, setCategory] = useState<string>('')
  const [feedback, setFeedback] = useState<string | null>(null)

  const canUpload = useMemo(
    () => queue.some((item) => item.status === 'ready' || item.status === 'error'),
    [queue],
  )
  const totalSizeBytes = useMemo(
    () => queue.reduce((sum, item) => sum + item.file.size, 0),
    [queue],
  )
  const overallProgress = useMemo(() => {
    if (queue.length === 0) return 0
    const total = queue.reduce((sum, item) => sum + item.progress, 0)
    return Math.round(total / queue.length)
  }, [queue])

  useEffect(() => {
    console.info(`${DEBUG_PREFIX} mounted`, {
      cloudConfigured: Boolean(cloudName),
      presetConfigured: Boolean(uploadPreset),
    })
  }, [cloudName, uploadPreset])

  const openFilePicker = () => {
    try {
      const input = fileInputRef.current
      if (!input) {
        console.error(`${DEBUG_PREFIX} file input ref is null; cannot open file picker`)
        setFeedback('Could not open file picker.')
        return
      }
      input.click()
    } catch (error) {
      console.error(`${DEBUG_PREFIX} failed to open file picker`, error)
      setFeedback('Could not open file picker.')
    }
  }

  const openFolderPicker = () => {
    try {
      const input = folderInputRef.current
      if (!input) {
        console.error(`${DEBUG_PREFIX} folder input ref is null; cannot open folder picker`)
        setFeedback('Could not open folder picker.')
        return
      }
      input.click()
    } catch (error) {
      console.error(`${DEBUG_PREFIX} failed to open folder picker`, error)
      setFeedback('Could not open folder picker.')
    }
  }

  const clearAndClose = () => {
    setFeedback(null)
    setQueue([])
    onClose()
  }

  const clearQueue = () => {
    setQueue([])
    setFeedback(null)
  }

  const addFiles = (files: File[]) => {
    const invalidTypeCount = files.filter((file) => !file.type.startsWith('image/')).length
    const tooLargeCount = files.filter((file) => file.size > MAX_FILE_SIZE_MB * 1024 * 1024).length
    const validFiles = files.filter((file) => file.type.startsWith('image/'))

    const issues: string[] = []
    if (invalidTypeCount > 0) issues.push(`${invalidTypeCount} invalid format`)
    if (tooLargeCount > 0) {
      issues.push(`${tooLargeCount} above ${MAX_FILE_SIZE_MB}MB (will optimize to WebP)`)
    }
    setFeedback(issues.length > 0 ? issues.join(' · ') : null)

    const next = validFiles.map((file, index) => ({
      id: `${file.name}-${file.lastModified}-${index}-${Math.random().toString(36).slice(2, 8)}`,
      file,
      progress: 0,
      status: 'ready' as const,
      error: null,
    }))
    setQueue((prev) => [...prev, ...next])
  }

  const handleUploadAll = async () => {
    if (!canUpload || !cloudName || !uploadPreset) return
    setIsUploading(true)

    const uploadedItems: Array<
      UploadedImageResult & {
        size: number
        category: string
        uploadedAt: string
      }
    > = []

    const pending = queue.filter((item) => item.status === 'ready' || item.status === 'error')
    let cursor = 0

    const worker = async () => {
      while (cursor < pending.length) {
        const index = cursor
        cursor += 1
        const item = pending[index]

        setQueue((prev) =>
          prev.map((q) => (q.id === item.id ? { ...q, status: 'uploading', error: null } : q)),
        )

        try {
          const preparedFile = await prepareImageForUpload(item.file)
          const uploaded = await uploadToCloudinary({
            file: preparedFile,
            cloudName,
            uploadPreset,
            onProgress: (progress) => {
              setQueue((prev) => prev.map((q) => (q.id === item.id ? { ...q, progress } : q)))
            },
          })

          uploadedItems.push({
            ...uploaded,
            optimizedUrl: optimizeCloudinaryUrl(uploaded.originalUrl),
            name: preparedFile.name,
            size: preparedFile.size,
            category,
            uploadedAt: new Date().toISOString(),
          })

          setQueue((prev) =>
            prev.map((q) =>
              q.id === item.id ? { ...q, status: 'uploaded', progress: 100, error: null } : q,
            ),
          )
        } catch (error) {
          console.error(`${DEBUG_PREFIX} per-file upload failed`, {
            fileName: item.file.name,
            error,
          })
          setQueue((prev) =>
            prev.map((q) =>
              q.id === item.id
                ? {
                    ...q,
                    status: 'error',
                    error: error instanceof Error ? error.message : 'Upload failed',
                  }
                : q,
            ),
          )
        }
      }
    }

    const poolSize = Math.min(UPLOAD_CONCURRENCY, pending.length)
    await Promise.all(Array.from({ length: poolSize }, () => worker()))

    setIsUploading(false)
    if (uploadedItems.length > 0) {
      try {
        await Promise.resolve(onUploaded(uploadedItems))
        setFeedback('Upload completed and saved.')
        clearQueue()
        onClose()
      } catch (error) {
        console.error(`${DEBUG_PREFIX} backend save after upload failed`, error)
        setFeedback(error instanceof Error ? error.message : 'Upload completed but save failed.')
      }
    }
  }

  const content = (
    <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable my-0 upload-images-modal">
      <div className="modal-content admin-modal-panel">
        <div className="modal-header border-bottom d-flex align-items-center justify-content-between flex-nowrap">
          <h2 className="modal-title fs-5 mb-0 me-3 text-truncate">Upload images</h2>
          <button
            type="button"
            className="btn-close flex-shrink-0"
            aria-label="Close"
            onClick={clearAndClose}
          />
        </div>

        <div className="modal-body">
          <div className="upload-category-box mb-4">
            <div className="upload-category-title">Category (optional)</div>
            <p className="upload-category-hint mb-0">
              Choose one for the whole batch, or <strong>Set later</strong> and assign categories in the table
              (including bulk edit).
            </p>
            <div className="d-flex flex-wrap gap-2 mt-3" role="group" aria-label="Category for uploaded images">
              {IMAGE_UPLOAD_BATCH_OPTIONS.map((opt) => (
                <button
                  key={opt.value || 'later'}
                  type="button"
                  className={`btn btn-sm upload-category-btn ${
                    category === opt.value ? 'btn-primary' : 'btn-outline-secondary'
                  }`}
                  onClick={() => setCategory(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div
            onDragOver={(event) => {
              event.preventDefault()
              setIsDragOver(true)
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(event) => {
              event.preventDefault()
              setIsDragOver(false)
              addFiles(Array.from(event.dataTransfer.files))
            }}
            className={`rounded-3 border p-4 p-md-5 text-center bg-light ${
              isDragOver ? 'border-primary border-2 bg-primary-subtle' : 'border-secondary'
            }`}
            style={{ borderStyle: 'dashed', borderWidth: '2px' }}
          >
            <div className="rounded-circle bg-white text-primary d-inline-flex align-items-center justify-content-center mb-3 shadow-sm p-4">
              <i className="bi bi-cloud-arrow-up display-4" aria-hidden />
            </div>
            <p className="fs-5 text-body-secondary fw-semibold mb-1">Drag and drop images here</p>
            <p className="text-muted small mb-3">or choose files</p>
            <div className="d-flex flex-wrap justify-content-center gap-2">
              <button type="button" onClick={openFilePicker} className="btn btn-primary px-4">
                <i className="bi bi-folder2-open me-2" aria-hidden />
                Browse
              </button>
              <button type="button" onClick={openFolderPicker} className="btn btn-outline-dark">
                <i className="bi bi-folder-symlink me-2" aria-hidden />
                Select folder
              </button>
            </div>
            <p className="small text-secondary mt-3 mb-0 fw-medium">
              Only images. Files above {MAX_FILE_SIZE_MB}MB are auto-optimized to WebP.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="visually-hidden"
              tabIndex={-1}
              onChange={(event) => {
                const files = event.target.files
                if (!files) return
                addFiles(Array.from(files))
                event.target.value = ''
              }}
            />
            <input
              ref={folderInputRef}
              type="file"
              accept="image/*"
              multiple
              className="visually-hidden"
              tabIndex={-1}
              onChange={(event) => {
                const files = event.target.files
                if (!files) return
                addFiles(Array.from(files))
                event.target.value = ''
              }}
              {...({ webkitdirectory: '', directory: '' } as Record<string, string>)}
            />
          </div>

          {feedback ? (
            <div
              className={`alert small py-2 mt-3 mb-0 ${
                feedback.includes('completed') ? 'alert-success' : 'alert-warning'
              }`}
            >
              {feedback}
            </div>
          ) : null}

          {queue.length > 0 ? (
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mt-3 p-3 rounded border bg-white small">
              <span className="text-body">
                <span className="fw-semibold">{queue.length}</span> image{queue.length === 1 ? '' : 's'}{' '}
                selected · total <span className="fw-semibold">{formatBytes(totalSizeBytes)}</span>
              </span>
              {!isUploading ? (
                <button type="button" className="btn btn-link btn-sm text-danger p-0" onClick={clearQueue}>
                  Clear all
                </button>
              ) : null}
            </div>
          ) : null}

          {queue.length > 0 && (isUploading || overallProgress > 0) ? (
            <div className="mt-3">
              <div className="d-flex justify-content-between small text-body-secondary mb-1">
                <span>Overall progress</span>
                <span>{overallProgress}%</span>
              </div>
              <div className="progress" style={{ height: '0.5rem' }}>
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: `${overallProgress}%` }}
                  aria-valuenow={overallProgress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          ) : null}
        </div>

        <div className="modal-footer border-top d-flex flex-wrap justify-content-end gap-3">
          <button type="button" onClick={clearAndClose} className="btn btn-outline-dark">
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUploadAll}
            disabled={!canUpload || isUploading || !cloudName || !uploadPreset}
            className="btn btn-primary"
          >
            {isUploading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                />
                Uploading…
              </>
            ) : (
              <>
                <i className="bi bi-cloud-upload me-2" aria-hidden />
                Upload
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )

  return <ModalPortal onBackdropClick={clearAndClose}>{content}</ModalPortal>
}
