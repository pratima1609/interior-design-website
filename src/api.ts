import { Project, ServiceItem, Inquiry, Consultation, StudioCMS, AuthUser } from './types.ts';

const TOKEN_KEY = 'forma_samyak_jwt_token';
const USER_KEY = 'forma_samyak_user';

export const authStorage = {
  getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  setToken(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (e) {
      console.error(e);
    }
  },
  getUser(): AuthUser | null {
    try {
      const data = localStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  setUser(user: AuthUser): void {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  },
  clear(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch (e) {
      console.error(e);
    }
  }
};

function getAuthHeaders(): HeadersInit {
  const token = authStorage.getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export const api = {
  // Auth
  async login(email: string, password: string): Promise<{ token: string; user: AuthUser }> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Login failed');
    }
    const data = await res.json();
    authStorage.setToken(data.token);
    authStorage.setUser(data.user);
    return data;
  },

  async verifyAuth(): Promise<AuthUser | null> {
    const token = authStorage.getToken();
    if (!token) return null;
    try {
      const res = await fetch('/api/auth/me', {
        headers: getAuthHeaders()
      });
      if (!res.ok) {
        authStorage.clear();
        return null;
      }
      const data = await res.json();
      return data.user;
    } catch {
      return null;
    }
  },

  logout(): void {
    authStorage.clear();
  },

  // Projects
  async getProjects(params?: { category?: string; search?: string }): Promise<Project[]> {
    const url = new URL('/api/projects', window.location.origin);
    if (params?.category) url.searchParams.set('category', params.category);
    if (params?.search) url.searchParams.set('search', params.search);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  },

  async getProject(slug: string): Promise<Project> {
    const res = await fetch(`/api/projects/${slug}`);
    if (!res.ok) throw new Error('Project not found');
    return res.json();
  },

  async createProject(project: Partial<Project>): Promise<Project> {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(project)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create project');
    }
    return res.json();
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to update project');
    }
    return res.json();
  },

  async deleteProject(id: string): Promise<void> {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to delete project');
    }
  },

  // Services
  async getServices(): Promise<ServiceItem[]> {
    const res = await fetch('/api/services');
    if (!res.ok) throw new Error('Failed to fetch services');
    return res.json();
  },

  // Inquiries
  async submitInquiry(data: {
    fullName: string;
    email: string;
    phone?: string;
    projectType?: string;
    budgetRange?: string;
    timeline?: string;
    location?: string;
    notes?: string;
  }): Promise<{ message: string }> {
    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to submit inquiry');
    }
    return res.json();
  },

  async getInquiries(): Promise<Inquiry[]> {
    const res = await fetch('/api/inquiries', {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch inquiries');
    return res.json();
  },

  async updateInquiryStatus(id: string, status: Inquiry['status']): Promise<Inquiry> {
    const res = await fetch(`/api/inquiries/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update inquiry status');
    return res.json();
  },

  // Consultations
  async bookConsultation(data: {
    clientName: string;
    email: string;
    phone?: string;
    projectType?: string;
    preferredDate?: string;
    preferredTime?: string;
    notes?: string;
  }): Promise<{ message: string }> {
    const res = await fetch('/api/consultations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to book consultation');
    }
    return res.json();
  },

  async getConsultations(): Promise<Consultation[]> {
    const res = await fetch('/api/consultations', {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch consultations');
    return res.json();
  },

  async updateConsultationStatus(id: string, status: Consultation['status']): Promise<Consultation> {
    const res = await fetch(`/api/consultations/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update consultation status');
    return res.json();
  },

  // CMS
  async getCMS(): Promise<StudioCMS> {
    const res = await fetch('/api/cms');
    if (!res.ok) throw new Error('Failed to fetch CMS content');
    return res.json();
  },

  async updateCMS(updates: Partial<StudioCMS>): Promise<StudioCMS> {
    const res = await fetch('/api/cms', {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update CMS content');
    return res.json();
  },

  // SQL Runner
  async executeSQL(query: string): Promise<{ columns: string[]; rows: any[]; rowCount: number; executionTimeMs: number; error?: string }> {
    const res = await fetch('/api/sql/query', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ query })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'SQL query failed');
    }
    return res.json();
  },

  async resetSQL(): Promise<{ message: string }> {
    const res = await fetch('/api/sql/reset', {
      method: 'POST',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to reset database');
    return res.json();
  }
};
