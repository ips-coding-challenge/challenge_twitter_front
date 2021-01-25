import * as yup from 'yup'

export const addTweetSchema = yup.object().shape({
  body: yup.string().trim().required(),
  hashtags: yup
    .array()
    .of(yup.string().matches(/^#[\w]+/))
    .nullable(),
  url: yup.string().url().nullable(),
})
