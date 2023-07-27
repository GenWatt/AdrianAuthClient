import React from 'react'
import NoUserImage from '../assets/noUserImage.jpg'

interface ProfilePictureProps extends React.HTMLAttributes<HTMLImageElement> {
  src?: string
  alt?: string
  containerProps?: React.HTMLAttributes<HTMLDivElement>
}

export default function ProfilePicture({
  src,
  alt,
  containerProps,
  onClick,
  ...rest
}: ProfilePictureProps) {
  return (
    <div {...containerProps}>
      <div
        className="bg-primary rounded-circle d-flex justify-content-center align-items-center"
        style={{ cursor: 'pointer', width: 200, height: 200 }}
        onClick={onClick}
      >
        <img
          className="w-100 h-100 rounded-circle d-flex justify-content-center align-items-center"
          src={src ? src : NoUserImage}
          alt={alt ? alt : 'Profile picture'}
          {...rest}
        />
      </div>
    </div>
  )
}
