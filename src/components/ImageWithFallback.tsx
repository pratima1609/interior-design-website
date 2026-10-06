import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  aspectRatioClass?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  aspectRatioClass = 'aspect-4/3',
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#ECE8E1] ${aspectRatioClass} ${className}`}>
      {/* Skeleton / Ambient backdrop */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-[#E6E1D8] animate-pulse" />
      )}

      {!error ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...props}
        />
      ) : (
        /* Refined architectural fallback */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#F3F0EA] border border-[#E2DDD3]">
          <svg
            className="w-10 h-10 mb-3 text-[#A89885] stroke-current stroke-1"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.2" />
            <path d="M3 9H21" stroke="currentColor" strokeWidth="1.2" />
            <path d="M9 21V9" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <span className="text-xs uppercase tracking-widest text-[#7D7063] font-medium font-sans">
            Architectural Study
          </span>
          <span className="text-sm font-serif italic text-[#1C1B1A] mt-1 max-w-[200px] truncate">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
};
