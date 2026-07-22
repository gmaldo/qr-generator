import ValidatedField from './ValidatedField'
import useValidation from './useValidation'

export default function EmailForm({ data, setData, t, ic, tc }) {
  const { errors, validate } = useValidation()

  return (
    <div className="form-section">
      <ValidatedField label={t('email.to')} error={errors.to}>
        <input type="email" value={data.to}
          onChange={e => setData({ ...data, to: e.target.value })}
          onBlur={e => validate('to', e.target.value, 'email', t('error.invalid_email'))}
          placeholder={t('email.to_ph')} className={`${ic}${errors.to ? ' field-invalid' : ''}`} />
      </ValidatedField>
      <div className="field-group">
        <label className="field-label">{t('email.subject')}</label>
        <input type="text" value={data.subject}
          onChange={e => setData({ ...data, subject: e.target.value })}
          placeholder={t('email.subject_ph')} className={ic} />
      </div>
      <div className="field-group">
        <label className="field-label">{t('email.body')}</label>
        <textarea value={data.body}
          onChange={e => setData({ ...data, body: e.target.value })}
          placeholder={t('email.body_ph')} rows={4} className={tc} />
      </div>
    </div>
  )
}
