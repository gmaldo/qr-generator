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
          <span className="tab-icon">{tab.icon}</span>
          <span>{t(`tab.${tab.id}`)}</span>
        </button>
      ))}
    </nav>
  )
}
