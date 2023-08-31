import React from 'react'

export interface BackgroundImageOverlayProps {
  children: React.ReactNode
  handleModalClick: () => void
}

export default function BackgroundImageOverlay({
  children,
  handleModalClick,
}: BackgroundImageOverlayProps) {
  return (
    <div
      onClick={handleModalClick}
      className="w-100 h-100 position-absolute top-0 p-2 pointer d-flex gap-2"
      style={{ backgroundColor: 'rgba(0,0,0, 0.5)' }}
    >
      {children}
    </div>
  )
}
