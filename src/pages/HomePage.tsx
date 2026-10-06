import React from 'react';
import { ArrowRight, ArrowUpRight, Compass, Layers, ShieldCheck, Sparkles } from 'lucide-react';
import { Project, StudioCMS, ServiceItem } from '../types.ts';
import { ImageWithFallback } from '../components/ImageWithFallback.tsx';

interface HomePageProps {
  projects: Project[];
  cms: StudioCMS;
  services: ServiceItem[];
  onNavigate: (route: string) => void;
  onOpenConsultation: () => void;
  onSelectProject: (slug: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  projects,
  cms,
  services,
  onNavigate,
  onOpenConsultation,
  onSelectProject,
}) => {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FBFBFA]">
      
      {/* -------------------------------------------------------------
          1. IMMERSIVE FULL-WIDTH EDITORIAL HERO
      ------------------------------------------------------------- */}
      <section className="relative w-full min-h-[92vh] flex flex-col justify-end overflow-hidden pb-16 lg:pb-24 px-6 lg:px-12 border-b border-[#E8E4DC]">
        {/* Background Editorial Architectural Photography */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90"
            alt="Editorial Interior Architecture"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center brightness-[0.88] contrast-[1.05]"
          />
          {/* Subtle measured scrim for editorial text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1A]/85 via-[#1C1B1A]/40 to-black/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full text-white">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center space-x-3 text-xs uppercase tracking-[0.22em] text-[#C8B8A6] font-medium">
              <span>FORMA INTERIORS</span>
              <span aria-hidden="true">·</span>
              <span>EST. 2016</span>
              <span aria-hidden="true">·</span>
              <span>KYOTO & LONDON</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight">
              Architecture of silence & tactile serenity.
            </h1>

            <p className="text-sm sm:text-base text-[#E5E0D8] font-sans font-light leading-relaxed max-w-xl">
              We design contemplative residences and bespoke commercial sanctuaries through monolithic stone volumes, honest Japanese joinery, and the choreographed dance of daylight.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('projects')}
                className="px-7 py-3.5 bg-[#FBFBFA] text-[#1C1B1A] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#EBE7DF] transition-all duration-200 cursor-pointer flex items-center space-x-2"
              >
                <span>Explore Selected Work</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenConsultation}
                className="px-7 py-3.5 bg-transparent border border-white/60 text-white text-xs uppercase tracking-[0.16em] font-medium hover:bg-white hover:text-[#1C1B1A] transition-all duration-200 cursor-pointer"
              >
                Book Studio Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Quiet metadata anchor */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-12 flex items-center justify-between text-xs text-[#C8B8A6] border-t border-white/15 mt-12 font-sans">
          <span>The Terra Residence · Featured Monograph</span>
          <span className="hidden sm:inline">Kyoto Highlands · 2025</span>
          <button
            onClick={() => onSelectProject('the-terra-residence')}
            className="hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
          >
            View Project Case Study →
          </button>
        </div>
      </section>

      {/* -------------------------------------------------------------
          2. STUDIO INTRODUCTION & NUMERICAL RIGOR
      ------------------------------------------------------------- */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C7764]">
              Studio Introduction
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1B1A] leading-tight">
              Rooted in the quiet integrity of raw earth and honest light.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-8 font-sans">
            <p className="text-base sm:text-lg text-[#4A4845] leading-relaxed font-light">
              {cms.biography}
            </p>

            <blockquote className="border-l-2 border-[#8C7764] pl-6 py-1 italic font-serif text-xl text-[#1C1B1A] leading-snug">
              "{cms.founderQuote}"
            </blockquote>

            {/* Studio Statistics (Natural Tabular Figures) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-[#E8E4DC]">
              <div>
                <div className="font-serif text-3xl sm:text-4xl text-[#1C1B1A] tabular-nums">
                  {cms.stats.experienceYears}
                </div>
                <div className="text-xs uppercase tracking-wider text-[#7D766D] mt-1 font-medium">
                  Years of Practice
                </div>
              </div>
              <div>
                <div className="font-serif text-3xl sm:text-4xl text-[#1C1B1A] tabular-nums">
                  {cms.stats.projectsCount}
                </div>
                <div className="text-xs uppercase tracking-wider text-[#7D766D] mt-1 font-medium">
                  Completed Works
                </div>
              </div>
              <div>
                <div className="font-serif text-3xl sm:text-4xl text-[#1C1B1A] tabular-nums">
                  {cms.stats.citiesCount}
                </div>
                <div className="text-xs uppercase tracking-wider text-[#7D766D] mt-1 font-medium">
                  Global Cities
                </div>
              </div>
              <div>
                <div className="font-serif text-3xl sm:text-4xl text-[#1C1B1A] tabular-nums">
                  {cms.stats.clientsCount}
                </div>
                <div className="text-xs uppercase tracking-wider text-[#7D766D] mt-1 font-medium">
                  Private Patrons
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          3. ASYMMETRIC FEATURED PROJECTS GRID
      ------------------------------------------------------------- */}
      <section className="py-20 bg-[#F4F1EA] border-y border-[#E8E4DC] px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C7764]">
                Curated Commissions
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A] mt-2">
                Selected Works
              </h2>
            </div>
            <button
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.16em] font-medium text-[#1C1B1A] hover:text-[#8C7764] transition-colors cursor-pointer group"
            >
              <span>View All Projects ({projects.length})</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Asymmetric Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
            {featuredProjects.map((project, index) => {
              // Asymmetric column distribution
              const isLarge = index === 0;
              const isMedium = index === 1;
              const colClass = isLarge
                ? 'md:col-span-8'
                : isMedium
                ? 'md:col-span-4'
                : index === 2
                ? 'md:col-span-5'
                : 'md:col-span-7';

              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project.slug)}
                  className={`${colClass} group cursor-pointer space-y-4`}
                >
                  <div className="overflow-hidden bg-[#E2DDCF] shadow-sm relative">
                    <ImageWithFallback
                      src={project.coverImage}
                      alt={project.title}
                      aspectRatioClass={isLarge ? 'aspect-16/10' : 'aspect-4/3'}
                      className="group-hover:scale-103 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 right-4 p-2 bg-[#1C1B1A]/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Clean unboxed metadata (Zero-Pill discipline) */}
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-xs text-[#7D766D] font-sans">
                      <span>{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.location}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{project.year}</span>
                    </div>
                    <h3 className="font-serif text-2xl text-[#1C1B1A] group-hover:text-[#8C7764] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#5E5A54] line-clamp-2 max-w-xl font-sans leading-relaxed">
                      {project.headline}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          4. DESIGN PHILOSOPHY PRINCIPLES
      ------------------------------------------------------------- */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C7764]">
            Design Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A]">
            Core Architectural Tenets
          </h2>
          <p className="text-sm text-[#5E5A54] font-sans">
            Principles honed through ten years of international commissions, rejecting transient trends in favor of spatial permanence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {cms.principles.map((principle, index) => (
            <div
              key={principle.title}
              className="p-8 bg-[#FAF8F5] border border-[#E8E4DC] hover:border-[#8C7764]/40 transition-colors space-y-4"
            >
              <div className="flex items-center justify-between text-xs text-[#8C7764] font-serif">
                <span className="tabular-nums">0{index + 1}.</span>
                <span className="uppercase tracking-widest text-[10px]">Principle</span>
              </div>
              <h3 className="font-serif text-2xl text-[#1C1B1A]">
                {principle.title}
              </h3>
              <p className="text-sm text-[#4A4845] font-sans leading-relaxed">
                {principle.description}
              </p>
              <p className="text-xs text-[#7D766D] font-sans italic border-t border-[#E8E4DC] pt-3">
                {principle.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------
          5. 4-STEP METHODOLOGY PROCESS
      ------------------------------------------------------------- */}
      <section className="py-20 bg-[#F4F1EA] border-t border-[#E8E4DC] px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C7764]">
              Methodology
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A]">
              Our 4-Step Architectural Journey
            </h2>
            <p className="text-xs sm:text-sm text-[#5E5A54] font-sans">
              From the initial dialogue with sunlight to white-glove turnkey delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cms.methodologySteps.map((step) => (
              <div key={step.number} className="space-y-4">
                <div className="font-serif text-4xl text-[#8C7764] tabular-nums">
                  {step.number}
                </div>
                <div className="h-[1px] w-full bg-[#DCD6C9]" />
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
      </section>

      {/* -------------------------------------------------------------
          6. SERVICE OVERVIEW HIGHLIGHTS
      ------------------------------------------------------------- */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C7764]">
              Studio Offerings
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A] mt-2">
              Bespoke Architectural Services
            </h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="text-xs uppercase tracking-[0.16em] font-medium text-[#1C1B1A] hover:text-[#8C7764] transition-colors underline underline-offset-4 cursor-pointer"
          >
            Review Detailed Inclusions & Tiers →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.slice(0, 3).map((serv) => (
            <div
              key={serv.id}
              onClick={() => onNavigate('services')}
              className="p-8 bg-[#FAF8F5] border border-[#E8E4DC] hover:border-[#8C7764] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-xs text-[#8C7764] font-medium uppercase tracking-wider">
                  {serv.category}
                </span>
                <h3 className="font-serif text-2xl text-[#1C1B1A] group-hover:text-[#8C7764] transition-colors">
                  {serv.title}
                </h3>
                <p className="text-xs text-[#5E5A54] font-sans leading-relaxed">
                  {serv.tagLine}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#E8E4DC] flex items-center justify-between text-xs text-[#7D766D]">
                <span>{serv.timeline}</span>
                <span className="font-medium text-[#1C1B1A]">{serv.priceTier}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------
          7. CLIENT TESTIMONIAL & PATRON PROOF
      ------------------------------------------------------------- */}
      <section className="py-24 bg-[#ECE8E0] border-y border-[#DCD6C9] px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="text-xs uppercase tracking-[0.22em] text-[#8C7764] font-semibold">
            Patron Monograph & Review
          </div>
          <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1C1B1A] leading-relaxed italic">
            "{cms.testimonial.quote}"
          </blockquote>
          <div className="space-y-1 font-sans">
            <div className="font-medium text-sm text-[#1C1B1A]">
              {cms.testimonial.client}
            </div>
            <div className="text-xs text-[#7D766D]">
              {cms.testimonial.role} · {cms.testimonial.project}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          8. CALL TO ACTION & CONSULTATION
      ------------------------------------------------------------- */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto text-center space-y-6">
        <span className="text-xs uppercase tracking-[0.22em] text-[#8C7764] font-semibold">
          Begin Your Spatial Commission
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1B1A] max-w-2xl mx-auto">
          Every enduring sanctuary begins with a thoughtful conversation.
        </h2>
        <p className="text-sm text-[#5E5A54] max-w-lg mx-auto font-sans leading-relaxed">
          Schedule a private design consultation with our studio in Kyoto, London, Tokyo, or via private video conference.
        </p>
        <div className="pt-4 flex justify-center items-center gap-4">
          <button
            onClick={onOpenConsultation}
            className="px-8 py-4 bg-[#1C1B1A] text-white text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#33312E] transition-colors cursor-pointer"
          >
            Schedule Consultation
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-4 bg-transparent border border-[#1C1B1A] text-[#1C1B1A] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#1C1B1A] hover:text-white transition-colors cursor-pointer"
          >
            Direct Inquiry Form
          </button>
        </div>
      </section>

    </div>
  );
};
