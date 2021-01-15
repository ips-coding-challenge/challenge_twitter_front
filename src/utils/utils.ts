import { ApolloError } from '@apollo/client'

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
