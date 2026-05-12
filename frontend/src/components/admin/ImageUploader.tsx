import { useEffect, useMemo, useRef, useState } from 'react'

const MAX_FILE_SIZE_MB = 10
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024
const TARGET_UPLOAD_BYTES = Math.floor(MAX_FILE_SIZE_BYTES * 0.9)
const MAX_DIMENSION = 2800
const UPLOAD_CONCURRENCY = 4

type UploadStatus = 'ready' | 'uploading' | 'uploaded' | 'error'

export type UploadedImageResult = {
  originalUrl: string
  optimizedUrl: string
  name: string
}

type UploadQueueItem = {
  id: string
  file: File
  name: string
  size: number
  previewUrl: string
  progress: number
  status: UploadStatus
  error: string | null
  originalUrl: string | null
  optimizedUrl: string | null
}

type ImageUploaderProps = {
  cloudName: string
  uploadPreset: string
  onUploadedImagesChange?: (images: UploadedImageResult[]) => void
}

const directoryInputProps = { webkitdirectory: '', directory: '' } as Record<string, string>

export function optimizeCloudinaryUrl(originalUrl: string): string {
  const marker = '/image/upload/'
  if (!originalUrl.includes(marker)) return originalUrl
  return originalUrl.replace(marker, '/image/upload/f_auto,q_auto,w_1200/')
}

async function readImageDimensions(file: File): Promise<{ width: number; height: number }> {
  const objectUrl = URL.createObjectURL(file)
  try {
    const dimensions = await new Promise<{ width: number; height: number }>((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve({ width: img.width, height: img.height })
      img.onerror = () => reject(new Error('Could not read image dimensions'))
      img.src = objectUrl
    })
    return dimensions
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
}

async function canvasToWebpBlob(
  file: File,
  width: number,
  height: number,
  quality: number,
): Promise<Blob> {
  const bitmap = await createImageBitmap(file)
  try {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Could not get canvas context')
    ctx.drawImage(bitmap, 0, 0, width, height)

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((result) => resolve(result), 'image/webp', quality),
    )
    if (!blob) throw new Error('Could not encode WebP image')
    return blob
  } finally {
    bitmap.close()
  }
}

export async function prepareImageForUpload(file: File): Promise<File> {
  if (!file.type.startsWith('image/')) return file

  const { width, height } = await readImageDimensions(file)
  const scale = Math.min(1, MAX_DIMENSION / Math.max(width, height))
  const targetWidth = Math.max(1, Math.round(width * scale))
  const targetHeight = Math.max(1, Math.round(height * scale))
  const needsResize = targetWidth !== width || targetHeight !== height
  const needsCompression = file.size > TARGET_UPLOAD_BYTES
  const needsFormatChange = file.type !== 'image/webp' && file.size > MAX_FILE_SIZE_BYTES

  // Keep small/medium files untouched for better speed.
  if (!needsResize && !needsCompression && !needsFormatChange) return file

  let candidate = file
  let quality = 0.88
  let attempts = 0

  while ((candidate.size > TARGET_UPLOAD_BYTES || attempts === 0) && attempts < 6) {
    const blob = await canvasToWebpBlob(file, targetWidth, targetHeight, quality)
    const nextName = file.name.replace(/\.[^.]+$/, '') || file.name
    candidate = new File([blob], `${nextName}.webp`, { type: 'image/webp', lastModified: Date.now() })
    if (candidate.size <= TARGET_UPLOAD_BYTES) break
    quality = Math.max(0.45, quality - 0.1)
    attempts += 1
  }

  return candidate
}

export function uploadToCloudinary(options: {
  file: File
  cloudName: string
  uploadPreset: string
  onProgress?: (progress: number) => void
}): Promise<{ originalUrl: string; optimizedUrl: string }> {
  const { file, cloudName, uploadPreset, onProgress } = options
  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

  return new Promise((resolve, reject) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', uploadPreset)

    const xhr = new XMLHttpRequest()
    xhr.open('POST', endpoint)
    xhr.responseType = 'json'

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) return
      const progress = Math.round((event.loaded / event.total) * 100)
      onProgress?.(progress)
    }

    xhr.onerror = () => reject(new Error('Network error while uploading image'))
    xhr.onabort = () => reject(new Error('Upload cancelled'))

    xhr.onload = () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        reject(new Error(`Cloudinary upload failed (${xhr.status})`))
        return
      }

      const response = xhr.response as { secure_url?: string } | null
      const originalUrl = response?.secure_url
      if (!originalUrl) {
        reject(new Error('Cloudinary response missing secure_url'))
        return
      }

      resolve({
        originalUrl,
        optimizedUrl: optimizeCloudinaryUrl(originalUrl),
      })
    }

    xhr.send(formData)
  })
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function buildQueueItems(files: File[]): UploadQueueItem[] {
  const imageFiles = files.filter((file) => file.type.startsWith('image/'))

  return imageFiles.map((file, index) => ({
    id: `${file.name}-${file.lastModified}-${index}-${Math.random().toString(36).slice(2, 8)}`,
    file,
    name: file.name,
    size: file.size,
    previewUrl: URL.createObjectURL(file),
    progress: 0,
    status: 'ready',
    error: null,
    originalUrl: null,
    optimizedUrl: null,
  }))
}

export function ImageUploader({ cloudName, uploadPreset, onUploadedImagesChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const queueRef = useRef<UploadQueueItem[]>([])
  const [queue, setQueue] = useState<UploadQueueItem[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)

  const uploadedImages = useMemo<UploadedImageResult[]>(
    () =>
      queue
        .filter((item) => item.status === 'uploaded' && item.originalUrl && item.optimizedUrl)
        .map((item) => ({
          originalUrl: item.originalUrl as string,
          optimizedUrl: item.optimizedUrl as string,
          name: item.name,
        })),
    [queue],
  )
  const overallProgress = useMemo(() => {
    if (queue.length === 0) return 0
    const total = queue.reduce((sum, item) => sum + item.progress, 0)
    return Math.round(total / queue.length)
  }, [queue])

  useEffect(() => {
    onUploadedImagesChange?.(uploadedImages)
  }, [onUploadedImagesChange, uploadedImages])

  useEffect(() => {
    queueRef.current = queue
  }, [queue])

  useEffect(() => {
    return () => {
      queueRef.current.forEach((item) => URL.revokeObjectURL(item.previewUrl))
    }
  }, [])

  const addFiles = (files: File[]) => {
    if (files.length === 0) return

    const invalidTypeCount = files.filter((file) => !file.type.startsWith('image/')).length
    const tooLargeCount = files.filter((file) => file.size > MAX_FILE_SIZE_BYTES).length
    const acceptedFiles = files.filter((file) => file.type.startsWith('image/'))

    if (invalidTypeCount > 0 || tooLargeCount > 0) {
      const invalidTypeMsg = invalidTypeCount > 0 ? `${invalidTypeCount} invalid format` : ''
      const tooLargeMsg =
        tooLargeCount > 0 ? `${tooLargeCount} above ${MAX_FILE_SIZE_MB}MB (will optimize to WebP)` : ''
      setFeedback([invalidTypeMsg, tooLargeMsg].filter(Boolean).join(' · '))
    } else {
      setFeedback(null)
    }

    if (acceptedFiles.length === 0) return

    const nextItems = buildQueueItems(acceptedFiles)
    setQueue((prev) => [...prev, ...nextItems])
  }

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const list = event.target.files
    if (!list) return
    addFiles(Array.from(list))
    event.target.value = ''
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(false)
    const list = event.dataTransfer.files
    if (!list) return
    addFiles(Array.from(list))
  }

  const removeItem = (id: string) => {
    setQueue((prev) => {
      const target = prev.find((item) => item.id === id)
      if (target) URL.revokeObjectURL(target.previewUrl)
      return prev.filter((item) => item.id !== id)
    })
  }

  const uploadAll = async () => {
    const pendingItems = queue.filter((item) => item.status === 'ready' || item.status === 'error')
    if (pendingItems.length === 0) return

    setIsUploading(true)
    setFeedback(null)
    let cursor = 0
    const worker = async () => {
      while (cursor < pendingItems.length) {
        const index = cursor
        cursor += 1
        const pending = pendingItems[index]

        setQueue((prev) =>
          prev.map((item) =>
            item.id === pending.id
              ? { ...item, status: 'uploading', progress: 0, error: null }
              : item,
          ),
        )

        try {
          // Convert only when needed (mostly large images).
          const preparedFile = await prepareImageForUpload(pending.file)
          const uploaded = await uploadToCloudinary({
            file: preparedFile,
            cloudName,
            uploadPreset,
            onProgress: (progress) => {
              setQueue((prev) =>
                prev.map((item) => (item.id === pending.id ? { ...item, progress } : item)),
              )
            },
          })

          setQueue((prev) =>
            prev.map((item) =>
              item.id === pending.id
                ? {
                    ...item,
                    name: preparedFile.name,
                    size: preparedFile.size,
                    status: 'uploaded',
                    progress: 100,
                    originalUrl: uploaded.originalUrl,
                    optimizedUrl: uploaded.optimizedUrl,
                    error: null,
                  }
                : item,
            ),
          )
        } catch (error) {
          setQueue((prev) =>
            prev.map((item) =>
              item.id === pending.id
                ? {
                    ...item,
                    status: 'error',
                    error: error instanceof Error ? error.message : 'Upload failed',
                  }
                : item,
            ),
          )
        }
      }
    }

    const poolSize = Math.min(UPLOAD_CONCURRENCY, pendingItems.length)
    await Promise.all(Array.from({ length: poolSize }, () => worker()))
    setIsUploading(false)
  }

  return (
    <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div>
        <h3 className="text-base font-semibold text-slate-900">Image uploader</h3>
        <p className="text-xs text-slate-500">
          Drag and drop images, pick multiple files, or upload folder contents. Large files are
          auto-optimized to WebP before upload.
        </p>
      </div>

      <div
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragOver(true)
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={`rounded-xl border-2 border-dashed p-6 text-center transition ${
          isDragOver ? 'border-teal-500 bg-teal-50' : 'border-slate-300 bg-slate-50'
        }`}
      >
        <p className="text-sm font-medium text-slate-700">Drop images here</p>
        <p className="mt-1 text-xs text-slate-500">or choose files/folder from your computer</p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-teal-800"
          >
            Select images
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Select folder
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
          {...directoryInputProps}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={uploadAll}
          disabled={isUploading || queue.length === 0 || !cloudName || !uploadPreset}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isUploading ? 'Uploading...' : 'Upload all'}
        </button>
        {!cloudName || !uploadPreset ? (
          <p className="text-xs text-amber-700">Missing Cloudinary env vars for uploader.</p>
        ) : null}
      </div>

      <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
        <div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-600">
          <span>Overall upload progress</span>
          <span>{overallProgress}%</span>
        </div>
        <div className="h-2 rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-teal-600 transition-all"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {feedback ? <p className="rounded-lg bg-amber-50 p-2 text-xs text-amber-800">{feedback}</p> : null}

      {queue.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {queue.map((item) => (
            <article
              key={item.id}
              className="group rounded-xl border border-slate-200 bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="aspect-video overflow-hidden rounded-lg bg-slate-100">
                <img src={item.previewUrl} alt={item.name} className="h-full w-full object-cover" />
              </div>
              <div className="mt-2">
                <p className="truncate text-sm font-semibold text-slate-800">{item.name}</p>
                <p className="text-xs text-slate-500">{formatSize(item.size)}</p>
              </div>

              <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full transition-all ${
                    item.status === 'error'
                      ? 'bg-red-500'
                      : item.status === 'uploaded'
                        ? 'bg-emerald-500'
                        : 'bg-teal-500'
                  }`}
                  style={{ width: `${item.progress}%` }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-slate-600">
                  {item.status === 'uploaded'
                    ? 'Uploaded'
                    : item.status === 'uploading'
                      ? `Uploading ${item.progress}%`
                      : item.status === 'error'
                        ? 'Error'
                        : 'Ready'}
                </span>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-xs font-semibold text-red-600 transition hover:text-red-700"
                >
                  Remove
                </button>
              </div>

              {item.error ? <p className="mt-2 text-xs text-red-600">{item.error}</p> : null}

              {item.optimizedUrl ? (
                <a
                  href={item.optimizedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex text-xs font-medium text-teal-700 hover:underline"
                >
                  Open optimized URL
                </a>
              ) : null}
            </article>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500">No images selected yet.</p>
      )}
    </section>
  )
}
