import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { MobileDrawer } from './components/MobileDrawer.tsx';
import { SearchModal } from './components/SearchModal.tsx';
import { ConsultationModal } from './components/ConsultationModal.tsx';

import { HomePage } from './pages/HomePage.tsx';
import { ProjectsPage } from './pages/ProjectsPage.tsx';
import { ProjectDetailPage } from './pages/ProjectDetailPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ServicesPage } from './pages/ServicesPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { HeadlessCMSPortal } from './pages/HeadlessCMSPortal.tsx';

import { api } from './api.ts';
import { Project, ServiceItem, StudioCMS } from './types.ts';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [activeProjectSlug, setActiveProjectSlug] = useState<string>('the-terra-residence');

  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [cms, setCms] = useState<StudioCMS | null>(null);
  const [loading, setLoading] = useState(true);

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationServiceHint, setConsultationServiceHint] = useState<string>('Residential Architecture');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fetch initial content
  const loadData = async () => {
    try {
      const [p, s, c] = await Promise.all([
        api.getProjects(),
        api.getServices(),
        api.getCMS()
      ]);
      setProjects(p);
      setServices(s);
      setCms(c);
    } catch (e) {
      console.warn('API fetch warning, falling back to local state:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Keyboard shortcut Cmd+K / Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = (route: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (route.startsWith('project-')) {
      const slug = route.replace('project-', '');
      setActiveProjectSlug(slug);
      setCurrentRoute('project-detail');
    } else {
      setCurrentRoute(route);
    }
  };

  const selectProject = (slug: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveProjectSlug(slug);
    setCurrentRoute('project-detail');
  };

  const openConsultationWithService = (serviceName: string) => {
    setConsultationServiceHint(serviceName);
    setIsConsultationOpen(true);
  };

  const activeProject =
    projects.find((p) => p.slug === activeProjectSlug || p.id === activeProjectSlug) ||
    projects[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-[#1C1B1A]">
      
      {/* Universal Top Bar Contract Header */}
      <Header
        currentRoute={currentRoute === 'project-detail' ? `project-${activeProjectSlug}` : currentRoute}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenConsultation={() => {
          setConsultationServiceHint('Residential Architecture');
          setIsConsultationOpen(true);
        }}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {loading && !cms ? (
          <div className="min-h-[70vh] flex flex-col items-center justify-center p-12 text-[#8C7764]">
            <div className="w-8 h-8 border-2 border-[#8C7764] border-t-transparent rounded-full animate-spin mb-4" />
            <span className="font-serif text-lg tracking-widest uppercase">SAMYAK INTERIORS</span>
            <span className="text-xs text-[#7D766D] mt-1 font-sans">Loading architectural archive...</span>
          </div>
        ) : (
          <>
            {currentRoute === 'home' && cms && (
              <HomePage
                projects={projects}
                cms={cms}
                services={services}
                onNavigate={navigateTo}
                onOpenConsultation={() => setIsConsultationOpen(true)}
                onSelectProject={selectProject}
              />
            )}

            {currentRoute === 'projects' && (
              <ProjectsPage
                projects={projects}
                onSelectProject={selectProject}
                onOpenConsultation={() => setIsConsultationOpen(true)}
              />
            )}

            {currentRoute === 'project-detail' && activeProject && (
              <ProjectDetailPage
                project={activeProject}
                allProjects={projects}
                onBack={() => navigateTo('projects')}
                onSelectProject={selectProject}
                onOpenConsultation={() => setIsConsultationOpen(true)}
              />
            )}

            {currentRoute === 'about' && cms && (
              <AboutPage
                cms={cms}
                onNavigate={navigateTo}
                onOpenConsultation={() => setIsConsultationOpen(true)}
              />
            )}

            {currentRoute === 'services' && (
              <ServicesPage
                services={services}
                onOpenConsultationWithService={openConsultationWithService}
              />
            )}

            {currentRoute === 'contact' && (
              <ContactPage />
            )}

            {currentRoute === 'cms' && (
              <HeadlessCMSPortal
                onRefreshData={loadData}
                onNavigateToProject={selectProject}
              />
            )}
          </>
        )}
      </main>

      {/* Site Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenConsultation={() => {
          setConsultationServiceHint('Residential Architecture');
          setIsConsultationOpen(true);
        }}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        onOpenConsultation={() => {
          setConsultationServiceHint('Residential Architecture');
          setIsConsultationOpen(true);
        }}
      />

      {/* Dynamic Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        projects={projects}
        services={services}
        onSelectProject={selectProject}
        onSelectService={(slug) => {
          navigateTo('services');
        }}
      />

      {/* Consultation Booking Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialService={consultationServiceHint}
      />

    </div>
  );
}
