import * as Yup from 'yup'

const NewPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm Password is required'),
})

export default NewPasswordSchema
