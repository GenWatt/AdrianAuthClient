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
import Button from '../UI/Button'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { sendConfirmEmail } from '../api/userApi'
import useError from '../hooks/useError'

export default function Me() {
  const { data, isLoading } = useUser()
  const { dateToString } = useDate()
  const { isOpen, closeModal, openModal } = useModal()
  const navigate = useNavigate()
  const { handleError } = useError()
  const userData = useUser()
  const sendVerificationEmailMutation = useMutation(sendConfirmEmail, {
    onError: handleError,
  })

  const goToVerifyPage = async () => {
    const email = userData.data?.user?.email
    if (!email) return

    await sendVerificationEmailMutation.mutateAsync(email)

    navigate('/confirm-email?email=' + email, { replace: true })
  }

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
            <div className='d-flex gap-2 align-items-center'>
              <Text
                className={data?.user.isVerified ? 'text-success' : 'text-danger'}
              >
                {data?.user?.isVerified
                  ? 'Your E-mail is verfied'
                  : 'Your E-mail is not verified' }
              </Text>
              {!data?.user?.isVerified && <Button onClick={goToVerifyPage}>Verfiy now!</Button>}
            </div>
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
