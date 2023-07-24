import React from 'react'
import Loader from './Loader'

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode
  isLoading?: boolean
}

export default function ({ children, isLoading, ...rest }: TextProps) {
  return <>{isLoading ? <Loader /> : <p {...rest}>{children}</p>}</>
}
