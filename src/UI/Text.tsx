import React from 'react'
import Loader from './Loader'

export type TextType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'caption'
  | 'body2'

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode
  isLoading?: boolean
  type?: TextType
}

export default function ({
  children,
  isLoading,
  className,
  type = 'body1',
  ...rest
}: TextProps) {
  const classes = `text-${type} ${className}`

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <p className={classes} {...rest}>
          {children}
        </p>
      )}
    </>
  )
}
