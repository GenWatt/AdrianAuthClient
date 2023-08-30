import React, { useEffect, useRef, useState } from 'react'
import NoUserImage from '../assets/noUserImage.jpg'

interface ProfilePictureProps extends React.HTMLAttributes<HTMLImageElement> {
  src?: string
  alt?: string
  containerProps?: React.HTMLAttributes<HTMLDivElement>
  imageContainerStyles?: React.CSSProperties
  isModal?: boolean
}

export default function ProfilePicture({
  src,
  alt,
  containerProps,
  imageContainerStyles,
  onClick,
  isModal = false,
  ...rest
}: ProfilePictureProps) {
  const [isHovering, setIsHovering] = useState(false)
  const modalRef = useRef<HTMLDivElement | null>(null)

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  useEffect(() => {
    if (!modalRef.current) return

    modalRef.current.addEventListener('mouseenter', handleMouseEnter)
    modalRef.current.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      modalRef.current?.removeEventListener('mouseenter', handleMouseEnter)
      modalRef.current?.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div {...containerProps}>
      <div
        ref={modalRef}
        className="bg-primary rounded-circle d-flex justify-content-center align-items-center"
        style={{ cursor: 'pointer', width: 200, height: 200, ...imageContainerStyles }}
        onClick={onClick}
      >
        <img
          className="w-100 h-100 rounded-circle d-flex justify-content-center align-items-center"
          src={src ? src : NoUserImage}
          alt={alt ? alt : 'Profile picture'}
          {...rest}
        />
        {isHovering && isModal && <div className="w-100 h-100 position-absolute rounded-circle" style={{ backgroundColor: 'rgba(0,0,0, 0.5)' }}>

        </div>}
      </div>
    </div>
  )
}
