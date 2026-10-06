# FORMA | Samyak Interiors — Architecture & Interior Design Studio

An editorial interior architecture portfolio, monograph showcase, consultation booking platform, and headless CMS management system designed for **FORMA | Samyak Interiors**.

Built with an editorial aesthetic utilizing warm ivory tones (`#FBFBFA`), deep charcoal typography (`#1C1B1A`), taupe accents (`#C8B8A6`), serif display headings (*Playfair Display*), and generous spatial breathing room.

---

## ✨ Features & Pages

### 1. Home Page (`FORMA INTERIORS — Home`)
* **Editorial Hero**: Full-width architectural photographic backdrop with warm ivory typography, dual action CTAs (*"Explore Selected Work"* & *"Book Studio Consultation"*), and direct monograph link.
* **Studio Introduction**: Typography-led overview with natural tabular statistics: **10+ Years**, **40+ Projects**, **12 Cities**, **25+ Clients**.
* **Asymmetric Featured Projects Grid**: Curated editorial grid with smooth hover interactions and unboxed metadata (`Residential · Kyoto · 2025`).
* **Design Philosophy Principles**: Four core architectural tenets (*Monolithic Restraint*, *Honest Materiality*, *Choreographed Daylight*, *Quiet Permanence*).
* **4-Step Architectural Methodology**: Phased execution from site discovery and tactile material curation to turnkey handover.
* **Patron Testimonial**: Featured monograph review from private art collectors.

### 2. Projects Page (`Samyak INTERIORS — Selected Work`)
* **Interactive Filter Tabs**: Instant client-side filtering by category (*All*, *Residential*, *Commercial*, *Renovation*).
* **Live Search**: Filter projects by material, location, style, or room name.
* **Asymmetric Masonry Grid**: Editorial rhythm with responsive column distribution and zero-pill metadata discipline.

### 3. Project Detail Page (`The Terra Residence`)
* **Metadata Bar**: Structured breakdown of Location (*Kyoto Highlands*), Typology (*Residential*), Scale (*480 m² / 5,160 sq.ft*), Completion Year (*2025*), Commission Type, and Scope.
* **Concept Narrative**: In-depth architectural thesis on spatial volume, geological mass, and natural lighting.
* **Tactile Material Palette**: Interactive swatches (*Honed Roman Travertine*, *Smoked Belgian Oak*, *Fluted Cast Art Glass*, *Patinated Brushed Brass*, *Belgian Bouclé*) with provenance notes, texture descriptions, and hex swatches.
* **Spatial Planning & Floor Zones**: Interactive zones (*The Grand Living Salon 98m²*, *Culinary Atelier 48m²*, *Private Sanctuary Suite 64m²*, *Sunken Tea Library 34m²*) with architectural specs and square meterage.
* **Curated Image Gallery**: Asymmetric gallery with fullscreen Lightbox Modal supporting keyboard navigation (`ESC`, arrow keys) and thumbnail selector.

### 4. About Page (`samyak INTERIORS — About Us`)
* **Designer Portrait**: Portrait and studio biography of founder and principal architect Samyak.
* **Studio Statistics**: Numerical rigor with tabular figures.
* **Studio Ateliers**: Directory of Kyoto Head Atelier, Tokyo Gallery, and London Studio.

### 5. Services Page (`samyak INTERIORS — Services`)
* Detailed breakdowns of 6 bespoke services:
  1. *Residential Architecture*
  2. *Commercial & Atelier*
  3. *Heritage Renovation*
  4. *Furniture & Styling*
  5. *Space Planning & Feasibility*
  6. *Turnkey Project Delivery*
* Deliverables, timelines, pricing tiers, and **Inclusions Checklists** with checkmarks.
* Direct consultation trigger with pre-selected service.

### 6. Contact & Inquiry Page (`FORMA INTERIORS — Contact & Inquiry`)
* **Project Inquiry Form**: Custom dropdowns for project typology and investment budget ranges (*$150k–$300k*, *$300k–$600k*, *$600k–$1.2M*, *$1.2M+*).
* **Direct Studio Concierge**: Direct email, phone, and visiting hours.
* **Interactive Studio Map**: Switch between Kyoto, London, and Tokyo ateliers to inspect exact coordinates, transit access, and visiting guidelines.

### 7. Headless CMS & Relational Database Portal
* **JWT Authentication**: Secured curator login with JSON Web Tokens.
* **Projects Manager**: Create, edit, and delete monographs directly in the database.
* **Inquiries & Consultation Desk**: Track incoming leads with workflow status toggles (`New` → `In Review` → `Scheduled` → `Archived`).
* **Live Studio Copy Editor**: Edit biography, founder quote, and stats live.
* **Live MySQL Query Console**: Interactive SQL terminal allowing raw queries (`SELECT`, `SHOW TABLES`, `DESCRIBE`) with execution timing and tabular results.

---

## 🛠️ Tech Stack

* **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Motion
* **Backend**: Node.js, Express
* **Database Layer**: Relational SQL engine with schema persistence
* **Security**: JWT authentication (`jsonwebtoken`) with Bearer token headers
* **Build Tool**: Vite 8, tsx

---

## 🚀 Getting Started

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/pratima1609/interior-design-website.git
cd interior-design-website

# Install dependencies
npm install
```

### 2. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build

```bash
npm run build
npm start
```

---

## 🔐 Headless CMS Demo Credentials

To access the internal Studio CMS Portal:
* **Route**: Click **"Studio Portal"** in the top navigation or footer.
* **Email**: `curator@samyakinteriors.com`
* **Password**: `forma2026`

---

## 📄 License

MIT License. Designed & developed for FORMA | Samyak Interiors.
