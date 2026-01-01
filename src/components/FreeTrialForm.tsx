import { useState } from 'react';
import { MessageCircle, Send, Mail } from 'lucide-react';
import LeadCaptureModal from './LeadCaptureModal';
import { submitLead } from '../utils/lead-capture';

interface ContactInfo {
  whatsappNumber?: string;
  telegramUsername?: string;
  supportEmail?: string;
}

interface FreeTrialFormProps {
  brandName: string;
  primaryColor: string;
  contactInfo: ContactInfo;
  leadCaptureEnabled?: boolean;
  adminApiUrl?: string;
  websiteId?: string;
}

export default function FreeTrialForm({
  brandName,
  primaryColor,
  contactInfo,
  leadCaptureEnabled = true,
  adminApiUrl,
  websiteId,
}: FreeTrialFormProps) {
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<'whatsapp' | 'telegram' | 'email' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const whatsappNumber = contactInfo.whatsappNumber;
  const telegramUsername = contactInfo.telegramUsername;
  const supportEmail = contactInfo.supportEmail;

  const getWhatsAppLink = () => {
    if (!whatsappNumber) return null;
    const message = `Hello ${brandName}, I'd like to request a 24-hour free trial!`;
    return `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
  };

  const getTelegramLink = () => {
    if (!telegramUsername) return null;
    return `https://t.me/${telegramUsername.replace('@', '')}`;
  };

  const getEmailLink = () => {
    if (!supportEmail) return null;
    return `mailto:${supportEmail}?subject=Free Trial Request&body=Hello ${brandName}, I'd like to request a 24-hour free trial.`;
  };

  const handleContactClick = (destination: 'whatsapp' | 'telegram' | 'email', e: React.MouseEvent) => {
    if (leadCaptureEnabled) {
      e.preventDefault();
      setSelectedDestination(destination);
      setShowLeadModal(true);
    }
  };

  const handleLeadSubmit = async (data: { email: string; phone: string }) => {
    if (!selectedDestination) return;

    setIsSubmitting(true);
    
    const source = selectedDestination === 'whatsapp' ? 'whatsapp_trial' : 'free_trial';
    
    await submitLead(data, {
      adminApiUrl,
      websiteId,
      source,
      metadata: { 
        contactMethod: selectedDestination,
        requestedAt: new Date().toISOString(),
      },
    });
    
    setIsSubmitting(false);
    setShowLeadModal(false);
    
    let link: string | null = null;
    switch (selectedDestination) {
      case 'whatsapp':
        link = getWhatsAppLink();
        break;
      case 'telegram':
        link = getTelegramLink();
        break;
      case 'email':
        link = getEmailLink();
        break;
    }

    if (link) {
      window.open(link, '_blank');
    }
  };

  const steps = [
    { number: 1, title: 'Contact Us', description: 'Send us a message via WhatsApp or Telegram' },
    { number: 2, title: 'Get Your Credentials', description: 'Receive your trial login details within minutes' },
    { number: 3, title: 'Start Watching', description: 'Enjoy 24 hours of premium IPTV content' },
  ];

  return (
    <>
      <div 
        className="rounded-2xl p-8 text-white"
        style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}cc 100%)` }}
      >
        <h2 className="text-2xl font-bold mb-6">Request Your Free Trial</h2>
        
        <div className="space-y-4 mb-8">
          {steps.map((step) => (
            <div key={step.number} className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 font-bold">
                {step.number}
              </div>
              <div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-sm text-white/80">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {whatsappNumber && (
            <a
              href={getWhatsAppLink() || '#'}
              onClick={(e) => handleContactClick('whatsapp', e)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-[#25D366] text-white rounded-lg font-semibold hover:bg-[#22c55e] transition-colors"
              data-testid="button-whatsapp-trial"
            >
              <MessageCircle className="w-5 h-5" />
              Request via WhatsApp
            </a>
          )}
          
          {telegramUsername && (
            <a
              href={getTelegramLink() || '#'}
              onClick={(e) => handleContactClick('telegram', e)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-[#0088cc] text-white rounded-lg font-semibold hover:bg-[#0077b5] transition-colors"
              data-testid="button-telegram-trial"
            >
              <Send className="w-5 h-5" />
              Request via Telegram
            </a>
          )}
          
          {supportEmail && (
            <a
              href={getEmailLink() || '#'}
              onClick={(e) => handleContactClick('email', e)}
              className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors"
              data-testid="button-email-trial"
            >
              <Mail className="w-5 h-5" />
              Request via Email
            </a>
          )}
        </div>

        <p className="text-center text-sm text-white/70 mt-6">
          Average response time: Under 5 minutes
        </p>
      </div>

      {showLeadModal && (
        <LeadCaptureModal
          isOpen={showLeadModal}
          onClose={() => setShowLeadModal(false)}
          onSubmit={handleLeadSubmit}
          destination="free_trial"
          brandName={brandName}
          primaryColor={primaryColor}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
}
