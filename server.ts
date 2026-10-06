import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './server/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET || 'forma_samyak_interiors_editorial_secret_2026';
const PORT = 3000;
const app = express();

app.use(express.json());

// JWT Authentication Middleware
export interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string; role: string; name: string };
}

function verifyJWTMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Access denied. Missing or invalid Authorization header.' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired JWT token.' });
  }
}

// -------------------------------------------------------------
// Authentication Endpoints
// -------------------------------------------------------------
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  const user = db.getUserByEmail(email);
  if (!user || user.password !== password) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  const payload = { id: user.id, email: user.email, role: user.role, name: user.name };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

  res.json({
    token,
    user: payload,
    message: 'Authentication successful. Studio permissions granted.'
  });
});

app.get('/api/auth/me', verifyJWTMiddleware, (req: AuthenticatedRequest, res: Response) => {
  res.json({ user: req.user });
});

// -------------------------------------------------------------
// Projects API
// -------------------------------------------------------------
app.get('/api/projects', (req: Request, res: Response) => {
  const { category, search } = req.query as { category?: string; search?: string };
  const projects = db.getProjects({ category, search });
  res.json(projects);
});

app.get('/api/projects/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  const project = db.getProjectBySlug(slug);
  if (!project) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }
  res.json(project);
});

app.post('/api/projects', verifyJWTMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const projectData = req.body;
  if (!projectData.title || !projectData.category) {
    res.status(400).json({ error: 'Title and category are required' });
    return;
  }
  const created = db.addProject(projectData);
  res.status(201).json(created);
});

app.put('/api/projects/:id', verifyJWTMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const updated = db.updateProject(id, req.body);
  if (!updated) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }
  res.json(updated);
});

app.delete('/api/projects/:id', verifyJWTMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const deleted = db.deleteProject(id);
  if (!deleted) {
    res.status(404).json({ error: 'Project not found or already deleted' });
    return;
  }
  res.json({ message: 'Project removed successfully' });
});

// -------------------------------------------------------------
// Services API
// -------------------------------------------------------------
app.get('/api/services', (_req: Request, res: Response) => {
  const services = db.getServices();
  res.json(services);
});

app.get('/api/services/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  const service = db.getServiceBySlug(slug);
  if (!service) {
    res.status(404).json({ error: 'Service not found' });
    return;
  }
  res.json(service);
});

// -------------------------------------------------------------
// Inquiries API
// -------------------------------------------------------------
app.post('/api/inquiries', (req: Request, res: Response) => {
  const { fullName, email, phone, projectType, budgetRange, timeline, location, notes } = req.body;
  if (!fullName || !email) {
    res.status(400).json({ error: 'Full name and email are required' });
    return;
  }
  const inquiry = db.addInquiry({
    fullName,
    email,
    phone: phone || '',
    projectType: projectType || 'Residential Architecture',
    budgetRange: budgetRange || 'Undisclosed',
    timeline: timeline || 'Flexible',
    location: location || '',
    notes: notes || ''
  });
  res.status(201).json({ inquiry, message: 'Your project inquiry has been received. Our studio director will contact you within 24 hours.' });
});

app.get('/api/inquiries', verifyJWTMiddleware, (_req: AuthenticatedRequest, res: Response) => {
  const inquiries = db.getInquiries();
  res.json(inquiries);
});

app.patch('/api/inquiries/:id', verifyJWTMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = db.updateInquiryStatus(id, status);
  if (!updated) {
    res.status(404).json({ error: 'Inquiry not found' });
    return;
  }
  res.json(updated);
});

// -------------------------------------------------------------
// Consultations API
// -------------------------------------------------------------
app.post('/api/consultations', (req: Request, res: Response) => {
  const { clientName, email, phone, projectType, preferredDate, preferredTime, notes } = req.body;
  if (!clientName || !email) {
    res.status(400).json({ error: 'Client name and email are required' });
    return;
  }
  const consultation = db.addConsultation({
    clientName,
    email,
    phone: phone || '',
    projectType: projectType || 'Residential Architecture',
    preferredDate: preferredDate || '',
    preferredTime: preferredTime || '',
    notes: notes || ''
  });
  res.status(201).json({ consultation, message: 'Consultation request scheduled with Samyak Interiors studio.' });
});

app.get('/api/consultations', verifyJWTMiddleware, (_req: AuthenticatedRequest, res: Response) => {
  const consultations = db.getConsultations();
  res.json(consultations);
});

app.patch('/api/consultations/:id', verifyJWTMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = db.updateConsultationStatus(id, status);
  if (!updated) {
    res.status(404).json({ error: 'Consultation not found' });
    return;
  }
  res.json(updated);
});

// -------------------------------------------------------------
// CMS Content API
// -------------------------------------------------------------
app.get('/api/cms', (_req: Request, res: Response) => {
  res.json(db.getCMS());
});

app.put('/api/cms', verifyJWTMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const updated = db.updateCMS(req.body);
  res.json(updated);
});

// -------------------------------------------------------------
// MySQL / SQL Relational Query Console (JWT Secured)
// -------------------------------------------------------------
app.post('/api/sql/query', verifyJWTMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const { query } = req.body;
  if (!query || typeof query !== 'string') {
    res.status(400).json({ error: 'SQL query string is required' });
    return;
  }
  const result = db.executeSQLQuery(query);
  res.json(result);
});

app.post('/api/sql/reset', verifyJWTMiddleware, (_req: AuthenticatedRequest, res: Response) => {
  db.resetDatabase();
  res.json({ message: 'Database reset to default editorial seed state.' });
});

// -------------------------------------------------------------
// Vite Middlewares (Dev) or Static File Serving (Prod)
// -------------------------------------------------------------
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FORMA | Samyak Interiors server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
