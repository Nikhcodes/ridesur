import { useLanguage } from '../context/LanguageContext'

function LanguageToggle() {
  const { language, toggle } = useLanguage()

  return (
    <button
      onClick={toggle}
      className="px-3 py-1 rounded-lg text-xs font-bold"
      style={{
        backgroundColor: '#1E293B',
        border: '1px solid rgba(255,255,255,0.08)',
        color: '#FACC15'
      }}
    >
      {language === 'en' ? 'NL' : 'EN'}
    </button>
  )
}

export default LanguageToggle