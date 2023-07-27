import AccountControl from '../UI/AccountControl'
import Loader from '../UI/Loader'
import Text from '../UI/Text'

import ProfilePictureModal from '../UI/modals/ProfilePictureModal'
import ProfilePicture from '../components/ProfilePicture'
import useDate from '../hooks/useDate'
import useModal from '../hooks/useModal'
import useUser from '../hooks/useUser'
import UserAccountActions from '../components/UserAccountActions'

export default function Me() {
  const { data, isLoading } = useUser()
  const { dateToString } = useDate()
  const { isOpen, closeModal, openModal } = useModal()

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
          <UserAccountActions />
        </div>
      ) : (
        <Loader className="d-flex justify-content-center align-items-center" />
      )}
      <ProfilePictureModal
        src={data?.user.profilePicture}
        isOpen={isOpen}
        close={closeModal}
      />
    </div>
  )
}
