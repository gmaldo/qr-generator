import ValidatedField from './ValidatedField'
import useValidation from './useValidation'

export default function InstagramForm({ data, setData, t, ic }) {
  const { errors, validate } = useValidation()

  return (
    <div className="form-section">
      <ValidatedField label={t('instagram.username')} error={errors.username}>
        <input type="text" value={data.username}
          onChange={e => setData({ ...data, username: e.target.value })}
          onBlur={e => validate('username', e.target.value, 'required', t('error.required'))}
          placeholder={t('instagram.username_ph')} className={`${ic}${errors.username ? ' field-invalid' : ''}`}
          autoCorrect="off" autoCapitalize="none" spellCheck="false" autoComplete="off" />
      </ValidatedField>
      <p className="field-hint">{t('instagram.hint')}</p>
    </div>
  )
}
