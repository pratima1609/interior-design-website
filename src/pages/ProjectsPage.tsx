import React, { useState } from 'react';
import { Search, ArrowUpRight } from 'lucide-react';
import { Project } from '../types.ts';
import { ImageWithFallback } from '../components/ImageWithFallback.tsx';

interface ProjectsPageProps {
  projects: Project[];
  onSelectProject: (slug: string) => void;
  onOpenConsultation: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  projects,
  onSelectProject,
  onOpenConsultation,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Residential', 'Commercial', 'Renovation'];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeCategory === 'All' || project.category.toLowerCase() === activeCategory.toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      project.title.toLowerCase().includes(q) ||
      project.location.toLowerCase().includes(q) ||
      project.category.toLowerCase().includes(q) ||
      project.headline.toLowerCase().includes(q) ||
      project.materials?.some((m) => m.name.toLowerCase().includes(q));

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#FBFBFA] py-16 lg:py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Page Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C7764]">
            FORMA | Samyak Interiors — Portfolio
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1C1B1A] leading-tight">
            Selected Work
          </h1>
          <p className="text-sm sm:text-base text-[#4A4845] font-sans font-light leading-relaxed">
            A curated monograph of private residential estates, alpine retreats, historical loft restorations, and high-character commercial ateliers designed between 2016 and 2026.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E8E4DC]">
          
          {/* Category Tabs (Segmented Buttons) */}
          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#1C1B1A] text-white shadow-sm'
                      : 'bg-[#F2EFE9] hover:bg-[#EAE5DC] text-[#4A4845]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#8C7764] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by stone, city, room..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#F5F2EC] border border-[#E0DBD0] text-[#1C1B1A] placeholder-[#9C948A] focus:outline-none focus:border-[#8C7764] font-sans transition-colors"
            />
          </div>

        </div>

        {/* Live Count & Active Filters Indicator */}
        <div className="flex items-center justify-between text-xs text-[#7D766D] font-sans -mt-8">
          <span>
            Showing <strong className="text-[#1C1B1A] tabular-nums font-semibold">{filteredProjects.length}</strong> {filteredProjects.length === 1 ? 'architectural project' : 'architectural projects'}
          </span>
          {activeCategory !== 'All' && (
            <button
              onClick={() => setActiveCategory('All')}
              className="text-[#8C7764] hover:underline cursor-pointer"
            >
              Reset to all works
            </button>
          )}
        </div>

        {/* Asymmetric Masonry Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-[#DCD6C9] p-12 bg-[#FAF8F5]">
            <p className="font-serif text-2xl text-[#1C1B1A] mb-2">No projects matched your criteria.</p>
            <p className="text-xs text-[#7D766D] font-sans mb-6">
              Try adjusting the filter tab or clearing the search query.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 bg-[#1C1B1A] text-white text-xs uppercase tracking-wider font-medium cursor-pointer"
            >
              Show All Projects
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            {filteredProjects.map((project, index) => {
              // Asymmetric rhythm formula
              const pattern = index % 5;
              let colSpan = 'md:col-span-6';
              let aspectClass = 'aspect-4/3';

              if (pattern === 0) {
                colSpan = 'md:col-span-8';
                aspectClass = 'aspect-16/10';
              } else if (pattern === 1) {
                colSpan = 'md:col-span-4';
                aspectClass = 'aspect-3/4';
              } else if (pattern === 2) {
                colSpan = 'md:col-span-5';
                aspectClass = 'aspect-4/3';
              } else if (pattern === 3) {
                colSpan = 'md:col-span-7';
                aspectClass = 'aspect-16/10';
              } else {
                colSpan = 'md:col-span-12';
                aspectClass = 'aspect-21/9';
              }

              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project.slug)}
                  className={`${colSpan} group cursor-pointer space-y-4`}
                >
                  <div className="relative overflow-hidden bg-[#E2DDCF] shadow-sm">
                    <ImageWithFallback
                      src={project.coverImage}
                      alt={project.title}
                      aspectRatioClass={aspectClass}
                      className="group-hover:scale-103 transition-transform duration-700 ease-out"
                    />

                    {/* Hover Floating Action */}
                    <div className="absolute top-4 right-4 p-2 bg-[#1C1B1A]/75 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>

                    {/* Featured label if applicable */}
                    {project.featured && (
                      <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-widest text-[#1C1B1A] bg-white/90 backdrop-blur-sm px-2.5 py-1 font-medium font-sans">
                        Monograph Study
                      </div>
                    )}
                  </div>

                  {/* Clean unboxed metadata (Zero-Pill discipline) */}
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2 text-xs text-[#7D766D] font-sans">
                      <span>{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.location}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{project.year}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.area}</span>
                    </div>

                    <h2 className="font-serif text-2xl lg:text-3xl text-[#1C1B1A] group-hover:text-[#8C7764] transition-colors">
                      {project.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-[#5E5A54] line-clamp-2 max-w-2xl font-sans leading-relaxed">
                      {project.headline}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Project Commission Bottom Notice */}
        <div className="pt-16 border-t border-[#E8E4DC] flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-[#F6F4EE] p-8 sm:p-12">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl text-[#1C1B1A]">
              Considering a project of similar caliber?
            </h3>
            <p className="text-xs text-[#5E5A54] max-w-lg font-sans">
              We take on a limited number of commissions each year to maintain uncompromising immersion and craft oversight.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="px-7 py-3.5 bg-[#1C1B1A] text-white text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#33312E] transition-colors whitespace-nowrap cursor-pointer"
          >
            Inquire for Commission
          </button>
        </div>

      </div>
    </div>
  );
};
