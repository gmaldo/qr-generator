import { useState, useCallback } from 'react'
import { validateField } from '../../config/validators'

export default function useValidation() {
  const [errors, setErrors] = useState({})

  const validate = useCallback((field, value, type, errorMsg) => {
    const isValid = validateField(value, type)
    setErrors(prev => {
      if (isValid) {
        const next = { ...prev }
        delete next[field]
        return next
      }
      return { ...prev, [field]: errorMsg }
    })
    return isValid
  }, [])

  const clearErrors = useCallback(() => setErrors({}), [])

  const hasErrors = Object.keys(errors).length > 0

  return { errors, validate, clearErrors, hasErrors }
}
