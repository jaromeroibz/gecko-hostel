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
  const classes = `gecko-wave-btn ${className}`.trim()

  if (to.startsWith('http') || to.startsWith('//')) {
    return (
      <a href={to} className={classes} style={style} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <Link to={to} className={classes} style={style} onClick={onClick}>
      {children}
    </Link>
  )
}
