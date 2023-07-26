import { useMutation } from 'react-query'
import AccountControl from '../UI/AccountControl'
import Loader from '../UI/Loader'
import Text from '../UI/Text'

import ProfilePictureModal from '../UI/modals/ProfilePictureModal'
import ProfilePicture from '../components/ProfilePicture'
import useDate from '../hooks/useDate'
import useModal from '../hooks/useModal'
import useUser from '../hooks/useUser'
import { deactivateAccountApi } from '../api/userApi'
import { useNavigate } from 'react-router-dom'

export default function Me() {
  const { data, isLoading } = useUser()
  const { dateToString } = useDate()
  const { isOpen, closeModal, openModal } = useModal()
  const deactivateAccountMutation = useMutation(deactivateAccountApi)
  const navigate = useNavigate()

  const deactivateAccount = async () => {
    const response = await deactivateAccountMutation.mutateAsync()

    if (response.success) {
      navigate('/login')
    }
  }

  return (
    <div>
      {!isLoading ? (
        <div>
          <Text type="h2">
            <strong className="text-primary">{data?.user?.username}</strong>
            &nbsp;settings account
          </Text>
          <ProfilePicture
            containerProps={{ className: 'd-flex justify-content-center' }}
            src={data?.user.profilePicture}
            alt="Profile picture"
            onClick={openModal}
          />
          <AccountControl className="mt-3" title="E-mail">
            <Text>{data?.user?.email}</Text>
          </AccountControl>
          <AccountControl title="Username">
            <Text>{data?.user?.username}</Text>
          </AccountControl>
          <AccountControl title="Created at">
            <Text>{dateToString(data?.user?.createdAt)}</Text>
          </AccountControl>
          <AccountControl title="E-mail verification">
            <Text
              className={data?.user.isVerified ? 'text-success' : 'text-danger'}
            >
              {data?.user?.isVerified
                ? 'Your E-mail is verfied'
                : 'Your E-mail is not verified'}
            </Text>
          </AccountControl>
        </div>
      ) : (
        <Loader className="d-flex justify-content-center align-items-center" />
      )}
      <ProfilePictureModal
        src={data?.user.profilePicture}
        isOpen={isOpen}
        close={closeModal}
      />
      <div className="d-flex justify-content-end gap-2 mt-3">
        <button className="btn btn-danger" onClick={deactivateAccount}>
          Deactivate account
        </button>
        <button className="btn btn-danger">Delete Account</button>
      </div>
    </div>
  )
}
