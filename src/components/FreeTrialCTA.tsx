import { Play, CheckCircle, Clock, Zap, ArrowRight, Gift } from 'lucide-react';

interface FreeTrialCTAProps {
  brandName?: string;
  channelCount?: number;
  trialHours?: number;
  primaryColor?: string;
  ctaLink?: string;
  whatsappNumber?: string;
  translations?: {
    badge: string;
    title: string;
    subtitle: string;
    feature1: string;
    feature2: string;
    feature3: string;
    feature4: string;
    ctaButton: string;
    hoursFree: string;
    fullAccess: string;
    instantAccess: string;
    noCommitment: string;
  };
}

export default function FreeTrialCTA({
  brandName = 'Premium IPTV',
  channelCount = 28000,
  trialHours = 24,
  primaryColor = '#3b82f6',
  ctaLink = '/free-trial',
  whatsappNumber,
  translations,
}: FreeTrialCTAProps) {
  const t = translations || {
    badge: 'FREE TRIAL',
    title: `Try ${brandName} for ${trialHours} Hours - Free!`,
    subtitle: 'Experience the full power of our premium IPTV service with no obligation. See why thousands of customers choose us as their streaming provider!',
    feature1: `Access to all ${channelCount.toLocaleString()}+ channels`,
    feature2: 'Full HD & 4K quality streaming',
    feature3: 'All premium features included',
    feature4: 'No credit card required',
    ctaButton: 'Request Free Trial',
    hoursFree: 'Hours Free',
    fullAccess: 'Full access to all channels, movies, series, and premium features',
    instantAccess: 'Instant Access',
    noCommitment: 'No Commitment',
  };
  
  const features = [t.feature1, t.feature2, t.feature3, t.feature4];

  const whatsappLink = whatsappNumber 
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello ${brandName}, I'd like to request a ${trialHours}-hour free trial!`)}`
    : ctaLink;

  return (
    <section className="py-16 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10"
        style={{ 
          background: `linear-gradient(135deg, ${primaryColor} 0%, transparent 50%, ${primaryColor} 100%)` 
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-10">
              <div 
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4"
                style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
              >
                <Gift className="w-4 h-4" />
                <span>{t.badge}</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                {t.title}
              </h2>
              
              <p className="text-muted-foreground mb-6">
                {t.subtitle}
              </p>

              <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: primaryColor }} />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={whatsappLink}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-transform hover:scale-105"
                style={{ backgroundColor: primaryColor }}
              >
                <Play className="w-5 h-5" />
                {t.ctaButton}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div 
              className="p-8 md:p-10 flex flex-col items-center justify-center text-white"
              style={{ 
                background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}cc 100%)` 
              }}
            >
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-10 h-10" />
                </div>
                <h3 className="text-4xl md:text-5xl font-bold mb-2">{trialHours}</h3>
                <p className="text-xl font-semibold mb-4">{t.hoursFree}</p>
                <p className="text-white/80 text-sm max-w-xs mx-auto">
                  {t.fullAccess}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm font-medium">{t.instantAccess}</span>
                </div>
                <div className="w-px h-4 bg-white/30" />
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{t.noCommitment}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
