import { useContext } from 'react'
import { useMutation } from 'react-query'

import { useNavigate } from 'react-router-dom'
import { deleteAccountApi, deactivateAccountApi } from '../../api/userApi'
import { ToastContext } from '../../context/ToastContext'
import useError from '../useError'
import useModal from '../useModal'

export default function useUserAccountActions() {
  const toastContext = useContext(ToastContext)
  const navigate = useNavigate()
  const { handleError } = useError()
  const deleteModal = useModal()
  const deactivateModal = useModal()

  const deleteAccountMutation = useMutation(deleteAccountApi, {
    onError: handleError,
  })

  const deactivateAccountMutation = useMutation(deactivateAccountApi, {
    onError: handleError,
  })

  const deactivateAccount = async () => {
    const response = await deactivateAccountMutation.mutateAsync()

    if (response.success) {
      navigate('/login')
      toastContext?.addSuccessToast({
        message: response.message,
        group: 'deactivate',
        unique: true,
      })
    }
  }

  const deleteAccount = async () => {
    const response = await deleteAccountMutation.mutateAsync()

    if (response.success) {
      navigate('/login')
      toastContext?.addSuccessToast({
        message: response.message,
        group: 'delete',
        unique: true,
      })
    }
  }

  const handleDeleteClick = () => {
    deleteModal.openModal()
  }

  const handleDeactivateClick = () => {
    deactivateModal.openModal()
  }

  const handleChangePassword = () => {
    navigate('/reset-password')
  }
  return {
    handleChangePassword,
    handleDeactivateClick,
    handleDeleteClick,
    deleteAccount,
    deactivateAccount,
    deleteAccountMutation,
    deactivateAccountMutation,
    deactivateModal,
    deleteModal,
  }
}
