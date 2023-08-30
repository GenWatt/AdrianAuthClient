import AccountControl from '../UI/AccountControl'
import Loader from '../UI/Loader'
import Text from '../UI/Text'

import ProfilePictureModal from '../UI/modals/ProfilePictureModal'
import ProfilePicture from '../components/ProfilePicture'
import useDate from '../hooks/useDate'
import useModal from '../hooks/useModal'
import useUser from '../hooks/useUser'
import UserAccountActions from '../components/UserAccountActions'
import BackgroundImage from '../components/BackgroundImage'

export default function Me() {
  const { data, isLoading } = useUser()
  const { dateToString } = useDate()
  const { isOpen, closeModal, openModal } = useModal()

  return (
    <div>
      {!isLoading ? (
        <div>
          <Text className="mt-2" type="h2">
            <strong className="text-primary">{data?.user?.username}</strong>
            &nbsp;settings account
          </Text>
          <div className='position-relative'>
            <BackgroundImage style={{ zIndex: 1 }} src={data?.user.coverPicture} alt="No cover image" />
            <ProfilePicture
              containerProps={{ className: 'd-flex justify-content-center mt-3' }}
              imageContainerStyles={{ zIndex: 2, position: 'relative' }}
              src={data?.user.profilePicture}
              alt="Profile picture"
              isModal={true}
              onClick={openModal}
            />
          </div>
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
