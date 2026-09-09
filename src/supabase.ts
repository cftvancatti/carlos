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
