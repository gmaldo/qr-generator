export default function Footer({ t }) {
  return (
    <footer className="app-footer anim-fade-up anim-fade-up-d3">
      <span className="footer-text">QR Generator</span>
      <div className="footer-dot" />
      <span className="footer-text">{t('footer.powered')}</span>
    </footer>
  )
}
