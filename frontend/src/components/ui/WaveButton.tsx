import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface WaveButtonProps {
  to: string
  children: ReactNode
  className?: string
  style?: CSSProperties
  onClick?: () => void
}

export function WaveButton({ to, children, className = '', style, onClick }: WaveButtonProps) {
  const mergedStyle: CSSProperties = {
    ...style,
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const classes = `gecko-wave-btn ${className}`.trim()

  const inner = (
    <>
      <span className="gecko-wave-text">{children}</span>
      <span className="gecko-wave-fill" aria-hidden="true" />
    </>
  )

  if (to.startsWith('http') || to.startsWith('//')) {
    return (
      <a href={to} className={classes} style={mergedStyle} onClick={onClick}>
        {inner}
      </a>
    )
  }

  return (
    <Link to={to} className={classes} style={mergedStyle} onClick={onClick}>
      {inner}
    </Link>
  )
}
