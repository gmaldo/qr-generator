import { TAB_ICONS } from '../config/constants'

export default function TabIcon({ tabId }) {
  const icon = TAB_ICONS[tabId]
  if (!icon) return null
  return (
    <svg viewBox={icon.viewBox} width="16" height="16" fill="currentColor">
      <path d={icon.path} />
    </svg>
  )
}
