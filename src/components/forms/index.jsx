import WifiForm from './WifiForm'
import WebsiteForm from './WebsiteForm'
import TextForm from './TextForm'
import WhatsAppForm from './WhatsAppForm'
import EmailForm from './EmailForm'
import PhoneForm from './PhoneForm'
import SmsForm from './SmsForm'
import VcardForm from './VcardForm'
import LocationForm from './LocationForm'

const FORM_MAP = {
  wifi: WifiForm,
  website: WebsiteForm,
  text: TextForm,
  whatsapp: WhatsAppForm,
  email: EmailForm,
  phone: PhoneForm,
  sms: SmsForm,
  vcard: VcardForm,
  location: LocationForm,
}

export default function FormSwitch({ activeTab, formData, setFormData, t, ic, tc }) {
  const FormComponent = FORM_MAP[activeTab]
  if (!FormComponent) return null

  return (
    <div className="form-section">
      <FormComponent data={formData} setData={setFormData} t={t} ic={ic} tc={tc} />
    </div>
  )
}
