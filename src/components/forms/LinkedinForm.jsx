import ValidatedField from './ValidatedField'
import useValidation from './useValidation'

export default function LinkedinForm({ data, setData, t, ic }) {
  const { errors, validate } = useValidation()

  return (
    <div className="form-section">
      <div className="field-group">
        <label className="field-label">{t('linkedin.type')}</label>
        <div className="security-group">
          <button
            onClick={() => setData({ ...data, type: 'profile' })}
            className={`sec-btn${data.type === 'profile' ? ' sec-active' : ''}`}
          >
            {t('linkedin.profile')}
          </button>
          <button
            onClick={() => setData({ ...data, type: 'company' })}
            className={`sec-btn${data.type === 'company' ? ' sec-active' : ''}`}
          >
            {t('linkedin.company')}
          </button>
        </div>
      </div>

      <ValidatedField label={t('linkedin.username')} error={errors.username}>
        <input type="text" value={data.username}
          onChange={e => setData({ ...data, username: e.target.value })}
          onBlur={e => validate('username', e.target.value, 'required', t('error.required'))}
          placeholder={data.type === 'company' ? t('linkedin.company_ph') : t('linkedin.username_ph')}
          className={`${ic}${errors.username ? ' field-invalid' : ''}`}
          autoCorrect="off" autoCapitalize="none" spellCheck="false" autoComplete="off" />
      </ValidatedField>

      <p className="field-hint">{t('linkedin.hint')}</p>
    </div>
  )
}
