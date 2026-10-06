import React, { useState } from 'react';
import { Check, Clock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { ServiceItem } from '../types.ts';

interface ServicesPageProps {
  services: ServiceItem[];
  onOpenConsultationWithService: (serviceTitle: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  services,
  onOpenConsultationWithService,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Residential', 'Commercial', 'Renovation', 'Furniture', 'Turnkey'];

  const filteredServices = services.filter((s) => {
    if (selectedCategory === 'All') return true;
    return (
      s.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      s.category.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-[#FBFBFA] py-16 lg:py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C7764]">
            FORMA | Samyak Interiors — Services
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1C1B1A] leading-tight">
            Architectural Services & Commission Tiers
          </h1>
          <p className="text-sm sm:text-base text-[#4A4845] font-sans font-light leading-relaxed">
            Our atelier provides tailored engagement models spanning full-spectrum architectural design, heritage restoration, bespoke furniture curation, and turnkey realization.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 border-b border-[#E8E4DC]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#1C1B1A] text-white shadow-sm'
                  : 'bg-[#F2EFE9] hover:bg-[#EAE5DC] text-[#4A4845]'
              }`}
            >
              {cat === 'All' ? 'All Services' : cat}
            </button>
          ))}
        </div>

        {/* Services List / Cards */}
        <div className="space-y-16">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="bg-[#FAF8F5] border border-[#E8E4DC] p-8 sm:p-12 hover:border-[#8C7764] transition-all duration-300 space-y-8"
            >
              {/* Header row */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-[#E8E4DC]">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center space-x-3 text-xs text-[#8C7764] font-medium uppercase tracking-wider font-sans">
                    <span className="tabular-nums font-serif">0{index + 1}.</span>
                    <span>{service.category}</span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A]">
                    {service.title}
                  </h2>
                  <p className="text-sm sm:text-base text-[#4A4845] font-sans font-light leading-relaxed">
                    {service.tagLine}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 font-sans text-xs">
                  <div className="text-left lg:text-right">
                    <span className="text-[#8C7764] uppercase tracking-wider text-[10px] block">
                      Estimated Duration
                    </span>
                    <span className="font-semibold text-[#1C1B1A] text-sm tabular-nums">
                      {service.timeline}
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenConsultationWithService(service.title)}
                    className="px-6 py-3 bg-[#1C1B1A] text-white text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#33312E] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Inquire For This Service
                  </button>
                </div>
              </div>

              {/* Grid: Deliverables vs Inclusions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 font-sans text-xs">
                
                {/* Deliverables */}
                <div className="space-y-4">
                  <h3 className="uppercase tracking-wider text-[#8C7764] font-semibold flex items-center space-x-2">
                    <span>Key Strategic Deliverables</span>
                  </h3>
                  <ul className="space-y-3">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-[#33312E]">
                        <span className="text-[#8C7764] font-serif text-sm tabular-nums mt-0.5">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Inclusions Checklist */}
                <div className="space-y-4 bg-[#F5F2EB] p-6 border border-[#E8E4DC]">
                  <h3 className="uppercase tracking-wider text-[#1C1B1A] font-semibold flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-[#8C7764]" />
                    <span>Inclusions Checklist</span>
                  </h3>
                  <ul className="space-y-3">
                    {service.inclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5 text-[#33312E]">
                        <Check className="w-3.5 h-3.5 text-[#8C7764] shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Custom Tailored Commissions */}
        <div className="bg-[#1C1B1A] text-[#FBFBFA] p-10 sm:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#C8B8A6]">
              Custom Engagement
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-white">
              Multi-property portfolios or bespoke commissions?
            </h3>
            <p className="text-xs sm:text-sm text-[#C8B8A6]/80 font-sans leading-relaxed">
              For private family offices, hotel groups, or collectors requiring bespoke worldwide retainers, we formulate custom architectural scope frameworks.
            </p>
          </div>
          <button
            onClick={() => onOpenConsultationWithService('Custom Architectural Retainer')}
            className="px-8 py-4 bg-[#FBFBFA] text-[#1C1B1A] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#EAE5DC] transition-colors whitespace-nowrap cursor-pointer"
          >
            Direct Director Consultation
          </button>
        </div>

      </div>
    </div>
  );
};
