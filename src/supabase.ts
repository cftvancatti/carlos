import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from './data';

export interface ServiceRow {
  number: string;
  title: string;
  description: string;
}

export interface TestimonialRow {
  author_name: string;
  message: string;
  rating: number;
}

const headers = {
  apikey: SUPABASE_PUBLISHABLE_KEY,
  Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
};

async function fetchTable<T>(table: string): Promise<T[] | null> {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/${table}?select=*&order=display_order.asc`,
      { headers },
    );
    if (!response.ok) return null;
    const data = (await response.json()) as T[];
    return Array.isArray(data) && data.length > 0 ? data : null;
  } catch {
    return null;
  }
}

/**
 * Busca os serviços no banco; retorna null se o banco estiver
 * indisponível ou vazio (o chamador usa o conteúdo estático).
 */
export function fetchServices(): Promise<ServiceRow[] | null> {
  return fetchTable<ServiceRow>('services');
}

/**
 * Busca os depoimentos aprovados no banco; retorna null se o banco
 * estiver indisponível ou vazio.
 */
export function fetchTestimonials(): Promise<TestimonialRow[] | null> {
  return fetchTable<TestimonialRow>('testimonials');
}

// ---------- Área admin (login) ----------

const ADMIN_SESSION_KEY = 'admin-session';

export interface AdminSession {
  access_token: string;
  expires_at: number;
}

export interface LeadRow {
  id: string;
  name: string;
  phone: string;
  message: string | null;
  source: string | null;
  status: string | null;
  created_at: string;
}

/**
 * Autentica o admin (e-mail + senha) no Supabase Auth.
 * Retorna a sessão ou null se as credenciais forem inválidas.
 */
export async function adminSignIn(email: string, password: string): Promise<AdminSession | null> {
  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) return null;
    const data = (await response.json()) as {
      access_token?: string;
      expires_in?: number;
    };
    if (!data.access_token || !data.expires_in) return null;
    return {
      access_token: data.access_token,
      expires_at: Date.now() + data.expires_in * 1000 - 60_000,
    };
  } catch {
    return null;
  }
}

/** Recupera a sessão admin salva, se ainda for válida. */
export function getAdminSession(): AdminSession | null {
  try {
    const raw = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as AdminSession;
    if (!session.access_token || Date.now() >= session.expires_at) {
      localStorage.removeItem(ADMIN_SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

/** Salva / encerra a sessão admin. */
export function setAdminSession(session: AdminSession | null): void {
  try {
    if (session) localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    else localStorage.removeItem(ADMIN_SESSION_KEY);
  } catch {
    // sem acesso ao localStorage: sessão só dura até recarregar
  }
}

/**
 * Busca todos os orçamentos (leads) com o token do admin.
 * Retorna 'unauthorized' quando o token expirou,
 * 'error' em falha de conexão e a lista em sucesso.
 */
export async function fetchLeads(
  token: string,
): Promise<{ result: 'ok'; leads: LeadRow[] } | { result: 'unauthorized' } | { result: 'error' }> {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/leads?select=*&order=created_at.desc`, {
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 401 || response.status === 403) return { result: 'unauthorized' };
    if (!response.ok) return { result: 'error' };
    const leads = (await response.json()) as LeadRow[];
    return { result: 'ok', leads: Array.isArray(leads) ? leads : [] };
  } catch {
    return { result: 'error' };
  }
}

export interface LeadInput {
  name: string;
  phone: string;
  message?: string;
}

/**
 * Registra uma solicitação de orçamento na tabela `leads`.
 * Retorna true quando gravado com sucesso.
 */
export async function createLead(lead: LeadInput): Promise<boolean> {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ ...lead, source: 'site' }),
    });
    return response.status === 201;
  } catch {
    return false;
  }
}
