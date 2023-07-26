import React, { useState } from 'react'

export default function useFile() {
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  )

  const isFileImage = (file: File): boolean => {
    return file && file['type'].split('/')[0] === 'image'
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0]

    if (!file) return setImagePreview(undefined)
    if (!isFileImage(file)) return setImagePreview(undefined)

    const reader = new FileReader()

    reader.onload = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const resetImagePreview = () => {
    setImagePreview(undefined)
  }

  return { handleImageChange, imagePreview, isFileImage, resetImagePreview }
}
