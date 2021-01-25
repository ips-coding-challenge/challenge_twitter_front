import { ApolloError } from '@apollo/client'
import { format } from 'date-fns'

export const formatValidationErrors = (errors: any) => {
  let newErrors: any = []
  if (errors[0].message !== 'Argument Validation Error') {
    return errors[0]
  }
  const validationErrors = errors[0].extensions.exception?.validationErrors

  validationErrors.forEach((error: any) => {
    const field = error.property
    const constraints = error.constraints
    newErrors.push({
      field,
      message: Object.values(constraints)[0],
    })
  })

  return newErrors
}

export const handleErrors = (e: any) => {
  let errors = []
  if (e instanceof ApolloError) {
    if (
      e.graphQLErrors &&
      e.graphQLErrors[0].message === 'Argument Validation Error'
    ) {
      errors.push(formatValidationErrors(e.graphQLErrors))
    } else {
      errors.push(e)
    }
  } else {
    errors.push(e)
  }
  return errors
}

export const avatarInitials = (display_name: string) => {
  const split = display_name.split(' ')
  if (split.length === 1) {
    return display_name.slice(0, 2).toUpperCase()
  } else {
    return `${split[0].slice(0, 1)}${split[1].slice(0, 1)}`.toUpperCase()
  }
}

export const formattedDate = (date: string): string => {
  return format(new Date(date), "d MMMM 'at' HH:mm")
}

export const pluralize = (count: number, str: string): string => {
  if (count > 0) {
    str += 's'
  }
  return `${count} ${str}`
}
// Parse the tweet to extract hashtags and the first url ( for the link's preview )
export const parseTweet = (body: string) => {
  let hashtags = body.match(/(#[\w]+)/g)

  const urls = body.match(
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/g
  )

  let url
  // Only do a preview for the first link
  if (urls && urls.length > 0) {
    url = urls[0]
  }

  // Remove duplicates
  if (hashtags && hashtags?.length > 0) {
    hashtags = Array.from(new Set(hashtags))
  }
  return {
    hashtags,
    url,
  }
}
