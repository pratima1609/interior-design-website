import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenConsultation }) => {
  return (
    <footer className="bg-[#1C1B1A] text-[#FBFBFA] pt-20 pb-12 border-t border-[#2F2D2A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[#2F2D2A]">
          
          {/* Col 1 & 2: Studio Statement */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-serif text-2xl tracking-[0.16em] uppercase">
              SAMYAK INTERIORS
            </h3>
            <p className="text-xs text-[#A89885] font-sans leading-relaxed max-w-sm">
              An international interior architecture atelier dedicated to quiet permanence, tactile materiality, and the contemplative choreography of daylight.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.16em] font-medium text-[#FBFBFA] border-b border-[#A89885] pb-1 hover:text-[#C8B8A6] transition-colors cursor-pointer"
              >
                <span>Initiate a Commission</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C8B8A6]" />
              </button>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#8C7764]">
              Portfolio & Studio
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C8B8A6]/90 font-sans">
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-white transition-colors cursor-pointer">
                  Selected Work
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('project-the-terra-residence')} className="hover:text-white transition-colors cursor-pointer">
                  The Terra Residence
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                  Studio Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer">
                  Architectural Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Inquiry & Consultations
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Locations */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#8C7764]">
              Studio Ateliers
            </h4>
            <div className="space-y-3 text-xs text-[#C8B8A6]/80 font-sans">
              <div>
                <span className="text-[#FBFBFA] font-medium block">Kyoto Atelier</span>
                <span>Higashiyama-ku, Kyoto 605-0862</span>
              </div>
              <div>
                <span className="text-[#FBFBFA] font-medium block">Tokyo Gallery</span>
                <span>Minato-ku, Minami-Aoyama 107-0062</span>
              </div>
              <div>
                <span className="text-[#FBFBFA] font-medium block">London Office</span>
                <span>Mayfair, London W1K 3QH</span>
              </div>
            </div>
          </div>

          {/* Col 5: Headless CMS Portal */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#8C7764]">
              Curator Access
            </h4>
            <p className="text-xs text-[#A89885] leading-relaxed">
              Studio directors and curators manage projects, inquiry records, and MySQL relational schemas.
            </p>
            <button
              onClick={() => onNavigate('cms')}
              className="px-4 py-2 text-[11px] uppercase tracking-[0.16em] font-medium bg-[#2B2927] hover:bg-[#3D3A36] text-[#FBFBFA] transition-colors rounded cursor-pointer"
            >
              Headless CMS Portal
            </button>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#7D766D] font-sans gap-4">
          <div>
            © {new Date().getFullYear()} FORMA | Samyak Interiors Atelier. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <button onClick={() => onNavigate('contact')} className="hover:text-[#C8B8A6] transition-colors cursor-pointer">
              Direct Contact
            </button>
            <button onClick={() => onNavigate('cms')} className="hover:text-[#C8B8A6] transition-colors cursor-pointer">
              Database Engine
            </button>
            <span>Architectural Digest Honoree</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
