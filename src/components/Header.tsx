import { useEffect, useState, type MouseEvent } from 'react';
import { PHONE_DISPLAY, WHATSAPP_URL } from '../data';
import { getAdminSession } from '../supabase';
import { LoginModal } from './LoginModal';

interface HeaderProps {
  route: string;
  onNavigate: (route: string) => void;
}

export function Header({ route, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [temaEscuro, setTemaEscuro] = useState(
    () => document.documentElement.dataset.theme === 'dark',
  );

  useEffect(() => {
    setMenuOpen(false);
  }, [route]);

  const alternarTema = () => {
    const escuro = !temaEscuro;
    setTemaEscuro(escuro);
    if (escuro) document.documentElement.dataset.theme = 'dark';
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem('tema', escuro ? 'escuro' : 'claro');
    } catch {
      // sem acesso ao localStorage: tema vale só para esta visita
    }
  };

  const go = (target: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate(target);
  };

  const abrirLogin = () => {
    setMenuOpen(false);
    // Se já estiver logado, vai direto para o painel.
    if (getAdminSession()) {
      onNavigate('#/admin');
      return;
    }
    setLoginOpen(true);
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#/" className="brand" onClick={go('#/')}>
          <img src="img/logo.jpg" alt="Logo Carlos Instalador" className="brand-logo" />
          <span className="brand-text">
            Carlos Instalador
            <small>Segurança Eletrônica</small>
          </span>
        </a>

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Menu principal">
          <button
            type="button"
            className="theme-toggle"
            onClick={alternarTema}
            aria-label={temaEscuro ? 'Desativar modo escuro' : 'Ativar modo escuro'}
            title={temaEscuro ? 'Modo claro' : 'Modo escuro'}
          >
            {temaEscuro ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            )}
          </button>
          <a
            href="#/"
            className={`nav-link ${route === '#/' ? 'nav-link-active' : ''}`}
            onClick={go('#/')}
          >
            Início
          </a>
          <a
            href="#/servicos"
            className={`nav-link ${route === '#/servicos' ? 'nav-link-active' : ''}`}
            onClick={go('#/servicos')}
          >
            Serviços
          </a>
          <button type="button" className="nav-login" onClick={abrirLogin}>
            Login
          </button>
          <a
            href={WHATSAPP_URL}
            className="btn btn-primary btn-sm nav-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contratar agora !
          </a>
        </nav>

        {loginOpen && (
          <LoginModal
            onClose={() => setLoginOpen(false)}
            onSuccess={() => {
              setLoginOpen(false);
              onNavigate('#/admin');
            }}
          />
        )}

        <button
          className="menu-toggle"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className="header-topbar">
        <div className="container header-topbar-inner">
          <span>Rio de Janeiro – RJ</span>
          <span>Seg a Sex 8h às 18h e Sáb 8h às 14h</span>
          <span>
            Fale Conosco: <strong>{PHONE_DISPLAY}</strong>
          </span>
        </div>
      </div>
    </header>
  );
}
