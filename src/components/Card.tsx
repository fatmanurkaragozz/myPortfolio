import { ReactNode, useState, useRef } from 'react';
import { useLanguage } from '../i18n/useLanguage';

interface CardProps {
  title?: string;
  children: ReactNode;
  image?: string | string[];
  imageAlt?: string;
  footer?: ReactNode;
  variant?: "elevated" | "outlined" | "filled";
  className?: string;
  onClick?: () => void;
  imageClassName?: string;
  imageFit?: "cover" | "contain";
}

export default function Card({
  title,
  children,
  image,
  imageAlt,
  footer,
  variant = "elevated",
  className = "",
  onClick,
  imageClassName,
  imageFit,
}: CardProps) {
  const { t } = useLanguage();
  const variants = {
    elevated: `bg-white dark:bg-gray-800 shadow-md hover:shadow-lg`,
    outlined: `bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700`,
    filled: `bg-gray-100 dark:bg-gray-800`,
  };

  const images = Array.isArray(image) ? image : image ? [image] : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      if (clientWidth > 0) {
        const index = Math.round(scrollLeft / clientWidth);
        setActiveIndex(index);
      }
    }
  };

  const scrollToImage = (index: number) => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      containerRef.current.scrollTo({
        left: index * clientWidth,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  const singleImageClass = imageClassName || (
    imageFit === "contain"
      ? "w-full h-60 object-contain bg-slate-50 dark:bg-slate-900/40 p-2 transition-transform duration-500 group-hover:scale-102"
      : "w-full h-60 object-cover object-top transition-transform duration-500 group-hover:scale-105"
  );

  const carouselImageClass = imageClassName || (
    imageFit === "contain"
      ? "w-full h-full object-contain bg-slate-50 dark:bg-slate-900/40 p-2"
      : "w-full h-full object-cover object-top"
  );

  return (
    <div 
      className={`rounded-xl overflow-hidden transition-all duration-300 ${variants[variant]} ${className} ${
        onClick ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98] duration-300 hover:shadow-xl' : ''
      }`}
      onClick={onClick}
    >
          {images.length > 0 && (
            <div className={`relative group/carousel w-full overflow-hidden select-none bg-slate-100 dark:bg-slate-900 ${
              imageClassName ? '' : 'h-60'
            }`}>
              {images.length === 1 ? (
                <img
                  src={images[0]}
                  alt={imageAlt || ""}
                  className={singleImageClass}
                  style={{ imageRendering: 'auto' }}
                />
              ) : (
                <>
                  {/* Scrollable Container */}
                  <div
                    ref={containerRef}
                    onScroll={handleScroll}
                    className={`flex w-full overflow-x-auto snap-x snap-mandatory no-scrollbar ${
                      imageClassName ? '' : 'h-full'
                    }`}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {images.map((imgUrl, idx) => (
                      <div key={idx} className="w-full h-full flex-shrink-0 snap-start">
                        <img
                          src={imgUrl}
                          alt={[imageAlt, t('card.image', { n: idx + 1 })].filter(Boolean).join(' - ')}
                          className={carouselImageClass}
                          style={{ imageRendering: 'auto' }}
                          draggable={false}
                        />
                      </div>
                    ))}
                  </div>

              {/* Left Arrow Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  scrollToImage(activeIndex > 0 ? activeIndex - 1 : images.length - 1);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/60 dark:bg-slate-800/60 hover:bg-blue-600 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 backdrop-blur-md z-20 shadow-lg cursor-pointer"
                aria-label={t('card.prev')}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Right Arrow Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  scrollToImage(activeIndex < images.length - 1 ? activeIndex + 1 : 0);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/60 dark:bg-slate-800/60 hover:bg-blue-600 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 backdrop-blur-md z-20 shadow-lg cursor-pointer"
                aria-label={t('card.next')}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 px-2.5 py-1 bg-slate-900/40 dark:bg-slate-800/40 backdrop-blur-md rounded-full shadow-md">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      scrollToImage(idx);
                    }}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === idx ? 'bg-white w-3' : 'bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={t('card.image', { n: idx + 1 })}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
      <div className="p-5">
        {title && (
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {title}
          </h3>
        )}
        <div className="text-gray-600 dark:text-gray-400">
          {children}
        </div>
      </div>
      {footer && (
        <div 
          className="px-5 py-3 bg-gray-50/50 dark:bg-black/20 border-t border-gray-100 dark:border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
