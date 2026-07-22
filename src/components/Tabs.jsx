import { TAB_ICONS } from '../config/constants'
import TabIcon from './TabIcon'

export default function Tabs({ tabs, activeTab, onTabChange, t }) {
  return (
    <nav className="tabs-container" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          data-tab={tab.id}
          className={`tab-btn${activeTab === tab.id ? ' active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="tab-icon">
            {TAB_ICONS[tab.id] ? <TabIcon tabId={tab.id} /> : tab.icon}
          </span>
          <span>{t(`tab.${tab.id}`)}</span>
        </button>
      ))}
    </nav>
  )
}
