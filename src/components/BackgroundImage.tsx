import { useEffect, useState, useRef, useContext } from "react"
import Text from "../UI/Text"
import Button from "../UI/Button"
import { useMutation, useQueryClient } from "react-query"
import { AxiosError } from "axios"
import useError from "../hooks/useError"
import { IProfilePictureResponse } from "../types"
import { ToastContext } from "../context/ToastContext"
import { setUserCoverImage } from "../api/userApi"

interface BackgroundImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string | undefined
    alt: string
}

export default function BackgroundImage({ src, alt, ...rest} : BackgroundImageProps) {  
  const [isHovering, setIsHovering] = useState(false)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const toastContext = useContext(ToastContext)
  const queryClient = useQueryClient()
  const { handleError } = useError()

  const handleImageUploadError = (error: AxiosError<unknown, any>) => { 
    handleError(error)
    resetInput()
  }

  const resetInput = () => {
    if (inputRef.current) inputRef.current.value = ''
  }

  const coverImageMutation = useMutation<IProfilePictureResponse, AxiosError, any>(
    setUserCoverImage,
    {
      onError: handleImageUploadError,
    }
  )
  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const handleModalClick = () => {
    inputRef.current?.click()
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (!inputRef.current?.files?.[0]) return

    const response = await coverImageMutation.mutateAsync(inputRef.current.files[0])

    if (response.success) {
      toastContext?.addSuccessToast({
        message: response.message,
      })

      resetInput()
      queryClient.invalidateQueries('user')
    }
  }

  useEffect(() => {
    if (!modalRef.current) return
    modalRef.current.addEventListener('mousemove', handleMouseEnter)
    modalRef.current.addEventListener('mouseleave', handleMouseLeave)
  
    return () => {
      if (!modalRef.current) return
      modalRef.current.removeEventListener('mouseenter', handleMouseEnter)
      modalRef.current.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])
  
  return (
    <div ref={modalRef} className="position-absolute w-100 h-100" {...rest}>
      {src ? <img 
          src={src}
          alt={alt}
          className="w-100 h-100"
          /> : 
      <div  className="bg-primary d-flex h-100 p-2 rounded-2">
          <Text className="text-light">{alt}</Text>
      </div>}

      {isHovering && 
        <div 
          onClick={handleModalClick} 
          className="w-100 h-100 position-absolute top-0 p-2 pointer" 
          style={{ backgroundColor: "rgba(0,0,0, 0.5)" }}>

        {src ? <Button>Update your cover image</Button> : <Button>Upload a cover image</Button>}
      </div>}

      <input 
        ref={inputRef} 
        type="file" 
        disabled={coverImageMutation.isLoading}
        onChange={handleSubmit} 
        hidden 
        accept="image/png, image/jpeg, image/jpg" />
    </div>
  )
}
