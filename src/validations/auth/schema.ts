import * as yup from 'yup'

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .matches(
      /^[\w]{2,30}$/,
      'The username should only contains alphanumeric characters and should have a length between 2 to 30'
    )
    .required(),
  email: yup.string().trim().email().required(),
  display_name: yup
    .string()
    .trim()
    .matches(
      /^[\w\s]{2,30}$/,
      'The display name should only contains alphanumeric characters and should have a length between 2 to 30'
    )
    .required(),
  password: yup.string().min(6).required(),
})
