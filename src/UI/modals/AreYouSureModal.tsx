import Button from '../Button'
import Text from '../Text'
import Modal, { ModalProps } from './Modal'

interface AreYouSureModalProps extends Omit<ModalProps, 'children'> {
  onYes: () => Promise<void>
  closeModal: () => void
  title: string
  isLoading?: boolean
}

export default function AreYouSureModal({
  onYes,
  closeModal,
  title,
  isLoading,
  ...rest
}: AreYouSureModalProps) {
  const handleOnYes = async () => {
    await onYes()
    closeModal()
  }

  return (
    <Modal className="modal-dialog-centered" {...rest}>
      <div className="modal-body">
        <Text className="text-center">{title}</Text>
      </div>
      <div className="modal-footer">
        <Button
          variant="secondary"
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
