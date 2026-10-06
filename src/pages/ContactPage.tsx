import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, ArrowRight, Clock, ExternalLink } from 'lucide-react';
import { api } from '../api.ts';

export const ContactPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState('Residential Architecture');
  const [budgetRange, setBudgetRange] = useState('$300,000 — $600,000');
  const [timeline, setTimeline] = useState('6 — 12 Months');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Interactive Studio Map state
  const [activeStudio, setActiveStudio] = useState<'kyoto' | 'london' | 'tokyo'>('kyoto');

  const studios = {
    kyoto: {
      name: 'Kyoto Head Atelier',
      city: 'Kyoto, Japan',
      address: 'Higashiyama-ku, Kiyomizu 605-0862',
      hours: 'Mon — Fri, 10:00 — 18:00 JST (By Appointment)',
      phone: '+81 75 744 1920',
      description: 'Our primary design studio, tea pavilion, and material library. Featuring full-scale mockups of raw travertine, Japanese cedar joinery, and lime plaster.',
      coordinates: '34.9949° N, 135.7850° E',
      transit: '10 min walk from Gion-Shijo Station'
    },
    london: {
      name: 'London Studio & Client Suite',
      city: 'London, United Kingdom',
      address: '28 Grosvenor Street, Mayfair, London W1K 4QR',
      hours: 'Mon — Fri, 09:30 — 17:30 GMT (By Appointment)',
      phone: '+44 20 7946 0880',
      description: 'Liaison office handling European heritage projects, Swiss alpine commissions, and antique dealer representation.',
      coordinates: '51.5118° N, 0.1492° W',
      transit: 'Bond Street & Green Park Underground'
    },
    tokyo: {
      name: 'Tokyo Gallery & Curatorial Lounge',
      city: 'Tokyo, Japan',
      address: 'Minato-ku, Minami-Aoyama 5-7-22, Tokyo 107-0062',
      hours: 'Tue — Sat, 11:00 — 19:00 JST (By Appointment)',
      phone: '+81 3 5410 8821',
      description: 'Private gallery showcasing commissioned artisanal furniture, custom washi lighting pieces, and tactile fabric archives.',
      coordinates: '35.6628° N, 139.7153° E',
      transit: 'Omotesando Station (Exit B3)'
    }
  };

  const currentStudio = studios[activeStudio];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      setError('Please provide your name and email address.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await api.submitInquiry({
        fullName,
        email,
        phone,
        projectType,
        budgetRange,
        timeline,
        location,
        notes,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] py-16 lg:py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C7764]">
            FORMA INTERIORS — Contact & Inquiry
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1C1B1A] leading-tight">
            Initiate a Project Dialogue
          </h1>
          <p className="text-sm sm:text-base text-[#4A4845] font-sans font-light leading-relaxed">
            We welcome inquiries from private clients, curators, family offices, and developers who seek architecture characterized by quiet permanence and tactile integrity.
          </p>
        </div>

        {/* -------------------------------------------------------------
            1. INQUIRY FORM & DIRECT CONTACT SPLIT
        ------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Form Column */}
          <div className="lg:col-span-7 bg-[#FAF8F5] border border-[#E8E4DC] p-8 sm:p-12 shadow-sm">
            {success ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle className="w-12 h-12 text-[#8C7764] mx-auto stroke-1" />
                <h3 className="font-serif text-3xl text-[#1C1B1A]">
                  Inquiry Received
                </h3>
                <p className="text-sm text-[#5E5A54] max-w-md mx-auto font-sans leading-relaxed">
                  Thank you, <span className="font-medium text-[#1C1B1A]">{fullName}</span>. Our principal architect and studio team will review your project brief and respond with next steps within 24 hours.
                </p>
                <div className="pt-6">
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setFullName('');
                      setEmail('');
                      setPhone('');
                      setLocation('');
                      setNotes('');
                    }}
                    className="px-8 py-3 bg-[#1C1B1A] text-white text-xs uppercase tracking-[0.16em] font-medium cursor-pointer hover:bg-[#33312E]"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 font-sans text-xs">
                <div>
                  <h2 className="font-serif text-2xl text-[#1C1B1A] mb-1">
                    Project Commission Brief
                  </h2>
                  <p className="text-[#7D766D]">
                    Fields marked with an asterisk (*) are required for initial review.
                  </p>
                </div>

                {error && (
                  <div className="p-3 text-xs text-amber-900 bg-amber-50 border border-amber-200">
                    {error}
                  </div>
                )}

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block uppercase tracking-wider text-[#4A4845] font-medium mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Kenji & Elena Takahashi"
                      className="w-full px-4 py-3 bg-[#F6F4EE] border border-[#E0DBD0] text-[#1C1B1A] focus:outline-none focus:border-[#8C7764] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-[#4A4845] font-medium mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. contact@domain.com"
                      className="w-full px-4 py-3 bg-[#F6F4EE] border border-[#E0DBD0] text-[#1C1B1A] focus:outline-none focus:border-[#8C7764] transition-colors"
                    />
                  </div>
                </div>

                {/* Telephone & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block uppercase tracking-wider text-[#4A4845] font-medium mb-1.5">
                      Telephone / Mobile
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+81 or +44 or +1..."
                      className="w-full px-4 py-3 bg-[#F6F4EE] border border-[#E0DBD0] text-[#1C1B1A] focus:outline-none focus:border-[#8C7764] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-[#4A4845] font-medium mb-1.5">
                      Site Location / City
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Kyoto, London, Zurich, New York"
                      className="w-full px-4 py-3 bg-[#F6F4EE] border border-[#E0DBD0] text-[#1C1B1A] focus:outline-none focus:border-[#8C7764] transition-colors"
                    />
                  </div>
                </div>

                {/* Custom dropdowns for Project Type & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block uppercase tracking-wider text-[#4A4845] font-medium mb-1.5">
                      Project Typology *
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-4 py-3 bg-[#F6F4EE] border border-[#E0DBD0] text-[#1C1B1A] focus:outline-none focus:border-[#8C7764] transition-colors"
                    >
                      <option value="Residential Architecture">Residential Architecture</option>
                      <option value="Commercial & Atelier">Commercial & Atelier</option>
                      <option value="Heritage Renovation">Heritage Renovation</option>
                      <option value="Furniture & Styling">Furniture & Styling</option>
                      <option value="Space Planning">Space Planning & Feasibility</option>
                      <option value="Turnkey Project Delivery">Turnkey Project Delivery</option>
                    </select>
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-[#4A4845] font-medium mb-1.5">
                      Anticipated Investment Budget *
                    </label>
                    <select
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="w-full px-4 py-3 bg-[#F6F4EE] border border-[#E0DBD0] text-[#1C1B1A] focus:outline-none focus:border-[#8C7764] transition-colors"
                    >
                      <option value="$150,000 — $300,000">$150,000 — $300,000 (Zoning / Styling)</option>
                      <option value="$300,000 — $600,000">$300,000 — $600,000 (Full Interior Renovation)</option>
                      <option value="$600,000 — $1,200,000">$600,000 — $1,200,000 (Architectural Residence)</option>
                      <option value="$1,200,000+ (Comprehensive Estate)">$1,200,000+ (Comprehensive Estate / Turnkey)</option>
                    </select>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <label className="block uppercase tracking-wider text-[#4A4845] font-medium mb-1.5">
                    Target Execution Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F6F4EE] border border-[#E0DBD0] text-[#1C1B1A] focus:outline-none focus:border-[#8C7764] transition-colors"
                  >
                    <option value="Immediate (Within 1 — 3 Months)">Immediate (Within 1 — 3 Months)</option>
                    <option value="3 — 6 Months">3 — 6 Months</option>
                    <option value="6 — 12 Months">6 — 12 Months</option>
                    <option value="Future Planning (12+ Months)">Future Planning (12+ Months)</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block uppercase tracking-wider text-[#4A4845] font-medium mb-1.5">
                    Architectural Vision & Spatial Scope
                  </label>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Describe the property, architectural condition, functional requirements, or materials that resonate with you..."
                    className="w-full px-4 py-3 bg-[#F6F4EE] border border-[#E0DBD0] text-[#1C1B1A] focus:outline-none focus:border-[#8C7764] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 text-xs uppercase tracking-[0.18em] font-medium text-white bg-[#1C1B1A] hover:bg-[#33312E] disabled:opacity-50 transition-colors text-center cursor-pointer"
                >
                  {loading ? 'Transmitting Project Inquiry...' : 'Submit Architectural Commission Inquiry'}
                </button>
              </form>
            )}
          </div>

          {/* Direct Details & Socials Column */}
          <div className="lg:col-span-5 space-y-10 font-sans">
            
            {/* Direct Studio Contact */}
            <div className="p-8 bg-[#F4F1EA] border border-[#E8E4DC] space-y-6">
              <h3 className="font-serif text-2xl text-[#1C1B1A]">
                Direct Studio Concierge
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start space-x-3 text-[#33312E]">
                  <Mail className="w-4 h-4 text-[#8C7764] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium block text-[#1C1B1A]">Inquiries & Commissions</span>
                    <span>atelier@samyakinteriors.com</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-[#33312E]">
                  <Phone className="w-4 h-4 text-[#8C7764] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium block text-[#1C1B1A]">Studio Direct Line</span>
                    <span className="tabular-nums">+81 75 744 1920 (Kyoto) · +44 20 7946 0880 (London)</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-[#33312E]">
                  <Clock className="w-4 h-4 text-[#8C7764] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium block text-[#1C1B1A]">Studio Hours</span>
                    <span>Monday — Friday, 10:00 — 18:00 (JST / GMT)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media & Editorial Press Links */}
            <div className="p-8 bg-[#FAF8F5] border border-[#E8E4DC] space-y-4 text-xs">
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#8C7764]">
                Social & Editorial Press
              </h4>
              <div className="space-y-3">
                <a
                  href="#instagram"
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center justify-between text-[#4A4845] hover:text-[#1C1B1A] transition-colors py-1 border-b border-[#E8E4DC]"
                >
                  <span>Instagram · @samyakinteriors</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#C8B8A6]" />
                </a>
                <a
                  href="#ad"
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center justify-between text-[#4A4845] hover:text-[#1C1B1A] transition-colors py-1 border-b border-[#E8E4DC]"
                >
                  <span>Architectural Digest Monograph Archive</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#C8B8A6]" />
                </a>
                <a
                  href="#pinterest"
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center justify-between text-[#4A4845] hover:text-[#1C1B1A] transition-colors py-1 border-b border-[#E8E4DC]"
                >
                  <span>Pinterest Curation & Material Boards</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#C8B8A6]" />
                </a>
                <a
                  href="#linkedin"
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center justify-between text-[#4A4845] hover:text-[#1C1B1A] transition-colors py-1"
                >
                  <span>LinkedIn Professional Practice</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#C8B8A6]" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* -------------------------------------------------------------
            2. INTERACTIVE STUDIO MAP & VISITING LOCATIONS
        ------------------------------------------------------------- */}
        <div className="space-y-8 pt-12 border-t border-[#E8E4DC]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C7764]">
                Atelier Map
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A] mt-1">
                Interactive Studio Map
              </h2>
            </div>
            
            {/* Studio selector buttons */}
            <div className="flex items-center space-x-2">
              {(['kyoto', 'london', 'tokyo'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveStudio(key)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer ${
                    activeStudio === key
                      ? 'bg-[#1C1B1A] text-white'
                      : 'bg-[#F2EFE9] hover:bg-[#EAE5DC] text-[#4A4845]'
                  }`}
                >
                  {studios[key].city.split(',')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Map Visual Presentation */}
          <div className="bg-[#FAF8F5] border border-[#E8E4DC] grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-sm">
            
            {/* Left: Studio details & visiting guide */}
            <div className="lg:col-span-5 p-8 sm:p-10 space-y-6 font-sans text-xs">
              <div>
                <span className="text-[#8C7764] font-medium uppercase tracking-wider block text-[10px]">
                  Selected Atelier
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1B1A] mt-1">
                  {currentStudio.name}
                </h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-[#8C7764] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#1C1B1A] font-medium block">Studio Address:</span>
                    <span className="text-[#5E5A54]">{currentStudio.address}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <Clock className="w-4 h-4 text-[#8C7764] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#1C1B1A] font-medium block">Appointment Hours:</span>
                    <span className="text-[#5E5A54]">{currentStudio.hours}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <Phone className="w-4 h-4 text-[#8C7764] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#1C1B1A] font-medium block">Phone:</span>
                    <span className="text-[#5E5A54] tabular-nums">{currentStudio.phone}</span>
                  </div>
                </div>
              </div>

              <p className="text-[#4A4845] leading-relaxed border-t border-[#E8E4DC] pt-4">
                {currentStudio.description}
              </p>

              <div className="text-[11px] text-[#7D766D] font-mono space-y-1">
                <div>COORDINATES: {currentStudio.coordinates}</div>
                <div>ACCESS: {currentStudio.transit}</div>
              </div>
            </div>

            {/* Right: Architectural Vector Map Visualizer */}
            <div className="lg:col-span-7 bg-[#EFECE5] relative min-h-[360px] p-8 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-[#E8E4DC]">
              {/* Architectural Grid Lines & Map Geometry */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(#8C7764 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }} />

              {/* Styled interactive map container */}
              <div className="relative z-10 w-full max-w-lg bg-[#FBFBFA] border border-[#D9D3C7] p-6 shadow-md text-center space-y-4">
                <div className="inline-flex p-3 rounded-full bg-[#1C1B1A] text-white">
                  <MapPin className="w-6 h-6 stroke-1" />
                </div>
                <h4 className="font-serif text-xl text-[#1C1B1A]">
                  {currentStudio.name}
                </h4>
                <p className="text-xs text-[#5E5A54] font-sans max-w-sm mx-auto">
                  {currentStudio.address}
                </p>
                <div className="inline-block px-3 py-1 bg-[#F4F1EA] text-[11px] font-mono text-[#8C7764] border border-[#E0DBD0]">
                  {currentStudio.coordinates}
                </div>
                <div className="pt-2 text-[11px] text-[#7D766D] font-sans">
                  Private valet & architectural sample review by arrangement
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
