import { Check, X, Minus } from 'lucide-react';

interface ComparisonFeature {
  name: string;
  description?: string;
  values: Record<string, boolean | string | number>;
}

interface ComparisonPlan {
  id: string;
  name: string;
  price?: number;
  priceCurrency?: string;
  period?: string;
  highlighted?: boolean;
}

interface ComparisonTableProps {
  title?: string;
  subtitle?: string;
  plans: ComparisonPlan[];
  features: ComparisonFeature[];
  primaryColor?: string;
  translations?: {
    perMonth?: string;
    mostPopular?: string;
  };
}

export default function ComparisonTable({
  title = 'Compare Plans',
  subtitle = 'Find the perfect plan for your needs',
  plans,
  features,
  primaryColor = '#3b82f6',
  translations = {},
}: ComparisonTableProps) {
  const t = {
    perMonth: translations.perMonth || '/mo',
    mostPopular: translations.mostPopular || 'Most Popular',
  };

  const renderValue = (value: boolean | string | number) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-500 mx-auto" aria-label="Included" />
      ) : (
        <X className="w-5 h-5 text-red-400 mx-auto" aria-label="Not included" />
      );
    }
    if (value === '-' || value === null || value === undefined) {
      return <Minus className="w-5 h-5 text-muted-foreground mx-auto" aria-label="Not applicable" />;
    }
    return <span className="font-medium">{value}</span>;
  };

  return (
    <section className="py-16 bg-background" data-testid="comparison-table">
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-speakable="true">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground max-w-2xl mx-auto" data-speakable="true">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse" role="grid" aria-label="Plan comparison table">
            <thead>
              <tr>
                <th className="text-left p-4 border-b border-border bg-muted/30 font-semibold sticky left-0 z-10" scope="col">
                  Features
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.id}
                    className={`p-4 border-b text-center min-w-[140px] ${
                      plan.highlighted
                        ? 'bg-primary/10 border-primary/20'
                        : 'bg-muted/30 border-border'
                    }`}
                    scope="col"
                  >
                    <div className="space-y-2">
                      {plan.highlighted && (
                        <span
                          className="inline-block text-xs font-medium px-2 py-1 rounded-full text-white"
                          style={{ backgroundColor: primaryColor }}
                        >
                          {t.mostPopular}
                        </span>
                      )}
                      <div className="font-bold text-lg">{plan.name}</div>
                      {plan.price !== undefined && (
                        <div className="text-2xl font-bold" style={{ color: plan.highlighted ? primaryColor : undefined }}>
                          {plan.priceCurrency || '$'}{plan.price}
                          <span className="text-sm font-normal text-muted-foreground">
                            {plan.period || t.perMonth}
                          </span>
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={feature.name} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                  <td className="p-4 border-b border-border sticky left-0 bg-inherit z-10">
                    <div className="font-medium">{feature.name}</div>
                    {feature.description && (
                      <div className="text-sm text-muted-foreground">{feature.description}</div>
                    )}
                  </td>
                  {plans.map((plan) => (
                    <td
                      key={`${feature.name}-${plan.id}`}
                      className={`p-4 border-b text-center ${
                        plan.highlighted ? 'bg-primary/5 border-primary/10' : 'border-border'
                      }`}
                    >
                      {renderValue(feature.values[plan.id])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
