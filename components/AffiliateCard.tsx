import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AffiliateCardProps {
  title: string;
  description: string;
  buttonText: string;
  link: string;
  image?: string;
  theme?: 'blue' | 'green' | 'dark' | 'purple';
}

const themeStyles = {
  blue: {
    gradient: 'from-blue-600 to-blue-800',
    button: 'bg-yellow-400 hover:bg-yellow-500 text-gray-900',
    badge: 'bg-blue-500/30 text-blue-100',
  },
  green: {
    gradient: 'from-emerald-600 to-emerald-800',
    button: 'bg-white hover:bg-gray-100 text-emerald-900',
    badge: 'bg-emerald-500/30 text-emerald-100',
  },
  dark: {
    gradient: 'from-slate-800 to-slate-900',
    button: 'bg-green-400 hover:bg-green-500 text-gray-900',
    badge: 'bg-slate-700/50 text-slate-200',
  },
  purple: {
    gradient: 'from-purple-600 to-indigo-700',
    button: 'bg-white hover:bg-gray-100 text-purple-900',
    badge: 'bg-purple-500/30 text-purple-100',
  },
};

export default function AffiliateCard({
  title,
  description,
  buttonText,
  link,
  image,
  theme = 'dark',
}: AffiliateCardProps) {
  const styles = themeStyles[theme];

  return (
    <div className="relative my-8">
      {/* Partner Badge */}
      <div className="absolute -top-3 left-4 z-10">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${styles.badge} backdrop-blur-sm border border-white/10`}>
          ✨ Partenaire
        </span>
      </div>

      {/* Main Card */}
      <div className={`bg-gradient-to-r ${styles.gradient} rounded-2xl shadow-xl overflow-hidden border border-white/10`}>
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Left Side: Content */}
            <div className="flex-1 space-y-3">
              {/* Logo/Image */}
              {image && (
                <div className="mb-4">
                  <img 
                    src={image} 
                    alt={title} 
                    className="h-8 w-auto object-contain"
                  />
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                {title}
              </h3>

              {/* Description */}
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                {description}
              </p>
            </div>

            {/* Right Side: CTA Button */}
            <div className="w-full md:w-auto flex-shrink-0">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className={`inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold text-base md:text-lg transition-all duration-200 transform hover:scale-105 shadow-lg ${styles.button} w-full md:w-auto whitespace-nowrap`}
              >
                {buttonText}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Subtle Bottom Accent */}
        <div className="h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>
    </div>
  );
}
