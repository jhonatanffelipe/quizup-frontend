export default function getValidationError(err) {
  const validationError = {}

  err.inner.forEach((error) => {
    validationError[error.path ? error.path : 'key'] = error.message
  })

  return validationError
}
