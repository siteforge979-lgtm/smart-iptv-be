import { useState } from 'react';
import { Shield, CreditCard, Lock, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';

interface PaymentSettings {
  paymentType?: 'paygate' | 'whatsapp' | 'email' | 'custom_link';
  paygateWalletAddress?: string;
  paygateSuccessUrl?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
  contactEmail?: string;
  buttonText?: string;
  customPaymentLink?: string;
  contactInfo?: {
    whatsappNumber?: string;
    telegramUsername?: string;
    supportEmail?: string;
  };
}

interface CheckoutFormProps {
  brandName: string;
  primaryColor?: string;
  paymentSettings?: PaymentSettings;
  baseUrl: string;
  translations?: {
    title?: string;
    emailLabel?: string;
    planLabel?: string;
    submitButton?: string;
    securePayment?: string;
  };
}

const PLANS = [
  { id: 'starter', name: '3 Months - Starter', price: 35 },
  { id: 'standard', name: '6 Months - Standard', price: 45 },
  { id: 'premium', name: '12 Months - Premium', price: 79 },
];

export default function CheckoutForm({
  brandName,
  primaryColor = '#3b82f6',
  paymentSettings,
  baseUrl,
  translations = {},
}: CheckoutFormProps) {
  const [email, setEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(PLANS[2].id);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = {
    title: translations.title || 'Complete Your Order',
    emailLabel: translations.emailLabel || 'Email Address',
    planLabel: translations.planLabel || 'Select Your Plan',
    submitButton: translations.submitButton || 'Proceed to Payment',
    securePayment: translations.securePayment || 'Secure & Encrypted Payment',
  };

  const selectedPlanData = PLANS.find(p => p.id === selectedPlan) || PLANS[2];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const paymentType = paymentSettings?.paymentType || 'whatsapp';

    if (paymentType === 'paygate' && paymentSettings?.paygateWalletAddress) {
      const successUrl = paymentSettings.paygateSuccessUrl || `${baseUrl}/thank-you`;
      const paygateUrl = `https://paygate.to/pay/?currency=USDC&amount=${selectedPlanData.price}&wallet=${paymentSettings.paygateWalletAddress}&product=${encodeURIComponent(`${brandName} - ${selectedPlanData.name}`)}&success_url=${encodeURIComponent(successUrl)}`;
      window.location.href = paygateUrl;
    } else if (paymentType === 'whatsapp' && paymentSettings?.whatsappNumber) {
      const message = paymentSettings.whatsappMessage || 
        `Hi, I want to order ${brandName} - ${selectedPlanData.name} ($${selectedPlanData.price}). My email: ${email}`;
      window.location.href = `https://wa.me/${paymentSettings.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    } else if (paymentType === 'email' && paymentSettings?.contactEmail) {
      const subject = `Order: ${brandName} - ${selectedPlanData.name}`;
      const body = `I want to order:\n\nPlan: ${selectedPlanData.name}\nPrice: $${selectedPlanData.price}\nEmail: ${email}`;
      window.location.href = `mailto:${paymentSettings.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else if (paymentType === 'custom_link' && paymentSettings?.customPaymentLink) {
      window.location.href = paymentSettings.customPaymentLink;
    } else {
      window.location.href = `mailto:streamonlinever@gmail.com?subject=${encodeURIComponent(`Order: ${brandName}`)}&body=${encodeURIComponent(`Plan: ${selectedPlanData.name}\nEmail: ${email}`)}`;
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">{t.title}</h2>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Lock className="w-4 h-4" />
          <span>{t.securePayment}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            {t.emailLabel}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">
            {t.planLabel}
          </label>
          <div className="space-y-3">
            {PLANS.map((plan) => (
              <label
                key={plan.id}
                className={clsx(
                  'flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all',
                  selectedPlan === plan.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={clsx(
                      'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
                      selectedPlan === plan.id
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground'
                    )}
                  >
                    {selectedPlan === plan.id && (
                      <CheckCircle className="w-3 h-3 text-primary-foreground" />
                    )}
                  </div>
                  <span className="font-medium">{plan.name}</span>
                </div>
                <span className="text-xl font-bold" style={{ color: primaryColor }}>
                  ${plan.price}
                </span>
                <input
                  type="radio"
                  name="plan"
                  value={plan.id}
                  checked={selectedPlan === plan.id}
                  onChange={() => setSelectedPlan(plan.id)}
                  className="sr-only"
                />
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !email}
          className={clsx(
            'w-full py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2',
            'text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]',
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          )}
          style={{ backgroundColor: primaryColor }}
        >
          <CreditCard className="w-5 h-5" />
          {isSubmitting ? 'Processing...' : t.submitButton}
        </button>

        <div className="flex items-center justify-center gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 bg-muted rounded font-medium">VISA</span>
            <span className="text-xs px-2 py-1 bg-muted rounded font-medium">MC</span>
            <span className="text-xs px-2 py-1 bg-muted rounded font-medium">USDC</span>
          </div>
        </div>
      </form>
    </div>
  );
}
