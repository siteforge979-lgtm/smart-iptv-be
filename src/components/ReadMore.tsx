import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ReadMoreProps {
  children: React.ReactNode;
  previewHeight?: number;
  buttonText?: string;
  expandedButtonText?: string;
  translations?: {
    readMore?: string;
    showLess?: string;
  };
}

export default function ReadMore({ 
  children, 
  previewHeight = 400,
  buttonText,
  expandedButtonText,
  translations = {},
}: ReadMoreProps) {
  const readMoreLabel = buttonText || translations.readMore || "Read More";
  const showLessLabel = expandedButtonText || translations.showLess || "Show Less";
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      <div 
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          !isExpanded ? 'relative' : ''
        }`}
        style={{ 
          maxHeight: isExpanded ? 'none' : `${previewHeight}px`,
        }}
      >
        {children}
        
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        )}
      </div>
      
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:opacity-90"
        >
          {isExpanded ? (
            <>
              {showLessLabel}
              <ChevronUp className="h-5 w-5" />
            </>
          ) : (
            <>
              {readMoreLabel}
              <ChevronDown className="h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
