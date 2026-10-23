import { useState } from 'react'
import TabIcon from './TabIcon'

// The everyday types stay pinned; the long tail hides behind "more".
const PRIMARY_COUNT = 4

export default function Tabs({ tabs, activeTab, onTabChange, t }) {
  const [expanded, setExpanded] = useState(false)
  const primary = tabs.slice(0, PRIMARY_COUNT)
  const secondary = tabs.slice(PRIMARY_COUNT)

  // Keep the selected tab mounted even while the list is collapsed, or its
  // active state would silently vanish from the bar.
  const visible = expanded
    ? tabs
    : primary.concat(secondary.filter(tab => tab.id === activeTab))

  return (
    <nav className="tabs-container" role="tablist">
      {visible.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          data-tab={tab.id}
          className={`tab-btn${activeTab === tab.id ? ' active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="tab-icon">
            <TabIcon tabId={tab.id} />
          </span>
          <span>{t(`tab.${tab.id}`)}</span>
        </button>
      ))}
      <button
        type="button"
        className={`tab-btn tab-more${expanded ? ' open' : ''}`}
        aria-expanded={expanded}
        onClick={() => setExpanded(e => !e)}
      >
        <span className="tab-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
        </span>
        <span>{expanded ? t('tabs.less') : `${t('tabs.more')} +${secondary.length}`}</span>
      </button>
    </nav>
  )
}
