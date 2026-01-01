import { useState } from 'react';
import { X, Mail, Phone, Loader2 } from 'lucide-react';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { email: string; phone: string }) => void;
  destination: 'payment' | 'free_trial' | 'whatsapp_trial';
  brandName: string;
  primaryColor: string;
  isSubmitting?: boolean;
}

export default function LeadCaptureModal({
  isOpen,
  onClose,
  onSubmit,
  destination,
  brandName,
  primaryColor,
  isSubmitting = false,
}: LeadCaptureModalProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});

  if (!isOpen) return null;

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 8;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; phone?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (phone && !validatePhone(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({ email, phone });
  };

  const getTitle = () => {
    switch (destination) {
      case 'payment':
        return 'Complete Your Order';
      case 'free_trial':
      case 'whatsapp_trial':
        return 'Get Your Free Trial';
      default:
        return 'Contact Information';
    }
  };

  const getDescription = () => {
    switch (destination) {
      case 'payment':
        return `Enter your contact details to complete your ${brandName} purchase. We'll send your login credentials to this email.`;
      case 'free_trial':
      case 'whatsapp_trial':
        return `Enter your contact details to receive your free 24-hour ${brandName} trial credentials.`;
      default:
        return 'Please provide your contact information.';
    }
  };

  const getButtonText = () => {
    if (isSubmitting) return 'Processing...';
    switch (destination) {
      case 'payment':
        return 'Continue to Payment';
      case 'free_trial':
      case 'whatsapp_trial':
        return 'Request Free Trial';
      default:
        return 'Continue';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
        data-testid="modal-overlay"
      />
      
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors"
          data-testid="button-close-modal"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="text-center mb-6">
          <div 
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: `${primaryColor}20` }}
          >
            <Mail className="w-8 h-8" style={{ color: primaryColor }} />
          </div>
          <h2 className="text-2xl font-bold mb-2">{getTitle()}</h2>
          <p className="text-muted-foreground text-sm">{getDescription()}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1.5">
              Email Address <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-destructive focus:ring-destructive/50' : 'border-border focus:ring-primary/50'
                }`}
                data-testid="input-lead-email"
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1.5">
              Phone Number <span className="text-muted-foreground">(optional)</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
                  errors.phone ? 'border-destructive focus:ring-destructive/50' : 'border-border focus:ring-primary/50'
                }`}
                data-testid="input-lead-phone"
                disabled={isSubmitting}
              />
            </div>
            {errors.phone && (
              <p className="text-sm text-destructive mt-1">{errors.phone}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
            style={{ backgroundColor: primaryColor }}
            data-testid="button-submit-lead"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {getButtonText()}
              </>
            ) : (
              getButtonText()
            )}
          </button>

          <p className="text-xs text-center text-muted-foreground">
            By continuing, you agree to receive communications from {brandName}. 
            Your information is secure and will never be shared.
          </p>
        </form>
      </div>
    </div>
  );
}
