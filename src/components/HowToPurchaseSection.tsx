interface HowToPurchaseSectionProps {
  brandName?: string;
  primaryColor?: string;
  translations?: {
    title?: string;
    subtitle?: string;
    step1Title?: string;
    step1Desc?: string;
    step2Title?: string;
    step2Desc?: string;
    step3Title?: string;
    step3Desc?: string;
  };
}

export default function HowToPurchaseSection({ brandName = 'IPTV', primaryColor, translations = {} }: HowToPurchaseSectionProps) {
  const t = translations;
  const steps = [
    {
      number: 1,
      title: t.step1Title || 'Choose Your Plan',
      description: t.step1Desc || 'Select the IPTV plan that best fits your viewing preferences. Whether you are looking for a basic package or an extensive plan with premium channels, we offer flexible options to suit your needs.',
    },
    {
      number: 2,
      title: t.step2Title || 'Complete Your Payment',
      description: t.step2Desc || 'Securely complete your payment using one of our convenient methods. We support a variety of payment options to ensure a hassle-free transaction.',
    },
    {
      number: 3,
      title: t.step3Title || 'Receive Your Account Details',
      description: t.step3Desc || 'Once your payment is processed, you will receive your account details instantly. Start enjoying your favorite live channels, movies, and on-demand content right away!',
    },
  ];

  const sectionTitle = (t.title || 'How to Purchase {brand} IPTV').replace('{brand}', brandName);
  const sectionSubtitle = t.subtitle || 'Getting started is quick and easy. Follow these simple steps to begin streaming.';

  return (
    <section className="section-container bg-background" id="how-to-purchase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">
            {sectionTitle}
          </h2>
          <p className="section-subtitle">
            {sectionSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.number} className="step-card text-center">
              <div className="flex justify-center">
                <div className="step-number">{step.number}</div>
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-8 transform -translate-y-1/2">
                  <svg className="w-6 h-6 text-muted-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
