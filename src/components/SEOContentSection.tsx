import { useState } from 'react';
import { ChevronDown, ChevronUp, Tv, Wifi, Globe, Shield, Zap, Users } from 'lucide-react';

interface SEOContentSectionProps {
  brandName: string;
  channelCount: number;
  countryCount: number;
  vodCount?: number;
  primaryColor?: string;
  translations: {
    whyChoose: string;
    subtitle: string;
    premiumStreaming: string;
    premiumStreamingDesc: string;
    worldwideCoverage: string;
    worldwideCoverageDesc: string;
    noBuffering: string;
    noBufferingDesc: string;
    securePrivate: string;
    securePrivateDesc: string;
    instantActivation: string;
    instantActivationDesc: string;
    support247: string;
    support247Desc: string;
    whatIsIPTV: string;
    whatIsIPTVDesc: string;
    keyBenefits: string;
    costEffective: string;
    multiDevice: string;
    hdQuality: string;
    epgGuide: string;
    multiLanguage: string;
    dvrCatchUp: string;
    compatibleDevices: string;
    compatibleDevicesDesc: string;
    sportsCoverage: string;
    sportsCoverageDesc: string;
    entertainment: string;
    entertainmentDesc: string;
    showLess: string;
    learnMore: string;
  };
}

function getColorWithOpacity(color: string, opacity: number): string {
  if (!color) return `rgba(59, 130, 246, ${opacity})`;
  
  if (color.startsWith('hsl')) {
    const match = color.match(/hsl\(?\s*(\d+)\s+(\d+)%\s+(\d+)%\s*\)?/);
    if (match) {
      return `hsla(${match[1]}, ${match[2]}%, ${match[3]}%, ${opacity})`;
    }
  }
  
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  
  if (color.startsWith('rgb')) {
    const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${opacity})`;
    }
  }
  
  return `rgba(59, 130, 246, ${opacity})`;
}

export default function SEOContentSection({
  brandName,
  channelCount,
  countryCount,
  vodCount = 50000,
  primaryColor = '#3b82f6',
  translations
}: SEOContentSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const bgTint = getColorWithOpacity(primaryColor, 0.1);
  const iconColor = primaryColor;

  const t = translations;

  const features = [
    { icon: Tv, title: t.premiumStreaming, description: t.premiumStreamingDesc },
    { icon: Globe, title: t.worldwideCoverage, description: t.worldwideCoverageDesc },
    { icon: Wifi, title: t.noBuffering, description: t.noBufferingDesc },
    { icon: Shield, title: t.securePrivate, description: t.securePrivateDesc },
    { icon: Zap, title: t.instantActivation, description: t.instantActivationDesc },
    { icon: Users, title: t.support247, description: t.support247Desc }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.whyChoose}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="relative">
          <div 
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              !isExpanded ? 'max-h-[500px]' : 'max-h-none'
            }`}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-card rounded-xl p-6 border border-border">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: bgTint }}
                  >
                    <feature.icon className="w-6 h-6" style={{ color: iconColor }} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-card rounded-xl p-8 border border-border max-w-none">
              <h3 className="text-2xl font-bold text-foreground mb-4">{t.whatIsIPTV}</h3>
              <p className="text-muted-foreground mb-6">{t.whatIsIPTVDesc}</p>

              <h4 className="text-xl font-semibold text-foreground mb-3">{t.keyBenefits}</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                <li>{t.costEffective}</li>
                <li>{t.multiDevice}</li>
                <li>{t.hdQuality}</li>
                <li>{t.epgGuide}</li>
                <li>{t.multiLanguage}</li>
                <li>{t.dvrCatchUp}</li>
              </ul>

              <h4 className="text-xl font-semibold text-foreground mb-3">{t.compatibleDevices}</h4>
              <p className="text-muted-foreground mb-6">{t.compatibleDevicesDesc}</p>

              <h4 className="text-xl font-semibold text-foreground mb-3">{t.sportsCoverage}</h4>
              <p className="text-muted-foreground mb-6">{t.sportsCoverageDesc}</p>

              <h4 className="text-xl font-semibold text-foreground mb-3">{t.entertainment}</h4>
              <p className="text-muted-foreground">{t.entertainmentDesc}</p>
            </div>
          </div>

          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-muted/30 to-transparent pointer-events-none" />
          )}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-card text-foreground font-medium transition-all hover:bg-accent"
          >
            {isExpanded ? (
              <>
                {t.showLess}
                <ChevronUp className="h-5 w-5" />
              </>
            ) : (
              <>
                {t.learnMore}
                <ChevronDown className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
