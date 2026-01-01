import { Tv, Film, Clock, Headphones, Play, ArrowRight, Gift, CheckCircle, Star } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  channelCount: number;
  vodCount: number;
  primaryColor?: string;
  showFreeTrial?: boolean;
  whatsappNumber?: string;
  trialHours?: number;
}

export default function HeroSection({
  title,
  subtitle,
  channelCount,
  vodCount,
  primaryColor = '#3b82f6',
  showFreeTrial = true,
  whatsappNumber,
  trialHours = 24,
}: HeroSectionProps) {
  const stats = [
    { icon: Tv, label: 'Live Channels', value: `${channelCount.toLocaleString()}+` },
    { icon: Film, label: 'Movies & Series', value: `${vodCount.toLocaleString()}+` },
    { icon: Clock, label: 'Uptime', value: '99.9%' },
    { icon: Headphones, label: 'Support', value: '24/7' },
  ];

  const highlights = [
    'HD & 4K Quality',
    'No Contract',
    'Instant Activation',
    'All Devices',
  ];

  const trialLink = whatsappNumber 
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello ${title}, I'd like to request a ${trialHours}-hour free trial!`)}`
    : '/free-trial';

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/50 py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div 
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: primaryColor }}
      />
      <div 
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: primaryColor }}
      />
      
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted border border-border mb-6 animate-fade-in">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">Trusted by 25,000+ customers</span>
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl animate-fade-in">
            Premium <span style={{ color: primaryColor }}>{title}</span> Service
          </h1>
          
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
            {subtitle}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 animate-slide-up">
            {highlights.map((highlight, i) => (
              <div key={i} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4" style={{ color: primaryColor }} />
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold text-white transition-all hover:opacity-90 hover:scale-105 shadow-lg"
              style={{ backgroundColor: primaryColor }}
            >
              <Play className="w-5 h-5 mr-2" />
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            
            {showFreeTrial && (
              <a
                href={trialLink}
                className="inline-flex items-center justify-center rounded-lg border-2 bg-background px-8 py-4 text-base font-semibold transition-all hover:bg-muted"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                <Gift className="w-5 h-5 mr-2" />
                {trialHours}hr Free Trial
              </a>
            )}
          </div>

          <p className="mt-4 text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: '0.15s' }}>
            No credit card required for trial. Cancel anytime.
          </p>
        </div>

        <div 
          className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4 animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm">
                <div 
                  className="mx-auto h-14 w-14 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${primaryColor}15` }}
                >
                  <Icon className="h-7 w-7" style={{ color: primaryColor }} />
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-muted-foreground animate-slide-up" style={{ animationDelay: '0.25s' }}>
          <span className="text-sm font-medium">Compatible with:</span>
          {['Smart TV', 'Fire Stick', 'Android', 'iOS', 'Windows', 'MAG Box'].map((device) => (
            <span key={device} className="text-sm px-3 py-1 rounded-full bg-muted border border-border">
              {device}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
