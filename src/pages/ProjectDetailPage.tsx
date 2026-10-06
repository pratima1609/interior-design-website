import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Expand, Compass, Sparkles, Check } from 'lucide-react';
import { Project, MaterialItem, SpatialZone } from '../types.ts';
import { ImageWithFallback } from '../components/ImageWithFallback.tsx';
import { LightboxModal } from '../components/LightboxModal.tsx';

interface ProjectDetailPageProps {
  project: Project;
  allProjects: Project[];
  onBack: () => void;
  onSelectProject: (slug: string) => void;
  onOpenConsultation: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  allProjects,
  onBack,
  onSelectProject,
  onOpenConsultation,
}) => {
  const [selectedZone, setSelectedZone] = useState<SpatialZone | null>(
    project.spatialZones?.[0] || null
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryList = [project.coverImage, ...(project.galleryImages || [])];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Find next project
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const nextProject =
    currentIndex >= 0 && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : allProjects[0];

  return (
    <div className="min-h-screen bg-[#FBFBFA]">
      
      {/* -------------------------------------------------------------
          1. IMMERSIVE HERO WITH METADATA OVERLAY
      ------------------------------------------------------------- */}
      <section className="relative w-full h-[75vh] min-h-[500px] flex flex-col justify-between p-6 sm:p-12 text-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={project.coverImage}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-[0.82] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1A]/90 via-[#1C1B1A]/35 to-black/20" />
        </div>

        {/* Top Back Nav & Lightbox trigger */}
        <div className="relative z-10 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.18em] font-medium text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </button>
          
          <button
            onClick={() => openLightbox(0)}
            className="p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors cursor-pointer"
            title="Inspect full image in high resolution"
          >
            <Expand className="w-4 h-4" />
          </button>
        </div>

        {/* Hero Title & Kicker */}
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#C8B8A6] font-medium">
            <span>FORMA INTERIORS</span>
            <span aria-hidden="true">·</span>
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{project.year}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-tight">
            {project.title}
          </h1>

          <p className="text-sm sm:text-base text-[#E5E0D8] font-sans font-light max-w-2xl leading-relaxed">
            {project.headline}
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------------
          2. ARCHITECTURAL METADATA BAR
      ------------------------------------------------------------- */}
      <section className="bg-[#F4F1EA] border-b border-[#E8E4DC] py-8 px-6 lg:px-12 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-xs">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#8C7764] font-semibold">
              Location
            </div>
            <div className="mt-1 text-[#1C1B1A] font-medium">{project.location}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#8C7764] font-semibold">
              Typology
            </div>
            <div className="mt-1 text-[#1C1B1A] font-medium">{project.category} Architecture</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#8C7764] font-semibold">
              Scale & Area
            </div>
            <div className="mt-1 text-[#1C1B1A] font-medium tabular-nums">{project.area}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#8C7764] font-semibold">
              Completion Year
            </div>
            <div className="mt-1 text-[#1C1B1A] font-medium tabular-nums">{project.year}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#8C7764] font-semibold">
              Commission Type
            </div>
            <div className="mt-1 text-[#1C1B1A] font-medium">{project.clientType}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#8C7764] font-semibold">
              Scope of Practice
            </div>
            <div className="mt-1 text-[#1C1B1A] font-medium">Turnkey & Bespoke Millwork</div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          3. CONCEPT NARRATIVE
      ------------------------------------------------------------- */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C7764]">
              Design Thesis
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A]">
              Concept Narrative
            </h2>
            <div className="text-xs text-[#7D766D] font-sans">
              Curated by Samyak Interiors Studio
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6 font-sans">
            <p className="text-base sm:text-lg text-[#33312E] leading-relaxed font-light">
              {project.conceptNarrative}
            </p>
            <p className="text-sm text-[#5E5A54] leading-relaxed">
              Every detail—from the acoustic dampening of unbleached Belgian wool to the subtle shadow-gap joints between travertine blocks—was calibrated to evoke psychological stillness. Daylight was modeled using circadian solar projections to ensure the interior reflects changing seasonal light throughout the year.
            </p>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          4. TACTILE MATERIAL PALETTE SECTION
      ------------------------------------------------------------- */}
      {project.materials && project.materials.length > 0 && (
        <section className="py-20 bg-[#F4F1EA] border-y border-[#E8E4DC] px-6 lg:px-12">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="max-w-2xl space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C7764]">
                Materiality
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A]">
                The Tactile Palette
              </h2>
              <p className="text-xs sm:text-sm text-[#5E5A54] font-sans">
                Authentic, raw materials hand-selected for natural patination, geological permanence, and sensory richness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.materials.map((mat) => (
                <div
                  key={mat.id}
                  className="bg-[#FAF8F5] border border-[#E0DBD0] p-6 space-y-4 hover:border-[#8C7764] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#8C7764]">
                      {mat.origin}
                    </span>
                    <div
                      className="w-5 h-5 rounded-full border border-black/15 shadow-inner"
                      style={{ backgroundColor: mat.hexHint }}
                      title={`Material Tone: ${mat.hexHint}`}
                    />
                  </div>

                  <div>
                    <h3 className="font-serif text-xl text-[#1C1B1A]">{mat.name}</h3>
                    <div className="text-xs text-[#7D766D] font-sans mt-0.5">{mat.texture}</div>
                  </div>

                  <div className="pt-3 border-t border-[#E8E4DC] text-xs font-sans space-y-2">
                    <div>
                      <span className="text-[#8C7764] font-medium block">Application:</span>
                      <span className="text-[#4A4845]">{mat.application}</span>
                    </div>
                    <div>
                      <span className="text-[#8C7764] font-medium block">Craft Note:</span>
                      <span className="text-[#7D766D] italic">{mat.notes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* -------------------------------------------------------------
          5. SPATIAL PLANNING & FLOOR ZONES
      ------------------------------------------------------------- */}
      {project.spatialZones && project.spatialZones.length > 0 && (
        <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C7764]">
              Architectural Choreography
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A]">
              Spatial Planning & Floor Zones
            </h2>
            <p className="text-xs sm:text-sm text-[#5E5A54] font-sans">
              Circulation diagrams designed around quiet acoustic gradients and natural daylight axes. Select a zone below to inspect architectural features.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Zone Selector Buttons */}
            <div className="lg:col-span-4 space-y-3">
              {project.spatialZones.map((zone) => {
                const isSelected = selectedZone?.id === zone.id;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    className={`w-full text-left p-4 transition-all duration-200 border cursor-pointer ${
                      isSelected
                        ? 'bg-[#1C1B1A] text-white border-[#1C1B1A] shadow-md'
                        : 'bg-[#FAF8F5] text-[#1C1B1A] border-[#E8E4DC] hover:border-[#8C7764]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className={isSelected ? 'text-[#C8B8A6]' : 'text-[#8C7764]'}>
                        Zone Breakdown
                      </span>
                      <span className="tabular-nums font-semibold">{zone.sqm} m²</span>
                    </div>
                    <div className="font-serif text-lg">{zone.zoneName}</div>
                  </button>
                );
              })}
            </div>

            {/* Zone Detail Card */}
            {selectedZone && (
              <div className="lg:col-span-8 bg-[#FAF8F5] border border-[#E8E4DC] p-8 sm:p-10 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-4 border-b border-[#E8E4DC] gap-2">
                  <h3 className="font-serif text-3xl text-[#1C1B1A]">
                    {selectedZone.zoneName}
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#8C7764] tabular-nums">
                    Approx. {selectedZone.sqm} m² / {Math.round(selectedZone.sqm * 10.764)} sq.ft
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#4A4845] font-sans font-light leading-relaxed">
                  {selectedZone.description}
                </p>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#8C7764] font-semibold mb-3">
                    Architectural Specifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                    {selectedZone.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-[#33312E]">
                        <Check className="w-3.5 h-3.5 text-[#8C7764] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spatial Drawing Schema Graphic Mockup */}
                <div className="pt-6 border-t border-[#E8E4DC] flex items-center justify-between text-xs text-[#7D766D] font-mono">
                  <span>SCALE: 1:50 ARCHITECTURAL CAD</span>
                  <span>ORIENTATION: SOUTH-BY-SOUTHWEST</span>
                </div>
              </div>
            )}

          </div>
        </section>
      )}

      {/* -------------------------------------------------------------
          6. CURATED IMAGE GALLERY & LIGHTBOX
      ------------------------------------------------------------- */}
      <section className="py-20 bg-[#F4F1EA] border-t border-[#E8E4DC] px-6 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C7764]">
                Visual Archive
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A] mt-1">
                Curated Image Gallery
              </h2>
            </div>
            <button
              onClick={() => openLightbox(0)}
              className="text-xs uppercase tracking-[0.16em] font-medium text-[#1C1B1A] hover:text-[#8C7764] transition-colors underline underline-offset-4 cursor-pointer"
            >
              Open Fullscreen Lightbox ({galleryList.length} Photographs)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {galleryList.map((img, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(idx)}
                className="group cursor-pointer relative overflow-hidden bg-[#E2DDCF] shadow-sm"
              >
                <ImageWithFallback
                  src={img}
                  alt={`${project.title} photographic detail ${idx + 1}`}
                  aspectRatioClass="aspect-16/10"
                  className="group-hover:scale-103 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="px-4 py-2 bg-white/90 backdrop-blur-sm text-xs uppercase tracking-wider text-[#1C1B1A] font-medium">
                    View High Resolution
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          7. NEXT PROJECT NAV & CONSULTATION CTA
      ------------------------------------------------------------- */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto border-t border-[#E8E4DC]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Next project teaser */}
          {nextProject && (
            <div
              onClick={() => onSelectProject(nextProject.slug)}
              className="group cursor-pointer space-y-2 text-left"
            >
              <span className="text-xs uppercase tracking-widest text-[#8C7764] font-medium">
                Next Architectural Monograph →
              </span>
              <h3 className="font-serif text-3xl text-[#1C1B1A] group-hover:text-[#8C7764] transition-colors">
                {nextProject.title}
              </h3>
              <p className="text-xs text-[#7D766D] font-sans">
                {nextProject.category} · {nextProject.location}
              </p>
            </div>
          )}

          {/* Book Consultation Trigger */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenConsultation}
              className="px-8 py-4 bg-[#1C1B1A] text-white text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#33312E] transition-colors cursor-pointer"
            >
              Commission a Project
            </button>
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={galleryList}
        currentIndex={lightboxIndex}
        onPrev={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryList.length - 1))}
        onNext={() => setLightboxIndex((prev) => (prev < galleryList.length - 1 ? prev + 1 : 0))}
        title={project.title}
      />

    </div>
  );
};
