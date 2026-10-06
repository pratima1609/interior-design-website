import React from 'react';
import { ArrowRight, Globe2, Award, Clock, Users, BookOpen } from 'lucide-react';
import { StudioCMS } from '../types.ts';
import { ImageWithFallback } from '../components/ImageWithFallback.tsx';

interface AboutPageProps {
  cms: StudioCMS;
  onNavigate: (route: string) => void;
  onOpenConsultation: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  cms,
  onNavigate,
  onOpenConsultation,
}) => {
  return (
    <div className="min-h-screen bg-[#FBFBFA] py-16 lg:py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* -------------------------------------------------------------
            1. ABOUT HEADER & PORTRAIT SPLIT
        ------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C7764]">
              FORMA INTERIORS — About Us
            </div>
            
            <h1 className="font-serif text-4xl sm:text-6xl text-[#1C1B1A] leading-[1.1]">
              Samyak Interiors: Crafting the architecture of stillness.
            </h1>

            <p className="text-base sm:text-lg text-[#4A4845] font-sans font-light leading-relaxed">
              {cms.biography}
            </p>

            <p className="text-sm text-[#5E5A54] font-sans leading-relaxed">
              Founded over a decade ago after architectural apprenticeships in Kyoto and Zurich, principal architect Samyak established the studio around a singular premise: that domestic architecture should serve as a sacred restorative vessel rather than an exhibition of transient luxury.
            </p>

            <blockquote className="border-l-2 border-[#8C7764] pl-6 py-2 italic font-serif text-xl text-[#1C1B1A]">
              "{cms.founderQuote}"
            </blockquote>
          </div>

          {/* Designer Portrait (Resilient Image container with Zero-Broken Policy) */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden bg-[#E2DDCF] shadow-lg border border-[#E0DBD0]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
                alt="Principal Architect & Founder Samyak"
                aspectRatioClass="aspect-3/4"
                className="brightness-[0.95] contrast-[1.05]"
              />
              <div className="p-6 bg-[#FAF8F5] border-t border-[#E8E4DC] space-y-1">
                <div className="font-serif text-xl text-[#1C1B1A]">
                  Samyak
                </div>
                <div className="text-xs text-[#7D766D] font-sans">
                  Principal Architect & Creative Director · Royal Institute of British Architects Fellow
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* -------------------------------------------------------------
            2. STUDIO STATISTICS (Tabular Numerals)
        ------------------------------------------------------------- */}
        <div className="bg-[#F4F1EA] border-y border-[#E8E4DC] p-8 sm:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
            <div className="space-y-1">
              <div className="font-serif text-4xl sm:text-5xl text-[#1C1B1A] tabular-nums">
                {cms.stats.experienceYears}
              </div>
              <div className="text-xs uppercase tracking-wider text-[#8C7764] font-semibold">
                Years of Continuous Practice
              </div>
              <p className="text-[11px] text-[#7D766D] font-sans">
                Founded in 2016 in Kyoto
              </p>
            </div>

            <div className="space-y-1">
              <div className="font-serif text-4xl sm:text-5xl text-[#1C1B1A] tabular-nums">
                {cms.stats.projectsCount}
              </div>
              <div className="text-xs uppercase tracking-wider text-[#8C7764] font-semibold">
                Architectural Commissions
              </div>
              <p className="text-[11px] text-[#7D766D] font-sans">
                Residential & cultural monographs
              </p>
            </div>

            <div className="space-y-1">
              <div className="font-serif text-4xl sm:text-5xl text-[#1C1B1A] tabular-nums">
                {cms.stats.citiesCount}
              </div>
              <div className="text-xs uppercase tracking-wider text-[#8C7764] font-semibold">
                Metropolitan Cities
              </div>
              <p className="text-[11px] text-[#7D766D] font-sans">
                From Tokyo to Geneva & London
              </p>
            </div>

            <div className="space-y-1">
              <div className="font-serif text-4xl sm:text-5xl text-[#1C1B1A] tabular-nums">
                {cms.stats.clientsCount}
              </div>
              <div className="text-xs uppercase tracking-wider text-[#8C7764] font-semibold">
                Private Patrons
              </div>
              <p className="text-[11px] text-[#7D766D] font-sans">
                Curators, botanists & collectors
              </p>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------
            3. CORE METHODOLOGY & CRAFT
        ------------------------------------------------------------- */}
        <div className="space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C7764]">
              Working Methodology
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A]">
              How We Sculpt Architectural Space
            </h2>
            <p className="text-sm text-[#5E5A54] font-sans">
              A disciplined, phased execution that safeguards artistic vision and construction precision from conception to turnkey occupancy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cms.methodologySteps.map((step) => (
              <div
                key={step.number}
                className="p-8 bg-[#FAF8F5] border border-[#E8E4DC] hover:border-[#8C7764] transition-colors space-y-4"
              >
                <div className="font-serif text-3xl text-[#8C7764] tabular-nums">
                  {step.number}
                </div>
                <h3 className="font-serif text-xl text-[#1C1B1A]">
                  {step.title}
                </h3>
                <div className="text-[11px] uppercase tracking-wider text-[#7D766D] font-medium">
                  {step.subtitle}
                </div>
                <p className="text-xs text-[#5E5A54] font-sans leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* -------------------------------------------------------------
            4. STUDIO ATELIERS & VISITING
        ------------------------------------------------------------- */}
        <div className="pt-12 border-t border-[#E8E4DC] space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C7764]">
              Presence
            </span>
            <h2 className="font-serif text-3xl text-[#1C1B1A]">
              Our Studio Locations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-sans">
            <div className="p-6 bg-[#FAF8F5] border border-[#E8E4DC] space-y-2">
              <h4 className="font-serif text-lg text-[#1C1B1A]">Kyoto Head Atelier</h4>
              <p className="text-[#5E5A54] leading-relaxed">
                Higashiyama-ku, Kyoto 605-0862<br />
                Material library, wood joinery workshop & tea pavilion.
              </p>
              <div className="text-[#8C7764] font-medium pt-2">By private appointment only</div>
            </div>

            <div className="p-6 bg-[#FAF8F5] border border-[#E8E4DC] space-y-2">
              <h4 className="font-serif text-lg text-[#1C1B1A]">Tokyo Gallery</h4>
              <p className="text-[#5E5A54] leading-relaxed">
                Minato-ku, Minami-Aoyama 107-0062<br />
                Contemporary furniture curation & lighting gallery.
              </p>
              <div className="text-[#8C7764] font-medium pt-2">By private appointment only</div>
            </div>

            <div className="p-6 bg-[#FAF8F5] border border-[#E8E4DC] space-y-2">
              <h4 className="font-serif text-lg text-[#1C1B1A]">London Office</h4>
              <p className="text-[#5E5A54] leading-relaxed">
                Mayfair, London W1K 3QH<br />
                European client liaison & heritage advisory.
              </p>
              <div className="text-[#8C7764] font-medium pt-2">By private appointment only</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-10 bg-[#F4F1EA] border border-[#E8E4DC] text-center space-y-4">
          <h3 className="font-serif text-3xl text-[#1C1B1A]">
            Discuss an Upcoming Architectural Vision
          </h3>
          <p className="text-xs text-[#5E5A54] max-w-md mx-auto font-sans leading-relaxed">
            Whether for a ground-up residence or historical restoration, our lead architects welcome thoughtful conversation.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenConsultation}
              className="px-8 py-3.5 bg-[#1C1B1A] text-white text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#33312E] transition-colors cursor-pointer"
            >
              Book Studio Consultation
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
