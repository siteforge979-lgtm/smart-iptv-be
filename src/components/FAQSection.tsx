import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  showHeader?: boolean;
  translations?: {
    title: string;
    subtitle: string;
  };
}

export default function FAQSection({ items, showHeader = true, translations }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = translations || { title: 'Frequently Asked Questions', subtitle: 'Find answers to common questions about our service.' };

  return (
    <section className="py-12" itemScope itemType="https://schema.org/FAQPage">
      <div className="container mx-auto px-4 max-w-3xl">
        {showHeader && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" data-speakable="true">{t.title}</h2>
            <p className="text-muted-foreground" data-speakable="true">
              {t.subtitle}
            </p>
          </div>
        )}

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-lg border border-border bg-card overflow-hidden"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-4 text-left font-medium transition-colors hover:bg-accent/50"
                aria-expanded={openIndex === index}
              >
                <h3 className="pr-4 text-base font-medium" itemProp="name" data-speakable="true">{item.question}</h3>
                <ChevronDown
                  className={clsx(
                    "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={clsx(
                  "grid transition-all duration-200",
                  openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <div className="p-4 pt-0 text-muted-foreground prose prose-sm dark:prose-invert max-w-none" itemProp="text" data-speakable="true">
                    <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
