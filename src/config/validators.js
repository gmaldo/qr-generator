export const validators = {
  required: (value) => value && value.trim().length > 0,

  url: (value) => {
    if (!value || !value.trim()) return false
    try {
      const url = value.startsWith('http') ? value : 'https://' + value
      new URL(url)
      return true
    } catch {
      return false
    }
  },

  phone: (value) => {
    if (!value || !value.trim()) return false
    const digits = value.replace(/\D/g, '')
    return digits.length >= 8
  },

  email: (value) => {
    if (!value || !value.trim()) return false
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  },

  coordinates: (value) => {
    if (!value || !value.trim()) return false
    const num = parseFloat(value)
    return !isNaN(num) && isFinite(num)
  },
}

export function validateField(value, type) {
  switch (type) {
    case 'required': return validators.required(value)
    case 'url': return validators.url(value)
    case 'phone': return validators.phone(value)
    case 'email': return validators.email(value)
    case 'coordinates': return validators.coordinates(value)
    default: return true
  }
}
