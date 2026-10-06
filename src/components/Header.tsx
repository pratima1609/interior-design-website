import React from 'react';
import { Search, Menu } from 'lucide-react';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenSearch: () => void;
  onOpenConsultation: () => void;
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  onOpenSearch,
  onOpenConsultation,
  onOpenMobileMenu,
}) => {
  const navLinks = [
    { label: 'Work', route: 'projects' },
    { label: 'The Terra Residence', route: 'project-the-terra-residence' },
    { label: 'About', route: 'about' },
    { label: 'Services', route: 'services' },
    { label: 'Contact', route: 'contact' },
    { label: 'Studio Portal', route: 'cms' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FBFBFA]/90 backdrop-blur-md border-b border-[#E8E4DC] transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        
        {/* Zone 1: Brand Wordmark (Single text element in editorial serif) */}
        <button
          onClick={() => onNavigate('home')}
          className="text-xl lg:text-2xl font-serif tracking-[0.18em] uppercase text-[#1C1B1A] hover:opacity-80 transition-opacity text-left whitespace-nowrap cursor-pointer"
        >
          SAMYAK INTERIORS
        </button>

        {/* Zone 2: Navigation Links (Text with subtle hover underline) */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-[0.15em] font-medium text-[#4A4845]">
          {navLinks.map((link) => {
            const isActive = currentRoute === link.route || (link.route === 'projects' && currentRoute.startsWith('project-') && link.route !== currentRoute);
            return (
              <button
                key={link.route}
                onClick={() => onNavigate(link.route)}
                className={`py-1 relative transition-colors whitespace-nowrap cursor-pointer ${
                  isActive ? 'text-[#1C1B1A] font-semibold' : 'hover:text-[#1C1B1A]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#8C7764]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Search & Consultation) */}
        <div className="flex items-center space-x-3 lg:space-x-4">
          <button
            onClick={onOpenSearch}
            aria-label="Search projects and materials"
            className="p-2.5 text-[#4A4845] hover:text-[#1C1B1A] hover:bg-[#F3EFE8] rounded-full transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4 stroke-[1.75]" />
          </button>

          <button
            onClick={onOpenConsultation}
            className="hidden sm:inline-flex items-center px-5 py-2 text-xs uppercase tracking-[0.15em] font-medium text-[#1C1B1A] bg-transparent border border-[#1C1B1A] hover:bg-[#1C1B1A] hover:text-[#FBFBFA] transition-all duration-200 whitespace-nowrap cursor-pointer"
          >
            Book Consultation
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={onOpenMobileMenu}
            aria-label="Open mobile navigation drawer"
            className="p-2 lg:hidden text-[#1C1B1A] hover:bg-[#F3EFE8] rounded-md transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

      </div>
    </header>
  );
};
