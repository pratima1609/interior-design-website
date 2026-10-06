import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { Project, ServiceItem } from '../types.ts';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  services: ServiceItem[];
  onSelectProject: (slug: string) => void;
  onSelectService: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  projects,
  services,
  onSelectProject,
  onSelectService,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredProjects = q
    ? projects.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.headline.toLowerCase().includes(q) ||
          p.materials?.some((m) => m.name.toLowerCase().includes(q) || m.texture.toLowerCase().includes(q))
      )
    : projects.slice(0, 3); // show initial 3 highlights when empty

  const filteredServices = q
    ? services.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.tagLine.toLowerCase().includes(q)
      )
    : [];

  const quickPills = ['Travertine', 'Residential', 'Kyoto', 'Commercial', 'Turnkey', 'Minimalism'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1C1B1A]/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FBFBFA] shadow-2xl border border-[#E0DBD0] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-[#E8E4DC]">
          <Search className="w-5 h-5 text-[#8C7764] mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, materials, rooms, or services..."
            className="w-full bg-transparent text-base sm:text-lg text-[#1C1B1A] placeholder-[#9C948A] focus:outline-none font-sans"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#8C7764] hover:text-[#1C1B1A] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] text-[#8C7764] bg-[#F1ECE3] border border-[#E0DBD0] rounded font-mono">
              ESC
            </kbd>
          )}
        </div>

        {/* Quick Suggestion Filters */}
        <div className="px-6 py-3 bg-[#F6F4EE] border-b border-[#E8E4DC] flex items-center gap-2 overflow-x-auto text-xs text-[#5E5A54]">
          <span className="shrink-0 text-[#8C7764] font-medium">Quick search:</span>
          {quickPills.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 text-xs bg-[#EBE6DD] hover:bg-[#E0DAD0] text-[#1C1B1A] transition-colors rounded cursor-pointer whitespace-nowrap"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
          {/* Projects Results */}
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-[#8C7764] font-semibold mb-3">
              {q ? `Architectural Projects (${filteredProjects.length})` : 'Featured Architecture'}
            </div>

            {filteredProjects.length === 0 ? (
              <p className="text-sm text-[#7D766D] italic py-3">No architectural projects matched "{query}".</p>
            ) : (
              <div className="space-y-3">
                {filteredProjects.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => {
                      onSelectProject(proj.slug);
                      onClose();
                    }}
                    className="p-3.5 hover:bg-[#F3EFE8] border border-transparent hover:border-[#E0DBD0] transition-all cursor-pointer group flex items-start justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-xs text-[#7D766D]">
                        <span>{proj.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{proj.location}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{proj.year}</span>
                      </div>
                      <h4 className="font-serif text-lg text-[#1C1B1A] group-hover:text-[#8C7764] transition-colors">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-[#5E5A54] line-clamp-1 max-w-lg font-sans">
                        {proj.headline}
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#C8B8A6] group-hover:text-[#1C1B1A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-1" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Services Results */}
          {filteredServices.length > 0 && (
            <div className="pt-4 border-t border-[#E8E4DC]">
              <div className="text-xs uppercase tracking-[0.18em] text-[#8C7764] font-semibold mb-3">
                Design Services ({filteredServices.length})
              </div>
              <div className="space-y-2">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => {
                      onSelectService(service.slug);
                      onClose();
                    }}
                    className="p-3 hover:bg-[#F3EFE8] border border-transparent hover:border-[#E0DBD0] transition-colors cursor-pointer group flex items-center justify-between"
                  >
                    <div>
                      <div className="text-sm font-medium text-[#1C1B1A] group-hover:text-[#8C7764] transition-colors">
                        {service.title}
                      </div>
                      <div className="text-xs text-[#7D766D]">{service.category}</div>
                    </div>
                    <span className="text-xs text-[#8C7764] font-medium">{service.timeline}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
