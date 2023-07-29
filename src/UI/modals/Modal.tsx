import React from 'react'

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  isOpen: boolean
}

export default function Modal({
  children,
  className,
  isOpen,
  ...rest
}: ModalProps) {
  return (
    <div
      className={`modal fade ${isOpen ? `${className} show` : ''}`}
      tabIndex={-1}
      {...rest}
    >
      <div className="modal-dialog">
        <div className="modal-content bg-headline">{children}</div>
      </div>
    </div>
  )
}
