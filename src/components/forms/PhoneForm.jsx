export default function PhoneForm({ data, setData, t, ic }) {
  return (
    <div className="form-section">
      <div className="field-group">
        <label className="field-label">{t('phone.number')}</label>
        <input type="tel" value={data.number}
          onChange={e => setData({ number: e.target.value })}
          placeholder={t('phone.ph')} className={ic} />
      </div>
      <p className="field-hint">{t('phone.hint')}</p>
    </div>
  )
}
