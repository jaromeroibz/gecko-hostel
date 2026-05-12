import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

type ModalPortalProps = {
  children: ReactNode
  onBackdropClick?: () => void
}

const overlayStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  backgroundColor: 'rgba(15, 23, 42, 0.65)',
  WebkitBackdropFilter: 'blur(2px)',
  backdropFilter: 'blur(2px)',
}

const shellStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 1055,
  isolation: 'isolate',
}

const centerStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  zIndex: 1056,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
  pointerEvents: 'none',
}

const panelWrapStyle: CSSProperties = {
  pointerEvents: 'auto',
  maxHeight: '100%',
  width: '100%',
  maxWidth: '80rem',
}

export function ModalPortal({ children, onBackdropClick }: ModalPortalProps) {
  const openedAtRef = useRef<number>(Date.now())

  useEffect(() => {
    openedAtRef.current = Date.now()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return createPortal(
    <div style={shellStyle} data-admin-modal-root>
      <div
        style={overlayStyle}
        onMouseDown={(event) => {
          if (event.target !== event.currentTarget) return
          if (Date.now() - openedAtRef.current < 280) return
          onBackdropClick?.()
        }}
        aria-hidden="true"
      />
      <div style={centerStyle}>
        <div style={panelWrapStyle}>{children}</div>
      </div>
    </div>,
    document.body,
  )
}
