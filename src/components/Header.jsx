import { SUPPORTED_LANGS } from '../i18n'

export default function Header({ t, lang, setLang }) {
  return (
    <header className="header anim-fade-up">
      <div className="logo-icon">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
          />
        </svg>
      </div>
      <div className="badge">{t('header.badge')}</div>
      <h1 className="app-title">{t('header.title')}</h1>
      <p className="app-subtitle">{t('header.subtitle')}</p>
      <div className="lang-selector">
        {SUPPORTED_LANGS.map(l => (
          <button
            key={l.code}
            className={`lang-btn${lang === l.code ? ' active' : ''}`}
            onClick={() => setLang(l.code)}
          >
            {l.label}
          </button>
        ))}
      </div>
    </header>
  )
}
