import React from 'react'
import Text from './Text'

interface AccountControlProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  children: React.ReactNode
}

export default function AccountControl({
  title,
  children,
  className,
  ...rest
}: AccountControlProps) {
  return (
    <div
      className={`d-flex justify-content-between mb-2 ${className}`}
      {...rest}
    >
      <div className="d-flex">
        <div className="vr" style={{ width: 2 }}></div>
        <Text className="fw-bold ms-2">{title}</Text>
      </div>

      <div>{children}</div>
    </div>
  )
}
