import Button from '../Button'
import CloseButton from '../CloseButton'
import Text from '../Text'
import Modal, { ModalProps } from './Modal'

interface AreYouSureModalProps extends Omit<ModalProps, 'children'> {
  onYes: () => Promise<void>
  closeModal: () => void
  title?: string
  text: string
  isLoading?: boolean
}

export default function AreYouSureModal({
  onYes,
  closeModal,
  title = 'Are you sure?',
  text,
  isLoading,
  ...rest
}: AreYouSureModalProps) {
  const handleOnYes = async () => {
    await onYes()
    closeModal()
  }

  return (
    <Modal className="modal-dialog-centered" {...rest}>
      <div className="modal-header bg-primary">
        <Text type="h5" className="modal-title text-light">
          {title}
        </Text>
        <CloseButton onClick={closeModal} />
      </div>
      <div className="modal-body">
        <Text className="text-center">{text}</Text>
      </div>
      <div className="modal-footer">
        <Button
          variant="danger"
          data-bs-dismiss="modal"
          onClick={closeModal}
        >
          Close
        </Button>
        <Button isLoading={isLoading} onClick={handleOnYes}>
          Yes
        </Button>
      </div>
    </Modal>
  )
}
