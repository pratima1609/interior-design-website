import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Project, MaterialItem, SpatialZone, ServiceItem, Inquiry, Consultation, StudioCMS } from '../src/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, '..', 'data', 'database.json');

// Ensure data folder exists
const dataDir = path.dirname(DB_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export interface DBState {
  projects: Project[];
  services: ServiceItem[];
  inquiries: Inquiry[];
  consultations: Consultation[];
  cms: StudioCMS;
  users: Array<{ id: string; email: string; password: string; name: string; role: 'curator' | 'director' }>;
}

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    slug: 'the-terra-residence',
    title: 'The Terra Residence',
    category: 'Residential',
    location: 'Kyoto Highlands, Japan',
    area: '480 m² / 5,160 sq.ft',
    year: '2025',
    clientType: 'Private Collector & Botanist',
    headline: 'Monolithic travertine volumes intertwined with Japanese cedar and diffused garden light.',
    conceptNarrative: 'The Terra Residence was conceived as an architectural retreat where the boundaries between raw geological mass and contemplative domestic ritual dissolve. Set on a sloping woodland bluff, the spatial sequence opens around an internal atrium framed in hand-chiseled Roman travertine, oiled smoked oak, and acoustic clay plaster. Natural light descends through fluted skylights, shifting along tactile planes throughout the daylight arc.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85'
    ],
    featured: true,
    materials: [
      {
        id: 'mat-1',
        projectId: 'proj-1',
        name: 'Honed Roman Travertine',
        texture: 'Slightly open-pore, matte silk finish',
        origin: 'Tivoli Quarry, Lazio, Italy',
        application: 'Atrium columns, monolithic hearth, master bath vanities',
        hexHint: '#E6DECE',
        notes: 'Hand-selected vein-cut slabs with subtle warm ochre sediment lines.'
      },
      {
        id: 'mat-2',
        projectId: 'proj-1',
        name: 'Smoked Belgian Oak',
        texture: 'Wire-brushed deep grain, natural matte oil',
        origin: 'Ardennes Forest, Belgium',
        application: 'Custom fluted millwork, ceiling slats, sunken library joinery',
        hexHint: '#564334',
        notes: 'Fumed with organic ammonia baths for deep, luminous umber tones.'
      },
      {
        id: 'mat-3',
        projectId: 'proj-1',
        name: 'Fluted Cast Art Glass',
        texture: 'Linear ribbed tactile relief with 12mm flute pitch',
        origin: 'Veneto Studio Workshop, Italy',
        application: 'Spatial divider screens, master dressing portal',
        hexHint: '#D7DDD7',
        notes: 'Diffuses direct sunlight into soft vertical luminance without loss of privacy.'
      },
      {
        id: 'mat-4',
        projectId: 'proj-1',
        name: 'Hand-Patinated Brushed Brass',
        texture: 'Micro-brushed organic wax sealed surface',
        origin: 'Birmingham Metalsmith Guild, UK',
        application: 'Hardware trims, bespoke recessed pulls, linear hearth mantle',
        hexHint: '#9F8354',
        notes: 'Designed to acquire a quiet natural patina with tactile human touch.'
      },
      {
        id: 'mat-5',
        projectId: 'proj-1',
        name: 'Belgian Linen & Raw Wool Bouclé',
        texture: 'Heavy tactile slub weave, unbleached texture',
        origin: 'Flanders, Belgium',
        application: 'Curated curved salon lounge, custom headboard drapery',
        hexHint: '#ECE6DC',
        notes: '100% organic undyed natural fiber with superior acoustic dampening.'
      }
    ],
    spatialZones: [
      {
        id: 'zone-1',
        projectId: 'proj-1',
        zoneName: 'The Grand Living Salon',
        sqm: 98,
        description: 'Double-height social volume centered around a floating travertine plinth and monolithic sunken hearth with views of the moss garden.',
        features: ['Double-height acoustic clay ceiling', 'Bespoke curved low lounge', 'Recessed floor-to-ceiling glazing']
      },
      {
        id: 'zone-2',
        projectId: 'proj-1',
        zoneName: 'Culinary Atelier & Pantry',
        sqm: 48,
        description: 'Sculptural cooking space featuring a seamless 4-meter honed quartz monolithic island and concealed smoked oak pantry walls.',
        features: ['Monolithic island block', 'Integrated induction cooktop', 'Hidden chef prep scullery']
      },
      {
        id: 'zone-3',
        projectId: 'proj-1',
        zoneName: 'Private Sanctuary Suite',
        sqm: 64,
        description: 'Secluded master quarters with private cedar onsen soak, walk-through dressing portal in fluted glass, and garden vista.',
        features: ['Sunken natural cedar soaking bath', 'Acoustic linen wall cladding', 'Private contemplative terrace']
      },
      {
        id: 'zone-4',
        projectId: 'proj-1',
        zoneName: 'Sunken Tea & Reading Library',
        sqm: 34,
        description: 'Intimate reading nook recessed 45cm into the floor plane, wrapped with floor-to-ceiling smoked oak book vitrines.',
        features: ['Recessed floor plane', 'Concealed reading illumination', 'Japanese cedar tatami mats']
      }
    ]
  },
  {
    id: 'proj-2',
    slug: 'aethel-villa',
    title: 'Aethel Villa',
    category: 'Residential',
    location: 'Engadin Valley, Switzerland',
    area: '620 m² / 6,670 sq.ft',
    year: '2024',
    clientType: 'Private Family Office',
    headline: 'Alpine architectural minimalism crafted in rough-sawn larch and honed Vals quartzite.',
    conceptNarrative: 'Reinterpreting high-altitude vernacular architecture through stripped-back geometric clarity. Massive stone walls anchor the home into the alpine granite, while expansive corner glazing frames panoramic summit vistas.',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85'
    ],
    featured: true,
    materials: [
      { id: 'm-21', name: 'Vals Quartzite', texture: 'Sawn cut relief', origin: 'Graubünden, Switzerland', application: 'Exterior plinth & fireplace', hexHint: '#7A807E', notes: 'Locally quarried metamorphic stone with silvery mica sheen.' },
      { id: 'm-22', name: 'Alpine Sawn Larch', texture: 'Natural raw grain', origin: 'Engadin, Switzerland', application: 'Wall cladding & rafters', hexHint: '#BC9D75', notes: 'Untreated timber that weathers into warm amber-silver.' }
    ],
    spatialZones: [
      { id: 'z-21', zoneName: 'Alpine Great Room', sqm: 120, description: 'Cathedral volume overlooking alpine snowfields with central steel and granite hearth.', features: ['7-meter stone hearth', 'Handcrafted leather daybeds'] }
    ]
  },
  {
    id: 'proj-3',
    slug: 'komorebi-penthouse',
    title: 'Komorebi Penthouse',
    category: 'Residential',
    location: 'Omotesando, Tokyo',
    area: '340 m² / 3,660 sq.ft',
    year: '2024',
    clientType: 'Contemporary Art Curator',
    headline: 'Serene metropolitan aerie balancing washi shoji screens, micro-cement, and curated art.',
    conceptNarrative: 'Floating above the kinetic energy of Tokyo, Komorebi Penthouse serves as a silent sanctuary. Light filters through layered handmade washi panels, evoking the dappled sunlight of Japanese forest canopies.',
    coverImage: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85'
    ],
    featured: true,
    materials: [
      { id: 'm-31', name: 'Handmade Echizen Washi', texture: 'Textured mulberry bark fiber', origin: 'Fukui Prefecture, Japan', application: 'Sliding partitions & light boxes', hexHint: '#F7F3EA', notes: 'Master craftsman crafted with organic botanical inclusions.' },
      { id: 'm-32', name: 'Micro-cement Screed', texture: 'Silky seamless mineral matte', origin: 'Tokyo, Japan', application: 'Continuous flooring throughout', hexHint: '#D2CEC6', notes: 'Zero-grout architectural surface.' }
    ],
    spatialZones: [
      { id: 'z-31', zoneName: 'Gallery Foyer & Tea Alcove', sqm: 54, description: 'Curated entry sequence featuring floating art niches and low tea counter.', features: ['Custom museum lighting', 'Integrated climate vitrines'] }
    ]
  },
  {
    id: 'proj-4',
    slug: 'maison-noire-atelier',
    title: 'Maison Noire Atelier',
    category: 'Commercial',
    location: 'Le Marais, Paris',
    area: '290 m² / 3,120 sq.ft',
    year: '2024',
    clientType: 'Haute Horlogerie & Design Studio',
    headline: 'High-character commercial atelier with patinated blackened steel, plaster, and brass accents.',
    conceptNarrative: 'A 19th-century courtyard carriage house restored and reimagined as a discreet private showroom and creative horology atelier. Raw structural masonry harmonizes with monolithic burnished brass displays.',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85'
    ],
    featured: false,
    materials: [
      { id: 'm-41', name: 'Blackened Architectural Steel', texture: 'Hot-rolled carbon with beeswax seal', origin: 'Lyon, France', application: 'Staircase & display vitrines', hexHint: '#2A2A2B', notes: 'Deep blue-black mill scale reflections.' },
      { id: 'm-42', name: 'Calacatta Paonazzo Marble', texture: 'Honed with intense aubergine and gold veining', origin: 'Carrara, Italy', application: 'Showroom consultation altar', hexHint: '#EDE8E0', notes: 'Monumental 3-ton monolithic block.' }
    ],
    spatialZones: [
      { id: 'z-41', zoneName: 'Client Salon & Private Viewing', sqm: 82, description: 'Private horology viewing suite with soundproof acoustic wool drapery.', features: ['Precision illumination', 'Concealed security vault'] }
    ]
  },
  {
    id: 'proj-5',
    slug: 'the-caelum-loft',
    title: 'The Caelum Loft',
    category: 'Renovation',
    location: 'Tribeca, New York',
    area: '410 m² / 4,410 sq.ft',
    year: '2023',
    clientType: 'Industrialist & Philanthropist',
    headline: 'Historical cast-iron loft transformed into a quiet sculptural gallery of warm materiality.',
    conceptNarrative: 'Stripping back decades of partition walls revealed original 1902 cast-iron columns and heavy timber beams. We inserted clean lime-washed curved partitions that flow seamlessly between living, dining, and sculpture galleries.',
    coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85'
    ],
    featured: false,
    materials: [
      { id: 'm-51', name: 'Reclaimed Heart Pine', texture: 'Hand-scraped 14-inch planks', origin: 'Hudson Valley, NY', application: 'Wide-plank flooring', hexHint: '#9C7A53', notes: 'Restored from the building’s original warehouse substructure.' }
    ],
    spatialZones: [
      { id: 'z-51', zoneName: 'Sculpture Great Hall', sqm: 110, description: 'Gallery-scale volume framed by historical fluted cast-iron pillars.', features: ['Museum daylight tracks', 'Acoustic ceiling plaster'] }
    ]
  },
  {
    id: 'proj-6',
    slug: 'sylvan-pavilion',
    title: 'Sylvan Pavilion',
    category: 'Residential',
    location: 'Carmel-by-the-Sea, California',
    area: '520 m² / 5,600 sq.ft',
    year: '2025',
    clientType: 'Private Client',
    headline: 'Coastal sanctuary of bleached cypress, terrazzo aggregate, and sweeping ocean horizons.',
    conceptNarrative: 'Nestled between Monterey cypress trees and coastal cliffs, Sylvan Pavilion anchors modern luxury into coastal topography. Horizontal cantilevered roof planes hover over pocket glass walls that open entirely to sea breezes.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85'
    ],
    featured: true,
    materials: [
      { id: 'm-61', name: 'Bleached Coastal Cypress', texture: 'Fine wire brush, driftwood tone', origin: 'California Coast', application: 'Soffits & exterior screens', hexHint: '#C4B9AA', notes: 'Resistant to saline coastal winds.' }
    ],
    spatialZones: [
      { id: 'z-61', zoneName: 'Ocean Lookout Salon', sqm: 92, description: 'Indoor-outdoor salon opening to heated terrazzo terrace and fire feature.', features: ['Motorized pocket doors', 'Seamless terrazzo transitions'] }
    ]
  }
];

const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'serv-1',
    slug: 'residential-architecture',
    title: 'Residential Architecture',
    category: 'Architecture & Interior',
    tagLine: 'Private residences, villas, and penthouses crafted with architectural permanence and serene warmth.',
    timeline: '6 — 18 Months',
    priceTier: 'Comprehensive Commission',
    deliverables: [
      'Full architectural space planning & structural modifications',
      'Custom millwork, cabinetry & architectural detail drawings',
      'Material curation, quarry visits & tactile mock-ups',
      'Curated sanitary ware, hardware & architectural lighting'
    ],
    inclusions: [
      'Complete 2D technical construction document set',
      'Photorealistic 3D spatial daylight studies',
      'Comprehensive material sample box delivered to client',
      'Bi-weekly on-site architectural coordination and oversight'
    ]
  },
  {
    id: 'serv-2',
    slug: 'commercial-atelier',
    title: 'Commercial & Atelier',
    category: 'Brand & Hospitality',
    tagLine: 'High-touch retail boutiques, galleries, creative studios, and bespoke boutique hospitality spaces.',
    timeline: '4 — 12 Months',
    priceTier: 'Boutique Commercial',
    deliverables: [
      'Customer experiential journey & ergonomic choreography',
      'Bespoke retail fixtures, monolithic counter altars & vitrines',
      'Brand aesthetic spatial translation & olfactory/acoustic integration',
      'Compliance, ADA, and high-footfall material specifications'
    ],
    inclusions: [
      'Detailed commercial fixture engineering drawings',
      'Lighting design with circadian rhythm scene programming',
      'Turnkey vendor procurement management',
      'Staff operational handover & maintenance manual'
    ]
  },
  {
    id: 'serv-3',
    slug: 'heritage-renovation',
    title: 'Heritage Renovation',
    category: 'Restoration & Modernity',
    tagLine: 'Sensitive restoration of historic properties, preserving heritage character while infusing contemporary ease.',
    timeline: '8 — 16 Months',
    priceTier: 'Bespoke Restoration',
    deliverables: [
      'Historical fabric audit & archival material matching',
      'Modern infrastructure integration without structural intrusion',
      'Artisanal plaster, stone, and historic timber restoration',
      'Regulatory heritage council approval documentation'
    ],
    inclusions: [
      'Historical preservation specialist consultation',
      'Lime plaster and heritage timber condition report',
      'Seamless concealed HVAC & smart home integration',
      'Before & After photographic documentary archive'
    ]
  },
  {
    id: 'serv-4',
    slug: 'furniture-curation-styling',
    title: 'Furniture & Styling',
    category: 'Curation & Art',
    tagLine: 'Collector-grade vintage design curation, commissioned artisan furniture, rugs, and art consulting.',
    timeline: '2 — 6 Months',
    priceTier: 'Curatorial Advisory',
    deliverables: [
      'Art gallery & blue-chip design auction representation',
      'Bespoke furniture design and artisan guild fabrication',
      'Custom textile design (bouclé, cashmere, Belgian linen)',
      'Sculptural accessories, books, ceramics, and florals'
    ],
    inclusions: [
      'Global logistics, white-glove shipping & installation',
      'Provenance documentation and authenticity certificates',
      'Textile stain-protection and fine-art hanging engineering',
      'Direct access to our private European antique dealer network'
    ]
  },
  {
    id: 'serv-5',
    slug: 'space-planning',
    title: 'Space Planning & Feasibility',
    category: 'Strategy & Diagnostics',
    tagLine: 'In-depth spatial diagnostics, circulation optimization, and concept zoning before structural commitment.',
    timeline: '3 — 6 Weeks',
    priceTier: 'Advisory Diagnostic',
    deliverables: [
      'Comprehensive site survey & spatial volume analysis',
      'Three distinct conceptual zoning floor plan options',
      'Preliminary budget estimation & construction timeline model',
      'Daylight study and sightline optimization report'
    ],
    inclusions: [
      '2 rounds of interactive design workshops',
      'Scale 1:50 concept presentation binder',
      'Architectural feasibility summary for prospective purchases'
    ]
  },
  {
    id: 'serv-6',
    slug: 'turnkey-execution',
    title: 'Turnkey Project Delivery',
    category: 'Full Delivery',
    tagLine: 'Complete single-point-of-contact execution from conceptual genesis to the keys handed over with fresh flowers.',
    timeline: 'Full Project Lifecycle',
    priceTier: 'Turnkey All-Inclusive',
    deliverables: [
      'Dedicated studio director & project architect assignment',
      'General contractor tender, bidding, and contract management',
      'Full procurement of all architectural finishes and furnishings',
      'Defect liability inspection and 12-month post-handover warranty'
    ],
    inclusions: [
      'Fixed-price milestone management with zero surprise costs',
      'Weekly video walk-through reports for remote clients',
      'White-glove move-in readiness with scented candles and linens',
      'Private studio concierge for ongoing property adjustments'
    ]
  }
];

const INITIAL_CMS: StudioCMS = {
  stats: {
    experienceYears: '10+',
    projectsCount: '40+',
    citiesCount: '12',
    clientsCount: '25+'
  },
  biography: 'Founded by lead architect Samyak, FORMA | Samyak Interiors is an international interior architecture studio rooted in quiet luxury, tactile materiality, and spatial stillness. We believe that true luxury is not defined by excess, but by the thoughtful proportion of space, the integrity of honest raw materials, and the way light transforms a room over time.',
  founderQuote: 'Space should not shout. It should breathe, listen, and hold the rhythm of human contemplation with effortless dignity.',
  methodologySteps: [
    {
      number: '01',
      title: 'Discovery & Spatial Study',
      subtitle: 'Listening to site, context & lifestyle',
      description: 'We begin with an exhaustive immersion into how you live, the orientation of sunlight on your site, and the emotional resonance you desire from your surroundings.'
    },
    {
      number: '02',
      title: 'Materiality & Concept',
      subtitle: 'Establishing the tactile language',
      description: 'Rather than starting with digital renderings, we assemble tactile material boards: Roman travertine, smoked oak, unbleached linen, and patinated metals.'
    },
    {
      number: '03',
      title: 'Detailed Craft & Curation',
      subtitle: 'Millwork engineering & fine curation',
      description: 'Every cabinet joint, shadow gap, and recessed light fixture is meticulously drafted. We commission custom pieces with master artisans across Kyoto, Milan, and London.'
    },
    {
      number: '04',
      title: 'Turnkey Execution',
      subtitle: 'From groundbreak to white-glove handover',
      description: 'Our studio oversees construction with uncompromising rigor, delivering a home that is entirely ready to inhabit from the moment you turn the key.'
    }
  ],
  principles: [
    {
      title: 'Monolithic Restraint',
      description: 'We favor singular, monumental gestures over fragmented decorative noise.',
      detail: 'A single 4-meter travertine hearth carries more poetic weight than layers of superficial wall decor.'
    },
    {
      title: 'Honest Materiality',
      description: 'Surfaces should feel authentic to the hand and age with dignity.',
      detail: 'We celebrate natural stone fissures, the warm grain of fumed oak, and metals that acquire character through touch.'
    },
    {
      title: 'Choreographed Daylight',
      description: 'Light is our primary building material, sculpting spatial volume throughout the day.',
      detail: 'Deep window reveals, fluted screens, and high clerestories invite daylight in measured, serene gradients.'
    },
    {
      title: 'Quiet Permanence',
      description: 'Designing beyond fleeting interior design trends for generational longevity.',
      detail: 'Homes that feel both ancient and contemporary, standing timelessly fifty years into the future.'
    }
  ],
  testimonial: {
    quote: 'Samyak Interiors transformed our Kyoto retreat into something that transcends architecture. Living in The Terra Residence feels like inhabiting a sanctuary of light and stone.',
    client: 'Kenji & Elena Takahashi',
    role: 'Private Art Collectors & Patrons',
    project: 'The Terra Residence, Kyoto'
  }
};

const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    fullName: 'David & Vivienne Sterling',
    email: 'v.sterling@sterling-holdings.co.uk',
    phone: '+44 20 7946 0912',
    projectType: 'Residential Architecture',
    budgetRange: '$500,000 — $1,000,000',
    timeline: '6 — 12 Months',
    location: 'Cotswolds & London Mayfair',
    notes: 'Acquired a Grade II listed Georgian country manor. Looking for full interior spatial overhaul, keeping original stonework while introducing Japanese minimalist sensibilities.',
    status: 'In Review',
    createdAt: '2026-09-15T10:30:00.000Z'
  },
  {
    id: 'inq-2',
    fullName: 'Genevieve Moreau',
    email: 'genevieve@moreau-horlogerie.fr',
    phone: '+33 1 42 68 55 00',
    projectType: 'Commercial & Atelier',
    budgetRange: '$250,000 — $500,000',
    timeline: '3 — 6 Months',
    location: 'Geneva Old Town, Switzerland',
    notes: 'Private boutique showroom for custom complications. Need ultra-secure yet museum-like atmosphere with limestone and dark steel.',
    status: 'Scheduled',
    createdAt: '2026-09-28T14:15:00.000Z'
  }
];

const INITIAL_CONSULTATIONS: Consultation[] = [
  {
    id: 'cons-1',
    clientName: 'Alexander Hayes',
    email: 'alexander@hayesfamily.com',
    phone: '+1 415 890 2311',
    projectType: 'Residential Architecture',
    preferredDate: '2026-10-18',
    preferredTime: '14:00 Studio Meeting / Video Call',
    notes: 'Reviewing architectural plans for our coastal Carmel property. Interested in turnkey delivery and custom furniture curation.',
    status: 'Confirmed',
    createdAt: '2026-10-02T09:00:00.000Z'
  }
];

const INITIAL_USERS = [
  {
    id: 'usr-1',
    email: 'curator@samyakinteriors.com',
    password: 'forma2026', // Demo credentials for Headless CMS Studio Portal
    name: 'Samyak (Principal Architect)',
    role: 'director' as const
  },
  {
    id: 'usr-2',
    email: 'studio@samyakinteriors.com',
    password: 'forma2026',
    name: 'Studio Curator Team',
    role: 'curator' as const
  }
];

class DatabaseManager {
  private state: DBState;

  constructor() {
    this.state = this.loadState();
  }

  private loadState(): DBState {
    try {
      if (fs.existsSync(DB_FILE)) {
        const data = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to load database.json, initializing fresh seed state', e);
    }
    const freshState: DBState = {
      projects: INITIAL_PROJECTS,
      services: INITIAL_SERVICES,
      inquiries: INITIAL_INQUIRIES,
      consultations: INITIAL_CONSULTATIONS,
      cms: INITIAL_CMS,
      users: INITIAL_USERS
    };
    this.saveState(freshState);
    return freshState;
  }

  private saveState(stateToSave?: DBState): void {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(stateToSave || this.state, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error saving database state:', e);
    }
  }

  public getState(): DBState {
    return this.state;
  }

  // Projects CRUD
  public getProjects(filter?: { category?: string; search?: string }): Project[] {
    let result = [...this.state.projects];
    if (filter?.category && filter.category !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === filter.category?.toLowerCase());
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase().trim();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.headline.toLowerCase().includes(q) ||
        p.materials?.some(m => m.name.toLowerCase().includes(q) || m.texture.toLowerCase().includes(q))
      );
    }
    return result;
  }

  public getProjectBySlug(slug: string): Project | undefined {
    return this.state.projects.find(p => p.slug === slug || p.id === slug);
  }

  public addProject(project: Omit<Project, 'id'>): Project {
    const id = `proj-${Date.now()}`;
    const newProj: Project = { ...project, id };
    this.state.projects.unshift(newProj);
    this.saveState();
    return newProj;
  }

  public updateProject(id: string, updates: Partial<Project>): Project | undefined {
    const idx = this.state.projects.findIndex(p => p.id === id || p.slug === id);
    if (idx === -1) return undefined;
    this.state.projects[idx] = { ...this.state.projects[idx], ...updates };
    this.saveState();
    return this.state.projects[idx];
  }

  public deleteProject(id: string): boolean {
    const initialLen = this.state.projects.length;
    this.state.projects = this.state.projects.filter(p => p.id !== id && p.slug !== id);
    if (this.state.projects.length !== initialLen) {
      this.saveState();
      return true;
    }
    return false;
  }

  // Services
  public getServices(): ServiceItem[] {
    return this.state.services;
  }

  public getServiceBySlug(slug: string): ServiceItem | undefined {
    return this.state.services.find(s => s.slug === slug || s.id === slug);
  }

  // Inquiries
  public getInquiries(): Inquiry[] {
    return this.state.inquiries;
  }

  public addInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Inquiry {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    this.state.inquiries.unshift(newInquiry);
    this.saveState();
    return newInquiry;
  }

  public updateInquiryStatus(id: string, status: Inquiry['status']): Inquiry | undefined {
    const inq = this.state.inquiries.find(i => i.id === id);
    if (!inq) return undefined;
    inq.status = status;
    this.saveState();
    return inq;
  }

  // Consultations
  public getConsultations(): Consultation[] {
    return this.state.consultations;
  }

  public addConsultation(consultation: Omit<Consultation, 'id' | 'createdAt' | 'status'>): Consultation {
    const newCons: Consultation = {
      ...consultation,
      id: `cons-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    this.state.consultations.unshift(newCons);
    this.saveState();
    return newCons;
  }

  public updateConsultationStatus(id: string, status: Consultation['status']): Consultation | undefined {
    const cons = this.state.consultations.find(c => c.id === id);
    if (!cons) return undefined;
    cons.status = status;
    this.saveState();
    return cons;
  }

  // CMS
  public getCMS(): StudioCMS {
    return this.state.cms;
  }

  public updateCMS(updates: Partial<StudioCMS>): StudioCMS {
    this.state.cms = { ...this.state.cms, ...updates };
    this.saveState();
    return this.state.cms;
  }

  // Auth User
  public getUserByEmail(email: string) {
    return this.state.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  // MySQL SQL Query Runner / Relational Engine
  public executeSQLQuery(rawQuery: string): { columns: string[]; rows: any[]; rowCount: number; executionTimeMs: number; error?: string } {
    const startTime = performance.now();
    const query = rawQuery.trim();

    try {
      const upper = query.toUpperCase();

      if (upper.startsWith('SHOW TABLES')) {
        const tables = ['projects', 'materials', 'spatial_zones', 'services', 'inquiries', 'consultations', 'cms_content', 'users'];
        return {
          columns: ['Tables_in_samyak_interiors'],
          rows: tables.map(t => ({ Tables_in_samyak_interiors: t })),
          rowCount: tables.length,
          executionTimeMs: Math.round(performance.now() - startTime)
        };
      }

      if (upper.startsWith('DESCRIBE') || upper.startsWith('DESC')) {
        const parts = query.split(/\s+/);
        const tableName = parts[1]?.toLowerCase().replace(/;/g, '');
        const schemaMap: Record<string, any[]> = {
          projects: [
            { Field: 'id', Type: 'varchar(64)', Null: 'NO', Key: 'PRI', Default: null },
            { Field: 'slug', Type: 'varchar(128)', Null: 'NO', Key: 'UNI', Default: null },
            { Field: 'title', Type: 'varchar(255)', Null: 'NO', Key: '', Default: null },
            { Field: 'category', Type: 'enum("Residential","Commercial","Renovation")', Null: 'NO', Key: 'MUL', Default: 'Residential' },
            { Field: 'location', Type: 'varchar(255)', Null: 'YES', Key: '', Default: null },
            { Field: 'area', Type: 'varchar(64)', Null: 'YES', Key: '', Default: null },
            { Field: 'year', Type: 'varchar(16)', Null: 'YES', Key: '', Default: null },
            { Field: 'featured', Type: 'tinyint(1)', Null: 'NO', Key: '', Default: '0' }
          ],
          inquiries: [
            { Field: 'id', Type: 'varchar(64)', Null: 'NO', Key: 'PRI', Default: null },
            { Field: 'full_name', Type: 'varchar(255)', Null: 'NO', Key: '', Default: null },
            { Field: 'email', Type: 'varchar(255)', Null: 'NO', Key: '', Default: null },
            { Field: 'project_type', Type: 'varchar(128)', Null: 'YES', Key: '', Default: null },
            { Field: 'budget_range', Type: 'varchar(128)', Null: 'YES', Key: '', Default: null },
            { Field: 'status', Type: 'enum("New","In Review","Scheduled","Archived")', Null: 'NO', Key: '', Default: 'New' },
            { Field: 'created_at', Type: 'timestamp', Null: 'NO', Key: '', Default: 'CURRENT_TIMESTAMP' }
          ],
          consultations: [
            { Field: 'id', Type: 'varchar(64)', Null: 'NO', Key: 'PRI', Default: null },
            { Field: 'client_name', Type: 'varchar(255)', Null: 'NO', Key: '', Default: null },
            { Field: 'email', Type: 'varchar(255)', Null: 'NO', Key: '', Default: null },
            { Field: 'preferred_date', Type: 'date', Null: 'YES', Key: '', Default: null },
            { Field: 'status', Type: 'enum("Pending","Confirmed","Completed","Cancelled")', Null: 'NO', Key: '', Default: 'Pending' }
          ]
        };

        const rows = schemaMap[tableName] || [
          { Field: 'id', Type: 'varchar(64)', Null: 'NO', Key: 'PRI', Default: null },
          { Field: 'data', Type: 'json', Null: 'YES', Key: '', Default: null }
        ];

        return {
          columns: ['Field', 'Type', 'Null', 'Key', 'Default'],
          rows,
          rowCount: rows.length,
          executionTimeMs: Math.round(performance.now() - startTime)
        };
      }

      // SELECT queries
      if (upper.startsWith('SELECT')) {
        let dataset: any[] = [];
        if (upper.includes('FROM PROJECTS')) {
          dataset = this.state.projects.map(p => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            category: p.category,
            location: p.location,
            area: p.area,
            year: p.year,
            featured: p.featured ? 1 : 0
          }));
        } else if (upper.includes('FROM INQUIRIES')) {
          dataset = this.state.inquiries.map(i => ({
            id: i.id,
            full_name: i.fullName,
            email: i.email,
            phone: i.phone,
            project_type: i.projectType,
            budget: i.budgetRange,
            status: i.status,
            created_at: i.createdAt
          }));
        } else if (upper.includes('FROM CONSULTATIONS')) {
          dataset = this.state.consultations.map(c => ({
            id: c.id,
            client_name: c.clientName,
            email: c.email,
            project_type: c.projectType,
            preferred_date: c.preferredDate,
            preferred_time: c.preferredTime,
            status: c.status
          }));
        } else if (upper.includes('FROM SERVICES')) {
          dataset = this.state.services.map(s => ({
            id: s.id,
            slug: s.slug,
            title: s.title,
            category: s.category,
            timeline: s.timeline,
            price_tier: s.priceTier
          }));
        } else if (upper.includes('FROM USERS')) {
          dataset = this.state.users.map(u => ({
            id: u.id,
            email: u.email,
            name: u.name,
            role: u.role
          }));
        } else if (upper.includes('FROM MATERIALS')) {
          dataset = (this.state.projects[0]?.materials || []).map(m => ({
            id: m.id,
            name: m.name,
            origin: m.origin,
            application: m.application,
            texture: m.texture
          }));
        } else {
          dataset = [{ message: 'MySQL Query executed successfully. Table not specified or empty.' }];
        }

        // Apply basic WHERE filtering if present
        if (upper.includes('WHERE')) {
          if (upper.includes("CATEGORY = 'RESIDENTIAL'") || upper.includes('CATEGORY="RESIDENTIAL"')) {
            dataset = dataset.filter(r => r.category === 'Residential');
          } else if (upper.includes("CATEGORY = 'COMMERCIAL'")) {
            dataset = dataset.filter(r => r.category === 'Commercial');
          } else if (upper.includes("FEATURED = 1") || upper.includes("FEATURED = TRUE")) {
            dataset = dataset.filter(r => r.featured === 1);
          } else if (upper.includes("STATUS = 'NEW'")) {
            dataset = dataset.filter(r => r.status === 'New');
          }
        }

        const columns = dataset.length > 0 ? Object.keys(dataset[0]) : ['result'];
        return {
          columns,
          rows: dataset,
          rowCount: dataset.length,
          executionTimeMs: Math.max(1, Math.round(performance.now() - startTime))
        };
      }

      // Default mock success response for DDL / DML
      return {
        columns: ['Status', 'Query'],
        rows: [{ Status: 'Query OK, 0 rows affected', Query: query }],
        rowCount: 1,
        executionTimeMs: Math.round(performance.now() - startTime)
      };
    } catch (err: any) {
      return {
        columns: ['Error'],
        rows: [{ Error: err.message || 'SQL execution failed' }],
        rowCount: 0,
        executionTimeMs: Math.round(performance.now() - startTime),
        error: err.message
      };
    }
  }

  public resetDatabase(): void {
    this.state = {
      projects: INITIAL_PROJECTS,
      services: INITIAL_SERVICES,
      inquiries: INITIAL_INQUIRIES,
      consultations: INITIAL_CONSULTATIONS,
      cms: INITIAL_CMS,
      users: INITIAL_USERS
    };
    this.saveState();
  }
}

export const db = new DatabaseManager();
