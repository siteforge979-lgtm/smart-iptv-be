import { Gift, DollarSign } from 'lucide-react';

interface MobileBottomCTAProps {
  pricingLink?: string;
  trialLink?: string;
  primaryColor?: string;
  showTrial?: boolean;
}

export default function MobileBottomCTA({
  pricingLink = '#pricing',
  trialLink = '/free-trial',
  primaryColor = '#3b82f6',
  showTrial = true,
}: MobileBottomCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-sm border-t border-border shadow-lg">
      <div className="flex items-center justify-center gap-3 p-3 max-w-md mx-auto">
        {showTrial && (
          <a
            href={trialLink}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 font-semibold text-sm transition-colors hover:bg-muted"
            style={{ borderColor: primaryColor, color: primaryColor }}
          >
            <Gift className="w-4 h-4" />
            Free Trial
          </a>
        )}
        <a
          href={pricingLink}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold text-sm text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: primaryColor }}
        >
          <DollarSign className="w-4 h-4" />
          View Pricing
        </a>
      </div>
    </div>
  );
}
