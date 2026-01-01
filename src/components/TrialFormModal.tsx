import { useState } from 'react';

interface TrialFormModalProps {
  brandName: string;
  trialHours: number;
  trialPrice: number;
  whatsappNumber: string;
  primaryColor: string;
  buttonText: string;
  priceLabel: string;
}

const countryCodes = [
  { code: '+1', country: 'US/CA', flag: '' },
  { code: '+44', country: 'UK', flag: '' },
  { code: '+33', country: 'FR', flag: '' },
  { code: '+49', country: 'DE', flag: '' },
  { code: '+34', country: 'ES', flag: '' },
  { code: '+39', country: 'IT', flag: '' },
  { code: '+31', country: 'NL', flag: '' },
  { code: '+32', country: 'BE', flag: '' },
  { code: '+41', country: 'CH', flag: '' },
  { code: '+43', country: 'AT', flag: '' },
  { code: '+351', country: 'PT', flag: '' },
  { code: '+48', country: 'PL', flag: '' },
  { code: '+46', country: 'SE', flag: '' },
  { code: '+47', country: 'NO', flag: '' },
  { code: '+45', country: 'DK', flag: '' },
  { code: '+358', country: 'FI', flag: '' },
  { code: '+7', country: 'RU', flag: '' },
  { code: '+90', country: 'TR', flag: '' },
  { code: '+971', country: 'UAE', flag: '' },
  { code: '+966', country: 'SA', flag: '' },
  { code: '+20', country: 'EG', flag: '' },
  { code: '+212', country: 'MA', flag: '' },
  { code: '+213', country: 'DZ', flag: '' },
  { code: '+216', country: 'TN', flag: '' },
  { code: '+91', country: 'IN', flag: '' },
  { code: '+92', country: 'PK', flag: '' },
  { code: '+880', country: 'BD', flag: '' },
  { code: '+60', country: 'MY', flag: '' },
  { code: '+65', country: 'SG', flag: '' },
  { code: '+62', country: 'ID', flag: '' },
  { code: '+66', country: 'TH', flag: '' },
  { code: '+84', country: 'VN', flag: '' },
  { code: '+63', country: 'PH', flag: '' },
  { code: '+86', country: 'CN', flag: '' },
  { code: '+81', country: 'JP', flag: '' },
  { code: '+82', country: 'KR', flag: '' },
  { code: '+61', country: 'AU', flag: '' },
  { code: '+64', country: 'NZ', flag: '' },
  { code: '+27', country: 'ZA', flag: '' },
  { code: '+234', country: 'NG', flag: '' },
  { code: '+254', country: 'KE', flag: '' },
  { code: '+55', country: 'BR', flag: '' },
  { code: '+52', country: 'MX', flag: '' },
  { code: '+54', country: 'AR', flag: '' },
  { code: '+57', country: 'CO', flag: '' },
  { code: '+56', country: 'CL', flag: '' },
  { code: '+51', country: 'PE', flag: '' },
];

export default function TrialFormModal({
  brandName,
  trialHours,
  trialPrice,
  whatsappNumber,
  primaryColor,
  buttonText,
  priceLabel,
}: TrialFormModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [countryCode, setCountryCode] = useState('+1');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fullPhone = `${countryCode}${phone.replace(/\D/g, '')}`;
    const message = `Hello ${brandName}!

I'd like to request the ${trialHours}-hour trial for ${priceLabel}.

My details:
Phone: ${fullPhone}
Email: ${email}

Please send me the trial access details. Thank you!`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.location.href = whatsappUrl;
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center rounded-lg border-2 bg-background px-8 py-4 text-base font-semibold transition-all hover:bg-muted relative"
        style={{ borderColor: primaryColor, color: primaryColor }}
        data-testid="button-trial-open"
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20 12 20 22 4 22 4 12"/>
          <rect x="2" y="7" width="20" height="5"/>
          <line x1="12" y1="22" x2="12" y2="7"/>
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
        </svg>
        {buttonText}
        <span 
          className="ml-2 px-2 py-0.5 text-xs font-bold rounded-full text-white"
          style={{ backgroundColor: primaryColor }}
        >
          {priceLabel}
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="relative w-full max-w-md bg-background rounded-2xl shadow-2xl border border-border overflow-hidden animate-scale-in">
            <div 
              className="px-6 py-4 text-white"
              style={{ backgroundColor: primaryColor }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">{trialHours}-Hour Trial</h3>
                  <p className="text-white/80 text-sm">Only {priceLabel}</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                  data-testid="button-trial-close"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-28 px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2"
                    style={{ focusRing: primaryColor } as any}
                    data-testid="select-country-code"
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} {c.country}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    required
                    className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2"
                    data-testid="input-phone"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2"
                  data-testid="input-email"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !phone || !email}
                  className="w-full py-3 px-4 rounded-lg text-white font-semibold transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ backgroundColor: primaryColor }}
                  data-testid="button-trial-submit"
                >
                  {isSubmitting ? (
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                  ) : (
                    <>
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Continue to WhatsApp
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                You'll be redirected to WhatsApp to complete your trial request
              </p>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
}
