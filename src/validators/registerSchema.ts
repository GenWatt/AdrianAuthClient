import * as Yup from 'yup'

const RegisterSchema = Yup.object().shape({
  username: Yup.string().min(3).max(20).required('Username is required'),
  email: Yup.string().email('Invalid email').required('E-mail is required'),
  password: Yup.string().min(3).required('Password is required'),
})

export default RegisterSchema
