import { useState, useEffect } from 'react';
import { Clock, Zap } from 'lucide-react';

interface CountdownTimerProps {
  endDate?: Date;
  hoursFromNow?: number;
  title?: string;
  subtitle?: string;
  primaryColor?: string;
  variant?: 'banner' | 'inline' | 'compact';
  showIcon?: boolean;
  translations?: {
    days?: string;
    hours?: string;
    minutes?: string;
    seconds?: string;
  };
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(endDate: Date): TimeLeft {
  const difference = endDate.getTime() - new Date().getTime();
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function TimeBlock({ value, label, primaryColor }: { value: number; label: string; primaryColor: string }) {
  return (
    <div className="flex flex-col items-center">
      <div 
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center text-2xl sm:text-3xl font-bold text-white shadow-lg"
        style={{ backgroundColor: primaryColor }}
      >
        {value.toString().padStart(2, '0')}
      </div>
      <span className="text-xs sm:text-sm text-muted-foreground mt-1 uppercase tracking-wider">{label}</span>
    </div>
  );
}

function CompactTimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <span className="text-xl sm:text-2xl font-bold">{value.toString().padStart(2, '0')}</span>
      <span className="text-xs text-muted-foreground ml-0.5">{label}</span>
    </div>
  );
}

export default function CountdownTimer({
  endDate,
  hoursFromNow = 24,
  title = "Flash Sale Ends In",
  subtitle,
  primaryColor = '#3b82f6',
  variant = 'banner',
  showIcon = true,
  translations = {},
}: CountdownTimerProps) {
  const labels = {
    days: translations.days || 'Days',
    hours: translations.hours || 'Hours',
    minutes: translations.minutes || 'Mins',
    seconds: translations.seconds || 'Secs',
  };
  const [targetDate] = useState(() => {
    if (endDate) return endDate;
    const now = new Date();
    now.setHours(now.getHours() + hoursFromNow);
    return now;
  });

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) {
    return null;
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2 text-foreground">
        {showIcon && <Clock className="w-4 h-4" style={{ color: primaryColor }} />}
        <div className="flex items-center gap-1">
          {timeLeft.days > 0 && (
            <>
              <CompactTimeBlock value={timeLeft.days} label="d" />
              <span className="text-muted-foreground">:</span>
            </>
          )}
          <CompactTimeBlock value={timeLeft.hours} label="h" />
          <span className="text-muted-foreground">:</span>
          <CompactTimeBlock value={timeLeft.minutes} label="m" />
          <span className="text-muted-foreground">:</span>
          <CompactTimeBlock value={timeLeft.seconds} label="s" />
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          {showIcon && <Zap className="w-5 h-5" style={{ color: primaryColor }} />}
          <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: primaryColor }}>
            {title}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <TimeBlock value={timeLeft.hours} label={labels.hours} primaryColor={primaryColor} />
          <span className="text-2xl font-bold text-muted-foreground">:</span>
          <TimeBlock value={timeLeft.minutes} label={labels.minutes} primaryColor={primaryColor} />
          <span className="text-2xl font-bold text-muted-foreground">:</span>
          <TimeBlock value={timeLeft.seconds} label={labels.seconds} primaryColor={primaryColor} />
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 px-6 rounded-xl bg-gradient-to-r from-card to-muted/30 border border-border">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          {showIcon && (
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center animate-pulse"
              style={{ backgroundColor: `${primaryColor}20` }}
            >
              <Zap className="w-5 h-5" style={{ color: primaryColor }} />
            </div>
          )}
          <div className="text-center">
            <h3 className="text-lg font-bold" style={{ color: primaryColor }}>{title}</h3>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          {timeLeft.days > 0 && (
            <>
              <TimeBlock value={timeLeft.days} label={labels.days} primaryColor={primaryColor} />
              <span className="text-2xl font-bold text-muted-foreground">:</span>
            </>
          )}
          <TimeBlock value={timeLeft.hours} label={labels.hours} primaryColor={primaryColor} />
          <span className="text-2xl font-bold text-muted-foreground">:</span>
          <TimeBlock value={timeLeft.minutes} label={labels.minutes} primaryColor={primaryColor} />
          <span className="text-2xl font-bold text-muted-foreground">:</span>
          <TimeBlock value={timeLeft.seconds} label={labels.seconds} primaryColor={primaryColor} />
        </div>
      </div>
    </div>
  );
}
