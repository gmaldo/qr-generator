export const TABS = [
  { id: 'website', icon: '🌐' },
  { id: 'wifi', icon: '📶' },
  { id: 'text', icon: '📝' },
  { id: 'whatsapp', icon: '💬' },
  { id: 'email', icon: '📧' },
  { id: 'phone', icon: '📞' },
  { id: 'sms', icon: '✉️' },
  { id: 'vcard', icon: '👤' },
  { id: 'location', icon: '📍' },
]

export const WIFI_SECURITY = ['WPA', 'WEP', 'nopass']

export const PRESETS = [
  {
    id: 'classic',
    label: 'Clásico',
    dotsType: 'square',
    cornersSquareType: 'square',
    cornersDotType: 'square',
  },
  {
    id: 'rounded',
    label: 'Redondeado',
    dotsType: 'rounded',
    cornersSquareType: 'extra-rounded',
    cornersDotType: 'dot',
  },
  {
    id: 'dots',
    label: 'Puntos',
    dotsType: 'dots',
    cornersSquareType: 'dot',
    cornersDotType: 'dot',
  },
  {
    id: 'classy',
    label: 'Elegante',
    dotsType: 'classy',
    cornersSquareType: 'square',
    cornersDotType: 'square',
  },
  {
    id: 'classy-rounded',
    label: 'Mixto',
    dotsType: 'classy-rounded',
    cornersSquareType: 'extra-rounded',
    cornersDotType: 'dot',
  },
  {
    id: 'extra-rounded',
    label: 'Fluido',
    dotsType: 'extra-rounded',
    cornersSquareType: 'extra-rounded',
    cornersDotType: 'dot',
  },
]

export const QR_SIZE = 220

export const FOCUS_CLASSES = {
  wifi: 'focus-cyan',
  website: 'focus-violet',
  text: 'focus-amber',
  whatsapp: 'focus-green',
  email: 'focus-rose',
  phone: 'focus-teal',
  sms: 'focus-violet',
  vcard: 'focus-blue',
  location: 'focus-amber',
}
