import * as Yup from 'yup'
import { shouldNotContainLettersAndNumbers, shouldNotContainSpaces } from '.'
import { IPasswordRules } from '../types'

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3)
    .max(20)
    .required('Username is required')
    .test('no-spaces', 'Username cannot contain spaces', shouldNotContainSpaces)
    .test(
      'letters-and-numbers',
      'Username can contain only letters and numbers',
      shouldNotContainLettersAndNumbers
    ),
  email: Yup.string().email('Invalid email').required('E-mail is required'),
  password: Yup.string().min(3).required('Password is required'),
})

export const passwordRules: IPasswordRules = {
  minLength: 3,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 0,
}

export default RegisterSchema
