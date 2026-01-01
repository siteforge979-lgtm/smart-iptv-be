import { MessageCircle, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';

interface StickyContactButtonProps {
  whatsappNumber?: string;
  telegramUsername?: string;
  primaryColor?: string;
  brandName?: string;
}

export default function StickyContactButton({
  whatsappNumber,
  telegramUsername,
  primaryColor = '#25D366',
  brandName = 'Premium IPTV',
}: StickyContactButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const whatsappLink = whatsappNumber 
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello ${brandName}, I have a question about your service.`)}`
    : null;

  const telegramLink = telegramUsername 
    ? `https://t.me/${telegramUsername.replace('@', '')}`
    : null;

  if (!whatsappLink && !telegramLink) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {isExpanded && (
        <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {whatsappLink && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">WhatsApp</span>
            </a>
          )}
          {telegramLink && (
            <a
              href={telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 bg-[#0088cc] text-white rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">Telegram</span>
            </a>
          )}
        </div>
      )}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={clsx(
          "w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110",
          isExpanded ? "bg-muted-foreground" : "bg-[#25D366]"
        )}
        aria-label={isExpanded ? "Close contact options" : "Open contact options"}
      >
        {isExpanded ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {!isExpanded && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
      )}
    </div>
  );
}
