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
