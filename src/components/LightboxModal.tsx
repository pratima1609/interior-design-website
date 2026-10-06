import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback.tsx';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
  title: string;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onPrev,
  onNext,
  title,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0C0B0A]/95 backdrop-blur-md">
      {/* Top Bar with title & close */}
      <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-20 text-white/90">
        <div className="text-xs uppercase tracking-[0.2em] font-medium text-[#C8B8A6]">
          <span>{title}</span>
          <span className="mx-2 text-white/40">/</span>
          <span className="tabular-nums">
            {currentIndex + 1} of {images.length}
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Viewport */}
      <div className="relative max-w-6xl max-h-[85vh] w-full px-4 sm:px-12 flex items-center justify-center">
        <div className="max-w-full max-h-[80vh] overflow-hidden flex items-center justify-center">
          <ImageWithFallback
            src={currentImage}
            alt={`${title} view ${currentIndex + 1}`}
            aspectRatioClass="aspect-16/10"
            className="w-full max-h-[80vh] object-contain shadow-2xl"
          />
        </div>

        {/* Previous & Next Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              aria-label="Previous image"
              className="absolute left-4 sm:left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={onNext}
              aria-label="Next image"
              className="absolute right-4 sm:right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Bottom Counter Thumbnails */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-20 px-4 overflow-x-auto">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (idx < currentIndex) onPrev();
              else if (idx > currentIndex) onNext();
            }}
            className={`w-12 h-8 overflow-hidden border transition-opacity cursor-pointer ${
              idx === currentIndex ? 'border-[#C8B8A6] opacity-100' : 'border-transparent opacity-40 hover:opacity-75'
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};
