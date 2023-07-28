import React from 'react'
import { XSquare } from 'react-bootstrap-icons'

interface CloseButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export default function CloseButton({ className, ...rest }: CloseButtonProps) {
  const classes = () => {
    const fullClass = `btn text-light p-0 m-0 ${className}`

    return fullClass
  }

  return (
    <button className={classes()} aria-label="Close" {...rest}>
      <XSquare size={28} />
    </button>
  )
}
