import AreYouSureModal from '../UI/modals/AreYouSureModal'
import Button from '../UI/Button'
import useUserAccountActions from '../hooks/userAccountActions/useUserAccountActions'

export default function UserAccountActions() {
  const {
    handleChangePassword,
    deactivateAccountMutation,
    handleDeactivateClick,
    handleDeleteClick,
    deactivateAccount,
    deactivateModal,
    deleteAccount,
    deleteAccountMutation,
    deleteModal,
  } = useUserAccountActions()

  return (
    <div className="d-flex justify-content-end gap-2 mt-3">
      <Button onClick={handleChangePassword}>Change password</Button>
      <Button
        variant="danger"
        isLoading={deactivateAccountMutation.isLoading}
        onClick={handleDeactivateClick}
      >
        Deactivate account
      </Button>
      <Button
        isLoading={deactivateAccountMutation.isLoading}
        variant="danger"
        onClick={handleDeleteClick}
      >
        Delete Account
      </Button>
      <AreYouSureModal
        title="Are you sure you want to delete your account pernamently?"
        isOpen={deleteModal.isOpen}
        closeModal={deleteModal.closeModal}
        onYes={deleteAccount}
        isLoading={deleteAccountMutation.isLoading}
      />
      <AreYouSureModal
        title="Are you sure you want to deactivate your account?"
        isOpen={deactivateModal.isOpen}
        closeModal={deactivateModal.closeModal}
        onYes={deactivateAccount}
        isLoading={deactivateAccountMutation.isLoading}
      />
    </div>
  )
}
