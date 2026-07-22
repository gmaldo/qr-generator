export default function VcardForm({ data, setData, t, ic }) {
  return (
    <div className="form-section">
      <div className="field-group">
        <label className="field-label">{t('vcard.name')}</label>
        <input type="text" value={data.name}
          onChange={e => setData({ ...data, name: e.target.value })}
          placeholder={t('vcard.name_ph')} className={ic} />
      </div>
      <div className="field-group">
        <label className="field-label">{t('vcard.phone')}</label>
        <input type="tel" value={data.phone}
          onChange={e => setData({ ...data, phone: e.target.value })}
          placeholder={t('phone.ph')} className={ic} />
      </div>
      <div className="field-group">
        <label className="field-label">{t('vcard.email')}</label>
        <input type="email" value={data.email}
          onChange={e => setData({ ...data, email: e.target.value })}
          placeholder={t('email.to_ph')} className={ic} />
      </div>
      <div className="field-group">
        <label className="field-label">{t('vcard.org')}</label>
        <input type="text" value={data.org}
          onChange={e => setData({ ...data, org: e.target.value })}
          placeholder={t('vcard.org_ph')} className={ic} />
      </div>
      <div className="field-group">
        <label className="field-label">{t('vcard.url')}</label>
        <input type="text" value={data.url}
          onChange={e => setData({ ...data, url: e.target.value })}
          placeholder={t('vcard.url_ph')} className={ic} />
      </div>
    </div>
  )
}
