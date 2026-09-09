import { useCallback, useEffect, useState } from 'react';
import {
  fetchLeads,
  getAdminSession,
  setAdminSession,
  type AdminSession,
  type LeadRow,
} from '../supabase';
import { AdminLoginForm } from '../components/AdminLoginForm';

type LoadState = 'carregando' | 'ok' | 'erro';

/** Converte o telefone informado em link do WhatsApp (wa.me). */
function whatsappLink(phone: string): string {
  const digitos = phone.replace(/\D/g, '');
  const completo =
    digitos.length === 10 || digitos.length === 11 ? `55${digitos}` : digitos;
  return `https://wa.me/${completo}`;
}

function formatarData(iso: string): string {
  const data = new Date(iso);
  if (Number.isNaN(data.getTime())) return iso;
  return data.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

export function Admin() {
  const [session, setSession] = useState<AdminSession | null>(() => getAdminSession());

  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [estado, setEstado] = useState<LoadState>('carregando');
  const [atualizando, setAtualizando] = useState(false);

  const carregar = useCallback(async (token: string) => {
    const resposta = await fetchLeads(token);
    if (resposta.result === 'ok') {
      setLeads(resposta.leads);
      setEstado('ok');
    } else if (resposta.result === 'unauthorized') {
      setAdminSession(null);
      setSession(null);
    } else {
      setEstado('erro');
    }
  }, []);

  useEffect(() => {
    if (session) void carregar(session.access_token);
  }, [session, carregar]);

  const sair = () => {
    setAdminSession(null);
    setSession(null);
    setLeads([]);
    // Volta para a página Início após sair.
    window.location.hash = '#/';
  };

  const atualizar = async () => {
    if (!session || atualizando) return;
    setAtualizando(true);
    await carregar(session.access_token);
    setAtualizando(false);
  };

  // ----- Caixa de login (aparece antes de entrar) -----
  if (!session) {
    return (
      <section className="section admin-section">
        <div className="container admin-container">
          <div className="admin-login">
            <span className="eyebrow">Área restrita</span>
            <h1>Login do administrador</h1>
            <p>Acesse para ver todos os orçamentos recebidos pelo site.</p>
            <AdminLoginForm onSuccess={setSession} />
          </div>
        </div>
      </section>
    );
  }

  // ----- Painel com os orçamentos -----
  return (
    <section className="section admin-section">
      <div className="container">
        <div className="admin-head">
          <div>
            <span className="eyebrow">Área do administrador</span>
            <h1 className="admin-title">Orçamentos recebidos</h1>
            <p className="admin-count">
              {estado === 'ok'
                ? `${leads.length} ${leads.length === 1 ? 'orçamento' : 'orçamentos'} no total`
                : ''}
            </p>
          </div>
          <div className="admin-actions">
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={atualizar}
              disabled={atualizando || estado === 'erro'}
            >
              {atualizando ? 'Atualizando...' : 'Atualizar'}
            </button>
            <button type="button" className="btn btn-sm btn-outline" onClick={sair}>
              Sair
            </button>
          </div>
        </div>

        {estado === 'carregando' && <p className="admin-msg">Carregando orçamentos...</p>}

        {estado === 'erro' && (
          <p className="admin-erro" role="alert">
            Não foi possível carregar os orçamentos agora. Verifique sua conexão e clique em
            Atualizar.
          </p>
        )}

        {estado === 'ok' && leads.length === 0 && (
          <p className="admin-msg">
            Nenhum orçamento recebido ainda. Assim que alguém enviar o formulário do site, ele
            aparece aqui.
          </p>
        )}

        {estado === 'ok' && leads.length > 0 && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Telefone</th>
                  <th>Mensagem</th>
                  <th>Recebido em</th>
                  <th>Contato</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="admin-lead-name">{lead.name}</td>
                    <td>{lead.phone}</td>
                    <td className="admin-lead-msg">{lead.message || '—'}</td>
                    <td className="admin-lead-data">{formatarData(lead.created_at)}</td>
                    <td>
                      <a
                        className="btn btn-sm btn-whatsapp"
                        href={whatsappLink(lead.phone)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Abrir WhatsApp
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
