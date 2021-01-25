import * as yup from 'yup'

export const addTweetSchema = yup.object().shape({
  body: yup.string().trim().max(380).required(),
  hashtags: yup
    .array()
    .of(yup.string().matches(/^#[\w]+/))
    .nullable(),
  url: yup.string().url().nullable(),
})
