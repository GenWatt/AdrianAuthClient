import Header from '../UI/Header'
import { useSearchParams } from 'react-router-dom'

export default function () {
  const [searchParams] = useSearchParams()

  return (
    <>
      <Header
        text="Confirm your E-mail -"
        headlineText={searchParams.get('email')!}
      ></Header>

      <p className="fs-3 text-center">
        We will send confirmation mail to your E-mail
      </p>
    </>
  )
}
