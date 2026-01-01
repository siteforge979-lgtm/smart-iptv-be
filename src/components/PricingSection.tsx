import { useState, useEffect } from 'react';
import { Check, ShoppingCart, Star, Shield, Zap, Clock, Gift } from 'lucide-react';
import { clsx } from 'clsx';
import LeadCaptureModal from './LeadCaptureModal';
import { submitLead } from '../utils/lead-capture';

interface DevicePricing {
  starter: number;
  standard: number;
  premium: number;
}

interface PricingTier {
  devices: number;
  label: string;
  pricing: DevicePricing;
}

const PRICING_TIERS: PricingTier[] = [
  { devices: 1, label: '1 Device', pricing: { starter: 35, standard: 45, premium: 79 } },
  { devices: 2, label: '2 Devices', pricing: { starter: 65, standard: 79, premium: 119 } },
  { devices: 3, label: '3 Devices', pricing: { starter: 79, standard: 99, premium: 149 } },
  { devices: 4, label: '4 Devices', pricing: { starter: 85, standard: 110, premium: 199 } },
  { devices: 5, label: '5 Devices', pricing: { starter: 99, standard: 129, premium: 249 } },
];

interface PackageInfo {
  id: 'starter' | 'standard' | 'premium';
  name: string;
  subtitle: string;
  duration: string;
  features: string[];
  bonus?: string;
}

function getLocalizedPackages(t: PricingTranslations): PackageInfo[] {
  const features = [
    t.globalChannels || '+55,000 Global Live Channels',
    t.moviesSeriesCount || '+90,000 Movies And Series',
    t.timeShift || 'Time-Shift & EPG Guide',
    t.qualityAll || 'Quality SD, HD, FHD et 4K',
    t.antiFreeze || 'Anti-Freeze Technology',
    t.dailyUpdates || 'Daily Updates',
    (t.moneyBackGuarantee || '{days}-Day Money-Back Guarantee').replace('{days}', '30'),
  ];
  
  return [
    {
      id: 'starter',
      name: t.starterPackage || 'STARTER PACKAGE',
      subtitle: t.noBindingContract || 'No Binding Contract',
      duration: t.threeMonths || '/3 MONTHS',
      features,
    },
    {
      id: 'standard',
      name: t.standardPackage || 'STANDARD PACKAGE',
      subtitle: t.noBindingContract || 'No Binding Contract',
      duration: t.sixMonths || '/6 MONTHS',
      features,
    },
    {
      id: 'premium',
      name: t.premiumPackage || 'PREMIUM PACKAGE',
      subtitle: t.noBindingContract || 'No Binding Contract',
      duration: t.twelveMonths || '/12 MONTHS + 3 BONUS',
      features,
      bonus: t.bonusMonths || '+ 3 months free',
    },
  ];
}

const REVIEW_STATS = {
  count: '25,567',
  rating: 5,
};

interface PricingTranslations {
  secureCheckout?: string;
  reviews?: string;
  flashSaleTitle?: string;
  priceReturns?: string;
  starterPackage?: string;
  standardPackage?: string;
  premiumPackage?: string;
  noBindingContract?: string;
  threeMonths?: string;
  sixMonths?: string;
  twelveMonths?: string;
  bonusMonths?: string;
  globalChannels?: string;
  moviesSeriesCount?: string;
  timeShift?: string;
  qualityAll?: string;
  antiFreeze?: string;
  dailyUpdates?: string;
  moneyBackGuarantee?: string;
  buyNow?: string;
  popular?: string;
  bestValue?: string;
  selectDevices?: string;
  device?: string;
  devices?: string;
  headerTitle?: string;
  headerSubtitle?: string;
}

function PaymentBadges({ secureCheckout = 'Guaranteed Safe & Secure Checkout' }: { secureCheckout?: string }) {
  return (
    <div className="flex flex-col items-center gap-2 mt-4 pt-4 border-t border-white/10">
      <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase tracking-wider">
        <Shield className="w-3 h-3" />
        <span>{secureCheckout}</span>
      </div>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="text-[10px] px-2 py-0.5 bg-muted/50 rounded font-medium">McAfee SECURE</span>
        <span className="text-[10px] px-2 py-0.5 bg-[#1a1f71] text-white rounded font-bold">VISA</span>
        <span className="text-[10px] px-2 py-0.5 bg-gradient-to-r from-[#eb001b] to-[#f79e1b] text-white rounded font-bold">MC</span>
        <span className="text-[10px] px-2 py-0.5 bg-[#006fcf] text-white rounded font-bold">AMEX</span>
        <span className="text-[10px] px-2 py-0.5 bg-[#003087] text-white rounded font-bold">PayPal</span>
      </div>
    </div>
  );
}

function ReviewStars({ primaryColor = '#38bdf8', reviewsLabel = 'Reviews' }: { primaryColor?: string; reviewsLabel?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-3">
      <span className="text-sm text-muted-foreground">+ {REVIEW_STATS.count} {reviewsLabel}</span>
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4"
            fill={i < REVIEW_STATS.rating ? primaryColor : 'transparent'}
            stroke={primaryColor}
            strokeWidth={1.5}
          />
        ))}
      </div>
    </div>
  );
}

interface SaleCountdownProps { 
  primaryColor?: string;
  flashSaleTitle?: string;
  priceReturns?: string;
}

function SaleCountdown({ primaryColor = '#38bdf8', flashSaleTitle = 'Limited Time Flash Sale!', priceReturns = 'Prices return to normal after timer ends' }: SaleCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-card to-muted/30 border border-border">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center animate-pulse"
            style={{ backgroundColor: `${primaryColor}20` }}
          >
            <Zap className="w-5 h-5" style={{ color: primaryColor }} />
          </div>
          <div>
            <span className="font-bold text-lg" style={{ color: primaryColor }}>{flashSaleTitle}</span>
            <p className="text-xs text-muted-foreground">{priceReturns}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg border border-border">
          <Clock className="w-4 h-4" style={{ color: primaryColor }} />
          <span className="font-mono text-lg font-bold">
            {String(timeLeft.hours).padStart(2, '0')}
            <span className="text-muted-foreground">h</span>
            {' : '}
            {String(timeLeft.minutes).padStart(2, '0')}
            <span className="text-muted-foreground">m</span>
            {' : '}
            {String(timeLeft.seconds).padStart(2, '0')}
            <span className="text-muted-foreground">s</span>
          </span>
        </div>
      </div>
    </div>
  );
}

interface PricingCardProps {
  pkg: PackageInfo;
  price: number;
  primaryColor?: string;
  ctaLink?: string;
  buttonText?: string;
  onBuyClick?: () => void;
  requiresLeadCapture?: boolean;
  translations?: {
    bestValue?: string;
    popular?: string;
    secureCheckout?: string;
    reviews?: string;
  };
}

function PricingCard({ pkg, price, primaryColor = '#38bdf8', ctaLink = '#order', buttonText = 'BUY NOW', onBuyClick, requiresLeadCapture, translations = {} }: PricingCardProps) {
  const isPremium = pkg.id === 'premium';
  const isStandard = pkg.id === 'standard';
  
  const handleClick = (e: React.MouseEvent) => {
    if (requiresLeadCapture && onBuyClick) {
      e.preventDefault();
      onBuyClick();
    }
  };
  
  return (
    <div className="relative rounded-xl border border-white/10 bg-card/50 backdrop-blur-sm p-6 flex flex-col h-full">
      {isPremium && (
        <div 
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1"
          style={{ backgroundColor: primaryColor }}
        >
          <Gift className="w-3 h-3" />
          {translations.bestValue || 'BEST VALUE'}
        </div>
      )}
      {isStandard && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold bg-orange-500 text-white flex items-center gap-1">
          <Zap className="w-3 h-3" />
          {translations.popular || 'POPULAR'}
        </div>
      )}
      <div className="flex items-center gap-3 mb-6">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: primaryColor }}
        >
          <Check className="w-6 h-6 text-white" strokeWidth={3} />
        </div>
        <div>
          <h3 className="font-bold text-sm tracking-wide">{pkg.name}</h3>
          <p className="text-xs" style={{ color: primaryColor }}>{pkg.subtitle}</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-sm align-top mr-0.5">$</span>
          <span className="text-5xl font-bold">{price}</span>
        </div>
        <div className="text-sm text-muted-foreground mt-1 uppercase tracking-wide">
          {pkg.duration}
        </div>
      </div>

      <div className="border-t border-dashed border-white/20 my-4" />

      <ul className="space-y-3 flex-1">
        {pkg.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <Check 
              className="w-4 h-4 shrink-0 mt-0.5" 
              style={{ color: primaryColor }}
            />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
        {pkg.bonus && (
          <li className="flex items-start gap-2 text-sm">
            <Check 
              className="w-4 h-4 shrink-0 mt-0.5" 
              style={{ color: primaryColor }}
            />
            <span style={{ color: primaryColor }} className="font-medium">{pkg.bonus}</span>
          </li>
        )}
      </ul>

      <a
        href={ctaLink}
        onClick={handleClick}
        target={!requiresLeadCapture && ctaLink.startsWith('http') ? '_blank' : undefined}
        rel={!requiresLeadCapture && ctaLink.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="mt-6 flex items-center justify-center gap-2 w-full rounded-lg py-3 px-4 font-semibold text-sm transition-all hover:opacity-90 cursor-pointer text-white"
        style={{ 
          backgroundColor: primaryColor,
        }}
        data-testid={`button-buy-${pkg.id}`}
      >
        <ShoppingCart className="w-4 h-4" />
        {buttonText}
      </a>

      <PaymentBadges secureCheckout={translations.secureCheckout} />
      <ReviewStars primaryColor={primaryColor} reviewsLabel={translations.reviews} />
    </div>
  );
}

type PaymentType = 'paygate' | 'whatsapp' | 'email' | 'custom_link';

interface ContactInfo {
  whatsappNumber?: string;
  telegramUsername?: string;
  supportEmail?: string;
}

interface PaymentSettings {
  paymentType: PaymentType;
  paygateWalletAddress?: string;
  paygateSuccessUrl?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
  contactEmail?: string;
  emailSubject?: string;
  customPaymentLink?: string;
  buttonText?: string;
  contactInfo?: ContactInfo;
}

interface PricingSectionProps {
  primaryColor?: string;
  ctaLink?: string;
  defaultDevice?: number;
  showHeader?: boolean;
  plans?: unknown[];
  paymentSettings?: PaymentSettings;
  brandName?: string;
  baseUrl?: string;
  leadCaptureEnabled?: boolean;
  adminApiUrl?: string;
  websiteId?: string;
  translations?: PricingTranslations;
}

function generatePaymentLink(
  paymentSettings: PaymentSettings | undefined,
  packageName: string,
  price: number,
  brandName: string,
  baseUrl?: string
): string {
  if (!paymentSettings) return '#order';
  
  const { paymentType } = paymentSettings;
  
  switch (paymentType) {
    case 'paygate': {
      const wallet = paymentSettings.paygateWalletAddress || '';
      if (!wallet) return '#order';
      const encodedProduct = encodeURIComponent(`${brandName} - ${packageName}`);
      const successUrl = paymentSettings.paygateSuccessUrl || (baseUrl ? `${baseUrl}/thank-you` : '/thank-you');
      const encodedSuccessUrl = encodeURIComponent(successUrl);
      const currency = 'USD';
      return `/checkout?amount=${price}&product=${encodedProduct}&wallet=${encodeURIComponent(wallet)}&success_url=${encodedSuccessUrl}&currency=${currency}`;
    }
    case 'whatsapp': {
      const number = (paymentSettings.whatsappNumber || '').replace(/\D/g, '');
      const message = paymentSettings.whatsappMessage || `Hi, I want to order ${packageName} ($${price})`;
      const encodedMsg = encodeURIComponent(message.replace('{package}', packageName).replace('{price}', `$${price}`));
      return `https://wa.me/${number}?text=${encodedMsg}`;
    }
    case 'email': {
      const email = paymentSettings.contactEmail || '';
      const subject = paymentSettings.emailSubject || `Order: ${packageName}`;
      const body = `Hi, I want to order ${packageName} for $${price}.\n\nPlease send me the payment details.`;
      return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    case 'custom_link': {
      return paymentSettings.customPaymentLink || '#order';
    }
    default:
      return '#order';
  }
}


export default function PricingSection({ 
  primaryColor = '#38bdf8',
  ctaLink,
  defaultDevice = 1,
  showHeader = true,
  paymentSettings,
  brandName = 'IPTV Service',
  baseUrl,
  leadCaptureEnabled = true,
  adminApiUrl,
  websiteId,
  translations = {},
}: PricingSectionProps) {
  const t = translations;
  const [activeDevice, setActiveDevice] = useState(defaultDevice);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{ name: string; price: number; link: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const currentTier = PRICING_TIERS.find(t => t.devices === activeDevice) || PRICING_TIERS[0];

  const requiresLeadCapture = leadCaptureEnabled && paymentSettings?.paymentType === 'paygate';

  const handleBuyClick = (packageName: string, price: number, link: string) => {
    if (requiresLeadCapture) {
      setSelectedPackage({ name: packageName, price, link });
      setShowLeadModal(true);
    }
  };

  const handleLeadSubmit = async (data: { email: string; phone: string }) => {
    if (!selectedPackage) return;

    setIsSubmitting(true);
    
    await submitLead(data, {
      adminApiUrl,
      websiteId,
      source: 'payment_redirect',
      metadata: { 
        packageName: selectedPackage.name, 
        packagePrice: selectedPackage.price,
        devices: activeDevice,
      },
    });
    
    setIsSubmitting(false);
    setShowLeadModal(false);
    
    if (selectedPackage.link.startsWith('http')) {
      window.open(selectedPackage.link, '_blank');
    } else {
      window.location.href = selectedPackage.link;
    }
  };

  return (
    <>
      <section className="py-20">
        <div className="container mx-auto px-4">
          {showHeader && (
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.headerTitle || 'Fair and Open Pricing | No Hidden Fees'}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t.headerSubtitle || 'Choose the plan that works best for you. All plans include our money-back guarantee.'}
              </p>
            </div>
          )}
          
          <SaleCountdown 
            primaryColor={primaryColor} 
            flashSaleTitle={t.flashSaleTitle}
            priceReturns={t.priceReturns}
          />

          <div className="flex justify-center mb-10">
            <div className="inline-flex flex-wrap justify-center gap-2 p-1 rounded-lg bg-muted/20">
              {PRICING_TIERS.map((tier) => {
                const deviceLabel = tier.devices === 1 
                  ? `1 ${t.device || 'Device'}` 
                  : `${tier.devices} ${t.devices || 'Devices'}`;
                return (
                <button
                  key={tier.devices}
                  onClick={() => setActiveDevice(tier.devices)}
                  className={clsx(
                    "px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap",
                    activeDevice === tier.devices
                      ? "text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground border border-white/20 bg-card/50"
                  )}
                  style={activeDevice === tier.devices ? { backgroundColor: primaryColor } : undefined}
                  data-testid={`button-device-${tier.devices}`}
                >
                  {deviceLabel}
                </button>
              );
              })}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {getLocalizedPackages(t).map((pkg) => {
              const price = currentTier.pricing[pkg.id];
              const link = paymentSettings 
                ? generatePaymentLink(paymentSettings, pkg.name, price, brandName, baseUrl)
                : (ctaLink || '#order');
              return (
                <PricingCard
                  key={pkg.id}
                  pkg={pkg}
                  price={price}
                  primaryColor={primaryColor}
                  ctaLink={link}
                  buttonText={paymentSettings?.buttonText || t.buyNow || 'BUY NOW'}
                  requiresLeadCapture={requiresLeadCapture}
                  onBuyClick={() => handleBuyClick(pkg.name, price, link)}
                  translations={{
                    bestValue: t.bestValue,
                    popular: t.popular,
                    secureCheckout: t.secureCheckout,
                    reviews: t.reviews,
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>

      {showLeadModal && selectedPackage && (
        <LeadCaptureModal
          isOpen={showLeadModal}
          onClose={() => setShowLeadModal(false)}
          onSubmit={handleLeadSubmit}
          destination="payment"
          brandName={brandName}
          primaryColor={primaryColor}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
}
