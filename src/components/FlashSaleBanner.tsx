import { useState, useEffect } from 'react';
import { X, Zap, Gift, ArrowRight } from 'lucide-react';

interface FlashSaleBannerProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  primaryColor?: string;
  offerText?: string;
  dismissable?: boolean;
  saleDurationHours?: number;
}

const STORAGE_KEY = 'flash_sale_end_time';
const DISMISSED_KEY = 'flash_sale_dismissed';

function getEndTime(saleDurationHours: number): number {
  if (typeof window === 'undefined') return Date.now() + saleDurationHours * 60 * 60 * 1000;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const endTime = parseInt(stored, 10);
    if (endTime > Date.now()) return endTime;
  }
  
  const newEndTime = Date.now() + saleDurationHours * 60 * 60 * 1000;
  localStorage.setItem(STORAGE_KEY, newEndTime.toString());
  return newEndTime;
}

function calculateTimeLeft(endTime: number) {
  const diff = endTime - Date.now();
  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };
  
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function FlashSaleBanner({
  title = "FLASH SALE!",
  subtitle = "Limited Time Offer",
  ctaText = "Claim Now",
  ctaLink = "#pricing",
  primaryColor = '#3b82f6',
  offerText = "Get 12 Months + 2 Months FREE!",
  dismissable = true,
  saleDurationHours = 24,
}: FlashSaleBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [endTime, setEndTime] = useState<number>(Date.now() + saleDurationHours * 60 * 60 * 1000);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    setMounted(true);
    const dismissed = localStorage.getItem(DISMISSED_KEY);
    if (dismissed === 'true') {
      setIsVisible(false);
      return;
    }
    
    const calculatedEndTime = getEndTime(saleDurationHours);
    setEndTime(calculatedEndTime);
    setTimeLeft(calculateTimeLeft(calculatedEndTime));
  }, [saleDurationHours]);

  useEffect(() => {
    if (!mounted) return;
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, mounted]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(DISMISSED_KEY, 'true');
  };

  if (!mounted) return null;

  if (!isVisible) return null;

  return (
    <div 
      className="relative w-full py-2 px-4 shadow-lg z-40"
      style={{ 
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 50%, ${primaryColor} 100%)` 
      }}
    >
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-white">
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full animate-pulse">
            <Zap className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">{title}</span>
          </div>
          
          <span className="font-semibold text-sm sm:text-base">{offerText}</span>
        </div>

        <div className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full">
          <span className="font-mono text-sm sm:text-base font-bold">
            {String(timeLeft.hours).padStart(2, '0')}
            <span className="text-white/70">h</span>
            {' : '}
            {String(timeLeft.minutes).padStart(2, '0')}
            <span className="text-white/70">m</span>
            {' : '}
            {String(timeLeft.seconds).padStart(2, '0')}
            <span className="text-white/70">s</span>
          </span>
        </div>

        <a
          href={ctaLink}
          className="flex items-center gap-1 bg-white text-black px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors"
        >
          <Gift className="w-4 h-4" />
          {ctaText}
          <ArrowRight className="w-3 h-3" />
        </a>

        {dismissable && (
          <button
            onClick={handleDismiss}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
