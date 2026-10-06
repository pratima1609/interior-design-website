import React, { useEffect } from 'react';
import { X, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenConsultation: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  currentRoute,
  onNavigate,
  onOpenConsultation,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const links = [
    { label: 'Selected Work', route: 'projects' },
    { label: 'The Terra Residence', route: 'project-the-terra-residence' },
    { label: 'Studio Philosophy & About', route: 'about' },
    { label: 'Design Services', route: 'services' },
    { label: 'Contact & Inquiry', route: 'contact' },
    { label: 'Headless CMS Portal', route: 'cms' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1C1B1A]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-[#FBFBFA] h-full shadow-2xl flex flex-col justify-between p-8 sm:p-10 z-10 overflow-y-auto">
        <div>
          {/* Top Row */}
          <div className="flex items-center justify-between pb-8 border-b border-[#E8E4DC]">
            <span className="font-serif tracking-[0.18em] uppercase text-sm font-semibold text-[#1C1B1A]">
              SAMYAK INTERIORS
            </span>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="p-2 text-[#4A4845] hover:text-[#1C1B1A] transition-colors rounded-full hover:bg-[#F3EFE8] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 space-y-6">
            {links.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => {
                    onNavigate(link.route);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between py-2 text-left group cursor-pointer"
                >
                  <span
                    className={`font-serif text-xl sm:text-2xl transition-colors ${
                      isActive
                        ? 'text-[#8C7764] font-medium'
                        : 'text-[#1C1B1A] group-hover:text-[#8C7764]'
                    }`}
                  >
                    {link.label}
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isActive
                        ? 'text-[#8C7764] translate-x-1'
                        : 'text-[#C8B8A6] opacity-0 group-hover:opacity-100 group-hover:translate-x-1'
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom studio details & booking action */}
        <div className="pt-8 mt-8 border-t border-[#E8E4DC] space-y-6">
          <button
            onClick={() => {
              onClose();
              onOpenConsultation();
            }}
            className="w-full py-3.5 px-6 text-xs uppercase tracking-[0.18em] font-medium text-white bg-[#1C1B1A] hover:bg-[#33312E] transition-colors text-center cursor-pointer"
          >
            Schedule Consultation
          </button>

          <div className="space-y-3 text-xs text-[#5E5A54] font-sans">
            <div className="flex items-center space-x-3">
              <Mail className="w-3.5 h-3.5 text-[#8C7764]" />
              <span>atelier@samyakinteriors.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-3.5 h-3.5 text-[#8C7764]" />
              <span className="tabular-nums">+81 75 744 1920 / +44 20 7946 0880</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-3.5 h-3.5 text-[#8C7764]" />
              <span>Kyoto Atelier · London Studio · Tokyo Gallery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
