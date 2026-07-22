import { WIFI_SECURITY } from '../../config/constants'
import ValidatedField from './ValidatedField'
import useValidation from './useValidation'

export default function WifiForm({ data, setData, t, ic }) {
  const { errors, validate } = useValidation()

  return (
    <div className="form-section">
      <ValidatedField label={t('wifi.ssid')} error={errors.ssid}>
        <input type="text" value={data.ssid}
          onChange={e => setData({ ...data, ssid: e.target.value })}
          onBlur={e => validate('ssid', e.target.value, 'required', t('error.required'))}
          placeholder={t('wifi.ssid_ph')} className={`${ic}${errors.ssid ? ' field-invalid' : ''}`}
          autoCorrect="off" autoCapitalize="none" spellCheck="false" autoComplete="off" />
      </ValidatedField>
      <div className="field-group">
        <label className="field-label">{t('wifi.password')}</label>
        <input type="text" value={data.password}
          onChange={e => setData({ ...data, password: e.target.value })}
          placeholder={t('wifi.password_ph')} className={ic}
          autoCorrect="off" autoCapitalize="none" spellCheck="false" autoComplete="off" />
      </div>
      <div className="field-group">
        <label className="field-label">{t('wifi.security')}</label>
        <div className="security-group">
          {WIFI_SECURITY.map(sec => (
            <button key={sec} onClick={() => setData({ ...data, security: sec })}
              className={`sec-btn${data.security === sec ? ' sec-active' : ''}`}>
              {sec === 'nopass' ? t('wifi.open') : sec}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
