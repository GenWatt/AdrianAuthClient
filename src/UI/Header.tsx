import React from 'react'

interface HeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
  text: string
  headlineText?: string
  headlineClassName?: string
}

export default function Header({
  text,
  headlineText,
  headlineClassName,
  className,
  ...rest
}: HeaderProps) {
  return (
    <header>
      <h1
        className={`${className} fs-1 fw-bold text-center text-uppercase`}
        {...rest}
      >
        {text}
        {headlineText && (
          <span className={`text-primary ${headlineClassName}`}>
            {headlineText}
          </span>
        )}
      </h1>
    </header>
  )
}
