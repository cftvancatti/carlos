import { useEffect, useState, type MouseEvent } from 'react';
import { PHONE_DISPLAY, WHATSAPP_URL } from '../data';

interface HeaderProps {
  route: string;
  onNavigate: (route: string) => void;
}

export function Header({ route, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [route]);

  const go = (target: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate(target);
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
          <a
            href={WHATSAPP_URL}
            className="btn btn-primary btn-sm nav-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contratar agora !
          </a>
        </nav>

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
