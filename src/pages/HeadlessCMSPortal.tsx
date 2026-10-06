import React, { useState, useEffect } from 'react';
import { Lock, Database, FileText, Users, Plus, Trash2, Edit3, CheckCircle, RefreshCw, Terminal, Eye, LogOut } from 'lucide-react';
import { api, authStorage } from '../api.ts';
import { Project, Inquiry, Consultation, StudioCMS, AuthUser } from '../types.ts';

interface HeadlessCMSPortalProps {
  onRefreshData: () => void;
  onNavigateToProject: (slug: string) => void;
}

export const HeadlessCMSPortal: React.FC<HeadlessCMSPortalProps> = ({
  onRefreshData,
  onNavigateToProject,
}) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [emailInput, setEmailInput] = useState('curator@samyakinteriors.com');
  const [passwordInput, setPasswordInput] = useState('forma2026');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Tabs
  const [activeTab, setActiveTab] = useState<'projects' | 'inquiries' | 'cms' | 'sql'>('projects');

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [cms, setCms] = useState<StudioCMS | null>(null);
  const [loadingData, setLoadingData] = useState(false);

  // Edit / Create Project Modal / Form State
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  // CMS copy form state
  const [cmsForm, setCmsForm] = useState<Partial<StudioCMS> | null>(null);
  const [cmsSuccess, setCmsSuccess] = useState(false);

  // Live SQL Query Console state
  const [sqlQuery, setSqlQuery] = useState('SELECT * FROM projects WHERE category = "Residential";');
  const [sqlResult, setSqlResult] = useState<{ columns: string[]; rows: any[]; rowCount: number; executionTimeMs: number; error?: string } | null>(null);
  const [sqlLoading, setSqlLoading] = useState(false);

  // Check initial authentication
  useEffect(() => {
    const user = authStorage.getUser();
    const token = authStorage.getToken();
    if (user && token) {
      setCurrentUser(user);
      loadStudioData();
    }
  }, []);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    try {
      const { user } = await api.login(emailInput, passwordInput);
      setCurrentUser(user);
      loadStudioData();
    } catch (err: any) {
      setLoginError(err.message || 'Login failed. Check credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    api.logout();
    setCurrentUser(null);
  };

  const loadStudioData = async () => {
    setLoadingData(true);
    try {
      const [projData, inqData, consData, cmsData] = await Promise.all([
        api.getProjects(),
        api.getInquiries().catch(() => []),
        api.getConsultations().catch(() => []),
        api.getCMS()
      ]);
      setProjects(projData);
      setInquiries(inqData);
      setConsultations(consData);
      setCms(cmsData);
      setCmsForm(cmsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  // Run SQL Query
  const handleExecuteSQL = async (queryToRun?: string) => {
    const q = queryToRun || sqlQuery;
    setSqlLoading(true);
    try {
      const result = await api.executeSQL(q);
      setSqlResult(result);
    } catch (err: any) {
      setSqlResult({
        columns: ['Error'],
        rows: [{ Error: err.message || 'SQL execution failed' }],
        rowCount: 0,
        executionTimeMs: 0,
        error: err.message
      });
    } finally {
      setSqlLoading(false);
    }
  };

  // Save Project
  const handleSaveProject = async () => {
    if (!editingProject?.title || !editingProject?.category) return;
    try {
      if (isNewProject) {
        await api.createProject({
          ...editingProject,
          slug: editingProject.slug || editingProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          galleryImages: editingProject.galleryImages || [editingProject.coverImage || ''],
          featured: !!editingProject.featured
        });
      } else if (editingProject.id) {
        await api.updateProject(editingProject.id, editingProject);
      }
      setEditingProject(null);
      setIsNewProject(false);
      loadStudioData();
      onRefreshData();
    } catch (e) {
      console.error(e);
    }
  };

  // Delete Project
  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to remove this architectural monograph from the database?')) return;
    try {
      await api.deleteProject(id);
      loadStudioData();
      onRefreshData();
    } catch (e) {
      console.error(e);
    }
  };

  // Update Inquiry Status
  const handleUpdateInquiryStatus = async (id: string, status: Inquiry['status']) => {
    try {
      await api.updateInquiryStatus(id, status);
      loadStudioData();
    } catch (e) {
      console.error(e);
    }
  };

  // Update Consultation Status
  const handleUpdateConsultationStatus = async (id: string, status: Consultation['status']) => {
    try {
      await api.updateConsultationStatus(id, status);
      loadStudioData();
    } catch (e) {
      console.error(e);
    }
  };

  // Save CMS Content
  const handleSaveCMS = async () => {
    if (!cmsForm) return;
    try {
      await api.updateCMS(cmsForm);
      setCmsSuccess(true);
      setTimeout(() => setCmsSuccess(false), 3000);
      loadStudioData();
      onRefreshData();
    } catch (e) {
      console.error(e);
    }
  };

  // -------------------------------------------------------------
  // LOGIN SCREEN (If not authenticated with JWT)
  // -------------------------------------------------------------
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#FBFBFA] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#FAF8F5] border border-[#E0DBD0] p-8 sm:p-10 shadow-lg space-y-6">
          <div className="space-y-2 text-center">
            <div className="inline-flex p-3 rounded-full bg-[#1C1B1A] text-white mx-auto">
              <Lock className="w-5 h-5 stroke-1" />
            </div>
            <h1 className="font-serif text-3xl text-[#1C1B1A]">
              Studio Headless CMS
            </h1>
            <p className="text-xs text-[#7D766D] font-sans">
              Curator & Architect portal for SAMYAK INTERIORS. Authenticated via JWT.
            </p>
          </div>

          {/* Quick Demo Credentials Info */}
          <div className="p-3 bg-[#F2EFE9] border border-[#E0DBD0] text-xs text-[#5E5A54] space-y-1">
            <div className="font-medium text-[#1C1B1A] uppercase tracking-wider text-[10px]">
              Demo Curator Credentials:
            </div>
            <div>Email: <code className="text-[#8C7764]">curator@samyakinteriors.com</code></div>
            <div>Password: <code className="text-[#8C7764]">forma2026</code></div>
          </div>

          {loginError && (
            <div className="p-3 text-xs text-amber-900 bg-amber-50 border border-amber-200">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 font-sans text-xs">
            <div>
              <label className="block uppercase tracking-wider text-[#4A4845] font-medium mb-1">
                Curator Email
              </label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-[#E0DBD0] text-[#1C1B1A] focus:outline-none focus:border-[#8C7764]"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-[#4A4845] font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-[#E0DBD0] text-[#1C1B1A] focus:outline-none focus:border-[#8C7764]"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 px-6 text-xs uppercase tracking-[0.16em] font-medium text-white bg-[#1C1B1A] hover:bg-[#33312E] transition-colors cursor-pointer"
            >
              {loginLoading ? 'Authenticating...' : 'Sign In with JWT'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED HEADLESS CMS INTERFACE
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#FBFBFA] py-12 px-6 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8E4DC] gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#8C7764] font-medium">
              <span>FORMA INTERIORS</span>
              <span>·</span>
              <span>HEADLESS CMS PORTAL</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A] mt-1">
              Studio Content Management & Database
            </h1>
          </div>

          {/* User Badge & Actions */}
          <div className="flex items-center space-x-4">
            <div className="text-right text-xs">
              <span className="font-medium text-[#1C1B1A] block">{currentUser.name}</span>
              <span className="text-[#8C7764] text-[11px]">JWT Auth Active ({currentUser.role})</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-[#7D766D] hover:text-[#1C1B1A] hover:bg-[#F3EFE8] rounded-full transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-2 overflow-x-auto border-b border-[#E8E4DC] pb-2 text-xs font-medium">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-[#1C1B1A] text-white'
                : 'bg-[#F2EFE9] text-[#4A4845] hover:bg-[#EAE5DC]'
            }`}
          >
            Architectural Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'inquiries'
                ? 'bg-[#1C1B1A] text-white'
                : 'bg-[#F2EFE9] text-[#4A4845] hover:bg-[#EAE5DC]'
            }`}
          >
            Inquiries & Consultations ({inquiries.length + consultations.length})
          </button>
          <button
            onClick={() => setActiveTab('cms')}
            className={`px-4 py-2 uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'cms'
                ? 'bg-[#1C1B1A] text-white'
                : 'bg-[#F2EFE9] text-[#4A4845] hover:bg-[#EAE5DC]'
            }`}
          >
            Studio Copy & Stats
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`px-4 py-2 uppercase tracking-wider transition-colors cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'sql'
                ? 'bg-[#8C7764] text-white'
                : 'bg-[#F2EFE9] text-[#4A4845] hover:bg-[#EAE5DC]'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>MySQL / Relational Console</span>
          </button>
        </div>

        {/* -------------------------------------------------------------
            TAB 1: ARCHITECTURAL PROJECTS
        ------------------------------------------------------------- */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl text-[#1C1B1A]">Portfolio Catalog</h2>
                <p className="text-xs text-[#7D766D]">
                  Manage monographs, materiality notes, and spatial planning zones.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingProject({
                    title: '',
                    category: 'Residential',
                    location: '',
                    area: '450 m²',
                    year: '2026',
                    clientType: 'Private Commission',
                    headline: '',
                    conceptNarrative: '',
                    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
                    galleryImages: [],
                    featured: false
                  });
                  setIsNewProject(true);
                }}
                className="px-4 py-2.5 bg-[#1C1B1A] text-white text-xs uppercase tracking-wider font-medium flex items-center space-x-2 hover:bg-[#33312E] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Monograph</span>
              </button>
            </div>

            {/* Projects Table */}
            <div className="bg-[#FAF8F5] border border-[#E8E4DC] overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F2EFE9] border-b border-[#E8E4DC] uppercase tracking-wider text-[#8C7764]">
                  <tr>
                    <th className="p-4">Project Title</th>
                    <th className="p-4">Typology</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Area</th>
                    <th className="p-4">Year</th>
                    <th className="p-4">Materials</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E4DC]">
                  {projects.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F6F3EB] transition-colors">
                      <td className="p-4 font-medium text-[#1C1B1A]">
                        <div className="font-serif text-base">{p.title}</div>
                        <div className="text-[11px] text-[#7D766D] font-mono">{p.slug}</div>
                      </td>
                      <td className="p-4 text-[#4A4845]">{p.category}</td>
                      <td className="p-4 text-[#4A4845]">{p.location}</td>
                      <td className="p-4 text-[#4A4845] tabular-nums">{p.area}</td>
                      <td className="p-4 text-[#4A4845] tabular-nums">{p.year}</td>
                      <td className="p-4 text-[#4A4845] tabular-nums">
                        {p.materials?.length || 0} materials · {p.spatialZones?.length || 0} zones
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => onNavigateToProject(p.slug)}
                          className="p-1.5 text-[#8C7764] hover:text-[#1C1B1A] cursor-pointer"
                          title="Preview in public view"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingProject(p);
                            setIsNewProject(false);
                          }}
                          className="p-1.5 text-[#8C7764] hover:text-[#1C1B1A] cursor-pointer"
                          title="Edit monograph"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="p-1.5 text-stone-400 hover:text-red-700 cursor-pointer"
                          title="Delete monograph"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Edit / New Project Modal */}
            {editingProject && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="w-full max-w-2xl bg-[#FAF8F5] border border-[#E0DBD0] p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
                  <h3 className="font-serif text-2xl text-[#1C1B1A]">
                    {isNewProject ? 'Create Architectural Monograph' : `Edit: ${editingProject.title}`}
                  </h3>

                  <div className="space-y-4 text-xs font-sans">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-medium text-[#4A4845] mb-1">Title</label>
                        <input
                          type="text"
                          value={editingProject.title || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          className="w-full px-3 py-2 bg-[#F6F4EE] border border-[#E0DBD0]"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-[#4A4845] mb-1">Typology</label>
                        <select
                          value={editingProject.category || 'Residential'}
                          onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                          className="w-full px-3 py-2 bg-[#F6F4EE] border border-[#E0DBD0]"
                        >
                          <option value="Residential">Residential</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Renovation">Renovation</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block font-medium text-[#4A4845] mb-1">Location</label>
                        <input
                          type="text"
                          value={editingProject.location || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                          className="w-full px-3 py-2 bg-[#F6F4EE] border border-[#E0DBD0]"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-[#4A4845] mb-1">Area / Scale</label>
                        <input
                          type="text"
                          value={editingProject.area || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, area: e.target.value })}
                          className="w-full px-3 py-2 bg-[#F6F4EE] border border-[#E0DBD0]"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-[#4A4845] mb-1">Year</label>
                        <input
                          type="text"
                          value={editingProject.year || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                          className="w-full px-3 py-2 bg-[#F6F4EE] border border-[#E0DBD0]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-[#4A4845] mb-1">Headline Kicker</label>
                      <input
                        type="text"
                        value={editingProject.headline || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, headline: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F6F4EE] border border-[#E0DBD0]"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-[#4A4845] mb-1">Concept Narrative</label>
                      <textarea
                        rows={4}
                        value={editingProject.conceptNarrative || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, conceptNarrative: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F6F4EE] border border-[#E0DBD0]"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-[#4A4845] mb-1">Cover Image URL</label>
                      <input
                        type="text"
                        value={editingProject.coverImage || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, coverImage: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F6F4EE] border border-[#E0DBD0]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#E8E4DC]">
                    <button
                      onClick={() => setEditingProject(null)}
                      className="px-4 py-2 border border-[#E0DBD0] text-xs uppercase cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProject}
                      className="px-6 py-2 bg-[#1C1B1A] text-white text-xs uppercase cursor-pointer hover:bg-[#33312E]"
                    >
                      Save to MySQL
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 2: INQUIRIES & CONSULTATIONS
        ------------------------------------------------------------- */}
        {activeTab === 'inquiries' && (
          <div className="space-y-12">
            
            {/* Project Inquiries */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl text-[#1C1B1A]">Commission Inquiries ({inquiries.length})</h2>
              <div className="bg-[#FAF8F5] border border-[#E8E4DC] overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F2EFE9] border-b border-[#E8E4DC] uppercase tracking-wider text-[#8C7764]">
                    <tr>
                      <th className="p-4">Client Name</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Typology</th>
                      <th className="p-4">Budget Range</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Received</th>
                      <th className="p-4 text-right">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E4DC]">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-[#F6F3EB]">
                        <td className="p-4 font-medium text-[#1C1B1A]">{inq.fullName}</td>
                        <td className="p-4 text-[#4A4845]">
                          <div>{inq.email}</div>
                          <div className="text-[11px] text-[#7D766D]">{inq.phone}</div>
                        </td>
                        <td className="p-4 text-[#4A4845]">{inq.projectType}</td>
                        <td className="p-4 text-[#4A4845] font-medium">{inq.budgetRange}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase ${
                            inq.status === 'New' ? 'bg-amber-100 text-amber-800' :
                            inq.status === 'In Review' ? 'bg-blue-100 text-blue-800' :
                            inq.status === 'Scheduled' ? 'bg-emerald-100 text-emerald-800' :
                            'bg-stone-100 text-stone-700'
                          }`}>
                            {inq.status}
                          </span>
                        </td>
                        <td className="p-4 text-[#7D766D] tabular-nums">
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-right">
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as any)}
                            className="bg-[#F6F4EE] border border-[#E0DBD0] text-xs px-2 py-1"
                          >
                            <option value="New">New</option>
                            <option value="In Review">In Review</option>
                            <option value="Scheduled">Scheduled</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Consultations Bookings */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl text-[#1C1B1A]">Consultation Bookings ({consultations.length})</h2>
              <div className="bg-[#FAF8F5] border border-[#E8E4DC] overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F2EFE9] border-b border-[#E8E4DC] uppercase tracking-wider text-[#8C7764]">
                    <tr>
                      <th className="p-4">Client</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Service</th>
                      <th className="p-4">Preferred Slot</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Status Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E4DC]">
                    {consultations.map((c) => (
                      <tr key={c.id} className="hover:bg-[#F6F3EB]">
                        <td className="p-4 font-medium text-[#1C1B1A]">{c.clientName}</td>
                        <td className="p-4 text-[#4A4845]">{c.email}</td>
                        <td className="p-4 text-[#4A4845]">{c.projectType}</td>
                        <td className="p-4 text-[#4A4845]">
                          <div>{c.preferredDate || 'Flexible'}</div>
                          <div className="text-[11px] text-[#7D766D]">{c.preferredTime}</div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase ${
                            c.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <select
                            value={c.status}
                            onChange={(e) => handleUpdateConsultationStatus(c.id, e.target.value as any)}
                            className="bg-[#F6F4EE] border border-[#E0DBD0] text-xs px-2 py-1"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 3: CMS COPY & STATS
        ------------------------------------------------------------- */}
        {activeTab === 'cms' && cmsForm && (
          <div className="bg-[#FAF8F5] border border-[#E8E4DC] p-8 space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl text-[#1C1B1A]">Studio Editorial Content & Stats</h2>
                <p className="text-xs text-[#7D766D]">
                  Updates reflect instantly across Home and About pages.
                </p>
              </div>
              {cmsSuccess && (
                <div className="flex items-center space-x-1.5 text-xs text-emerald-800 bg-emerald-50 px-3 py-1 border border-emerald-200">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Content updated in database</span>
                </div>
              )}
            </div>

            {/* Studio Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#E8E4DC] text-xs">
              <div>
                <label className="block text-[#4A4845] font-medium mb-1">Years Practice</label>
                <input
                  type="text"
                  value={cmsForm.stats?.experienceYears || ''}
                  onChange={(e) => setCmsForm({
                    ...cmsForm,
                    stats: { ...cmsForm.stats!, experienceYears: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-[#F6F4EE] border border-[#E0DBD0]"
                />
              </div>
              <div>
                <label className="block text-[#4A4845] font-medium mb-1">Projects Completed</label>
                <input
                  type="text"
                  value={cmsForm.stats?.projectsCount || ''}
                  onChange={(e) => setCmsForm({
                    ...cmsForm,
                    stats: { ...cmsForm.stats!, projectsCount: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-[#F6F4EE] border border-[#E0DBD0]"
                />
              </div>
              <div>
                <label className="block text-[#4A4845] font-medium mb-1">Global Cities</label>
                <input
                  type="text"
                  value={cmsForm.stats?.citiesCount || ''}
                  onChange={(e) => setCmsForm({
                    ...cmsForm,
                    stats: { ...cmsForm.stats!, citiesCount: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-[#F6F4EE] border border-[#E0DBD0]"
                />
              </div>
              <div>
                <label className="block text-[#4A4845] font-medium mb-1">Private Patrons</label>
                <input
                  type="text"
                  value={cmsForm.stats?.clientsCount || ''}
                  onChange={(e) => setCmsForm({
                    ...cmsForm,
                    stats: { ...cmsForm.stats!, clientsCount: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-[#F6F4EE] border border-[#E0DBD0]"
                />
              </div>
            </div>

            {/* Biography */}
            <div className="space-y-2 text-xs">
              <label className="block font-medium text-[#4A4845]">Studio Biography</label>
              <textarea
                rows={4}
                value={cmsForm.biography || ''}
                onChange={(e) => setCmsForm({ ...cmsForm, biography: e.target.value })}
                className="w-full px-3 py-2 bg-[#F6F4EE] border border-[#E0DBD0]"
              />
            </div>

            {/* Founder Quote */}
            <div className="space-y-2 text-xs">
              <label className="block font-medium text-[#4A4845]">Founder's Architectural Quote</label>
              <input
                type="text"
                value={cmsForm.founderQuote || ''}
                onChange={(e) => setCmsForm({ ...cmsForm, founderQuote: e.target.value })}
                className="w-full px-3 py-2 bg-[#F6F4EE] border border-[#E0DBD0]"
              />
            </div>

            <button
              onClick={handleSaveCMS}
              className="px-6 py-3 bg-[#1C1B1A] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#33312E] cursor-pointer"
            >
              Save Content Changes
            </button>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 4: MYSQL RELATIONAL DATABASE & LIVE SQL CONSOLE
        ------------------------------------------------------------- */}
        {activeTab === 'sql' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-xs text-[#8C7764] font-mono">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>MySQL Relational Database Engine</span>
                </div>
                <h2 className="font-serif text-2xl text-[#1C1B1A] mt-1">
                  Live MySQL Query Console (JWT Secured)
                </h2>
                <p className="text-xs text-[#7D766D]">
                  Run raw SQL queries against tables: <code className="bg-[#EBE6DD] px-1 py-0.5">projects</code>, <code className="bg-[#EBE6DD] px-1 py-0.5">materials</code>, <code className="bg-[#EBE6DD] px-1 py-0.5">inquiries</code>, <code className="bg-[#EBE6DD] px-1 py-0.5">consultations</code>, <code className="bg-[#EBE6DD] px-1 py-0.5">services</code>.
                </p>
              </div>

              {/* Reset to Seed Button */}
              <button
                onClick={async () => {
                  if (confirm('Reset database to default seed monograph state?')) {
                    await api.resetSQL();
                    loadStudioData();
                    onRefreshData();
                  }
                }}
                className="px-3 py-1.5 border border-[#E0DBD0] text-xs text-[#7D766D] hover:text-[#1C1B1A] cursor-pointer"
              >
                Reset Default Seed
              </button>
            </div>

            {/* Quick Sample Queries */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#8C7764] font-medium">Quick Queries:</span>
              {[
                'SELECT * FROM projects WHERE category = "Residential";',
                'SELECT id, full_name, email, project_type, status FROM inquiries;',
                'SELECT * FROM consultations;',
                'SHOW TABLES;',
                'DESCRIBE projects;'
              ].map((querySample) => (
                <button
                  key={querySample}
                  onClick={() => {
                    setSqlQuery(querySample);
                    handleExecuteSQL(querySample);
                  }}
                  className="px-2.5 py-1 bg-[#F2EFE9] hover:bg-[#EAE5DC] text-[#1C1B1A] font-mono text-[11px] border border-[#E0DBD0] rounded cursor-pointer"
                >
                  {querySample.split(';')[0]}
                </button>
              ))}
            </div>

            {/* Query Editor & Run */}
            <div className="bg-[#1C1B1A] p-4 rounded-md space-y-3 font-mono text-xs">
              <textarea
                rows={3}
                value={sqlQuery}
                onChange={(e) => setSqlQuery(e.target.value)}
                placeholder="Enter MySQL query (e.g. SELECT * FROM projects;)"
                className="w-full bg-[#272523] text-emerald-400 p-3 rounded font-mono text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-stone-400">
                  Secured with Bearer JWT token header
                </span>
                <button
                  onClick={() => handleExecuteSQL()}
                  disabled={sqlLoading}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs uppercase tracking-wider font-semibold rounded cursor-pointer transition-colors"
                >
                  {sqlLoading ? 'Running...' : 'Execute SQL Query'}
                </button>
              </div>
            </div>

            {/* Query Result Output */}
            {sqlResult && (
              <div className="bg-[#FAF8F5] border border-[#E8E4DC] p-6 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#7D766D] border-b border-[#E8E4DC] pb-3">
                  <div>
                    STATUS: {sqlResult.error ? (
                      <span className="text-red-700 font-bold">ERROR</span>
                    ) : (
                      <span className="text-emerald-700 font-bold">SUCCESS (OK)</span>
                    )}
                  </div>
                  <div>
                    {sqlResult.rowCount} rows affected · {sqlResult.executionTimeMs} ms latency
                  </div>
                </div>

                {sqlResult.rows.length > 0 ? (
                  <div className="overflow-x-auto max-h-96">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-[#F2EFE9] border-b border-[#E8E4DC] text-[#8C7764]">
                        <tr>
                          {sqlResult.columns.map((col) => (
                            <th key={col} className="p-3">{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8E4DC]">
                        {sqlResult.rows.map((row, idx) => (
                          <tr key={idx} className="hover:bg-[#F6F3EB]">
                            {sqlResult.columns.map((col) => (
                              <td key={col} className="p-3 max-w-xs truncate text-[#33312E]">
                                {row[col] !== undefined && row[col] !== null ? String(row[col]) : 'NULL'}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-xs text-[#7D766D] italic py-2">
                    Empty set (0 rows returned).
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
