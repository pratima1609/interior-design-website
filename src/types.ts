export interface MaterialItem {
  id: string;
  projectId?: string;
  name: string;
  texture: string;
  origin: string;
  application: string;
  hexHint: string;
  notes: string;
}

export interface SpatialZone {
  id: string;
  projectId?: string;
  zoneName: string;
  sqm: number;
  description: string;
  features: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Renovation';
  location: string;
  area: string;
  year: string;
  clientType: string;
  headline: string;
  conceptNarrative: string;
  coverImage: string;
  galleryImages: string[];
  featured: boolean;
  aspectRatioClass?: string;
  materials?: MaterialItem[];
  spatialZones?: SpatialZone[];
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  tagLine: string;
  timeline: string;
  deliverables: string[];
  inclusions: string[];
  priceTier: string;
}

export interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  location: string;
  notes: string;
  status: 'New' | 'In Review' | 'Scheduled' | 'Archived';
  createdAt: string;
}

export interface Consultation {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  projectType: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface StudioCMS {
  stats: {
    experienceYears: string;
    projectsCount: string;
    citiesCount: string;
    clientsCount: string;
  };
  biography: string;
  founderQuote: string;
  methodologySteps: {
    number: string;
    title: string;
    subtitle: string;
    description: string;
  }[];
  principles: {
    title: string;
    description: string;
    detail: string;
  }[];
  testimonial: {
    quote: string;
    client: string;
    role: string;
    project: string;
  };
}

export interface AuthUser {
  id: string;
  email: string;
  role: 'curator' | 'director';
  name: string;
}
