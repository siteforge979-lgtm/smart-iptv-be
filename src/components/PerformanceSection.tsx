import { Wifi, Zap, Server, Shield, Globe, Clock, CheckCircle, Activity } from 'lucide-react';

interface PerformanceTranslations {
  title?: string;
  subtitle?: string;
  noBuffering?: string;
  noBufferingDesc?: string;
  serverInfra?: string;
  serverInfraDesc?: string;
  antiFreeze?: string;
  antiFreezeDesc?: string;
  recommendedSpeed?: string;
  speedRecommendation?: string;
  uptime?: string;
  channels?: string;
  countries?: string;
  support?: string;
}

interface PerformanceSectionProps {
  brandName?: string;
  primaryColor?: string;
  uptimePercent?: number;
  channelCount?: number;
  countryCount?: number;
  translations?: PerformanceTranslations;
}

export default function PerformanceSection({
  brandName = 'Premium IPTV',
  primaryColor = '#3b82f6',
  uptimePercent = 99.9,
  channelCount = 28000,
  countryCount = 100,
  translations = {},
}: PerformanceSectionProps) {
  const t = {
    title: translations.title || 'Experience Unmatched IPTV Performance',
    subtitle: translations.subtitle || `Discover why ${brandName} is the preferred choice for viewers worldwide. We're committed to delivering a seamless, high-quality entertainment experience.`,
    noBuffering: translations.noBuffering || 'NO BUFFERING, NO FREEZING',
    noBufferingDesc: translations.noBufferingDesc || `Tired of interruptions? Our advanced streaming technology ensures a smooth, buffer-free viewing experience. With ${brandName}, enjoy uninterrupted entertainment every time.`,
    serverInfra: translations.serverInfra || 'Premium Server Infrastructure',
    serverInfraDesc: translations.serverInfraDesc || 'Our high-speed servers are strategically located worldwide to deliver the fastest possible streaming speeds. Experience crystal-clear HD and 4K content without delays.',
    antiFreeze: translations.antiFreeze || 'Anti-Freeze Technology',
    antiFreezeDesc: translations.antiFreezeDesc || 'Proprietary technology that automatically optimizes your stream quality based on your connection, ensuring smooth playback even on slower connections.',
    recommendedSpeed: translations.recommendedSpeed || 'Recommended Internet Speed',
    speedRecommendation: translations.speedRecommendation || '10 Mbps for SD, 15 Mbps for HD, 25 Mbps for 4K',
    uptime: translations.uptime || 'Uptime',
    channels: translations.channels || 'Channels',
    countries: translations.countries || 'Countries',
    support: translations.support || 'Support',
  };

  const stats = [
    { icon: Server, value: `${uptimePercent}%`, label: t.uptime },
    { icon: Globe, value: `${channelCount.toLocaleString()}+`, label: t.channels },
    { icon: Activity, value: `${countryCount}+`, label: t.countries },
    { icon: Clock, value: '24/7', label: t.support },
  ];

  const features = [
    {
      icon: Zap,
      title: t.noBuffering,
      description: t.noBufferingDesc,
    },
    {
      icon: Server,
      title: t.serverInfra,
      description: t.serverInfraDesc,
    },
    {
      icon: Shield,
      title: t.antiFreeze,
      description: t.antiFreezeDesc,
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 rounded-xl bg-card border border-border"
            >
              <stat.icon className="w-8 h-8 mb-3" style={{ color: primaryColor }} />
              <span className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary transition-colors"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: `${primaryColor}15` }}
              >
                <feature.icon className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-card to-muted/30 border border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${primaryColor}20` }}
              >
                <Wifi className="w-8 h-8" style={{ color: primaryColor }} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  {t.recommendedSpeed}
                </h3>
                <p className="text-muted-foreground">
                  {t.speedRecommendation}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {['SD', 'HD', 'FHD', '4K'].map((quality) => (
                <div
                  key={quality}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border"
                >
                  <CheckCircle className="w-4 h-4" style={{ color: primaryColor }} />
                  <span className="font-medium">{quality}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
