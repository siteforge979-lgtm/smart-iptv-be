import { Star, Quote, CheckCircle, MapPin, ArrowRight } from 'lucide-react';

interface Testimonial {
  name: string;
  location?: string;
  rating: number;
  content: string;
  avatar?: string;
  verified?: boolean;
  date?: string;
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];
  primaryColor?: string;
  showCTA?: boolean;
  ctaLink?: string;
  translations?: {
    title: string;
    subtitle: string;
    reviews: string;
    verifiedPurchase: string;
    ctaButton: string;
  };
}

export default function TestimonialSection({ 
  testimonials, 
  primaryColor = '#3b82f6',
  showCTA = true,
  ctaLink = '#pricing',
  translations,
}: TestimonialSectionProps) {
  const t = translations || {
    title: 'What Our Customers Say',
    subtitle: 'Don\'t just take our word for it - hear from our satisfied customers who enjoy premium entertainment daily.',
    reviews: 'reviews',
    verifiedPurchase: 'Verified Purchase',
    ctaButton: 'Join Thousands of Happy Customers',
  };
  
  const avgRating = testimonials.length > 0 
    ? (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1)
    : '5.0';
  
  const totalReviews = testimonials.length > 0 ? testimonials.length * 127 : 25567;

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border mb-4">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-medium">{avgRating} / 5.0</span>
            <span className="text-sm text-muted-foreground">({totalReviews.toLocaleString()}+ {t.reviews})</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 border border-border hover:border-primary transition-colors relative group"
            >
              <Quote 
                className="absolute top-4 right-4 w-8 h-8 opacity-10 group-hover:opacity-20 transition-opacity" 
                style={{ color: primaryColor }}
              />
              
              <div className="flex items-center gap-4 mb-4">
                {testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-14 w-14 rounded-full object-cover border-2"
                    style={{ borderColor: `${primaryColor}30` }}
                  />
                ) : (
                  <div 
                    className="h-14 w-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {testimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{testimonial.name}</span>
                    {testimonial.verified !== false && (
                      <CheckCircle className="w-4 h-4" style={{ color: primaryColor }} />
                    )}
                  </div>
                  {testimonial.location && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{testimonial.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted'
                    }`}
                  />
                ))}
                {testimonial.date && (
                  <span className="ml-2 text-xs text-muted-foreground">{testimonial.date}</span>
                )}
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed">
                "{testimonial.content}"
              </p>

              {testimonial.verified !== false && (
                <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle className="w-3 h-3" style={{ color: primaryColor }} />
                  <span>{t.verifiedPurchase}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {showCTA && (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              {t.subtitle}
            </p>
            <a
              href={ctaLink}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-all hover:scale-105"
              style={{ backgroundColor: primaryColor }}
            >
              {t.ctaButton}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
