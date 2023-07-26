import { useContext } from 'react'
import Modal, { ModalProps } from './Modal'
import Text from '../Text'
import InputControl from '../InputControl'
import ProfilePicture from '../../components/ProfilePicture'
import { useRef } from 'react'
import useFile from '../../hooks/useFile'
import { useMutation, useQueryClient } from 'react-query'
import { setUserProfileImage } from '../../api/userApi'
import { ToastContext } from '../../context/ToastContext'
import { IProfilePictureResponse } from '../../types'
import { AxiosError } from 'axios'

interface ProfilePictureModalProps extends Omit<ModalProps, 'children'> {
  close: () => void
  src?: string
}

export default function ProfilePictureModal({
  src,
  close,
  ...rest
}: ProfilePictureModalProps) {
  const { handleImageChange, imagePreview, resetImagePreview } = useFile()
  const toastContext = useContext(ToastContext)
  const queryClient = useQueryClient()
  const imageRef = useRef<HTMLInputElement>(null)

  const handleError = (error: AxiosError) => {
    toastContext?.addErrorToast({ message: error.message })
  }

  const imageMutation = useMutation<IProfilePictureResponse, AxiosError, any>(
    setUserProfileImage,
    {
      onError: handleError,
    }
  )
  const handleProfileClick = () => {
    imageRef.current?.click()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!imageRef.current?.files?.[0])
      return toastContext?.addErrorToast({ message: 'Please select a file' })

    const response = await imageMutation.mutateAsync(imageRef.current.files[0])

    if (response.success) {
      toastContext?.addSuccessToast({
        message: response.message,
      })

      close()
      resetImagePreview()
      imageRef.current.form?.reset()
      queryClient.invalidateQueries('user')
    }
  }

  return (
    <Modal className="modal-dialog-centered" {...rest}>
      <div className="modal-header bg-primary">
        <Text type="h5" className="modal-title text-light">
          Profile Picture
        </Text>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={close}
        ></button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <div className="d-flex justify-content-center">
            <ProfilePicture
              src={imagePreview ? imagePreview : src}
              onClick={handleProfileClick}
            />
          </div>

          <InputControl
            ref={imageRef}
            type="file"
            label="Choose Profile Picture"
            name="profilePicture"
            onChange={handleImageChange}
            multiple={false}
            accept="image/png, image/jpeg, image/jpg"
          />
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={close}
          >
            Close
          </button>
          <button
            disabled={imageMutation.isLoading}
            type="submit"
            className="btn btn-primary text-light"
          >
            Save changes
          </button>
        </div>
      </form>
    </Modal>
  )
}
