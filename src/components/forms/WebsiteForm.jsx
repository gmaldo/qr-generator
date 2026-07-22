import ValidatedField from './ValidatedField'
import useValidation from './useValidation'

export default function WebsiteForm({ data, setData, t, ic }) {
  const { errors, validate } = useValidation()

  return (
    <div className="form-section">
      <ValidatedField label={t('website.url')} error={errors.url}>
        <input type="text" value={data.url}
          onChange={e => setData({ url: e.target.value })}
          onBlur={e => validate('url', e.target.value, 'url', t('error.invalid_url'))}
          placeholder={t('website.url_ph')} className={`${ic}${errors.url ? ' field-invalid' : ''}`}
          autoCorrect="off" autoCapitalize="none" spellCheck="false" autoComplete="off" />
      </ValidatedField>
    </div>
  )
}
