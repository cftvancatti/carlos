import { useState } from 'react';
import { WHATSAPP_URL, INSTAGRAM_URL, POLICY_ACCEPT_KEY } from '../data';
import { PrivacidadeTexto } from './PrivacidadeTexto';

function jaAceitou(): boolean {
  try {
    return localStorage.getItem(POLICY_ACCEPT_KEY) !== null;
  } catch {
    return false;
  }
}

export function Footer() {
  const [policyOpen, setPolicyOpen] = useState(!jaAceitou());

  const aceitarTermos = () => {
    try {
      localStorage.setItem(POLICY_ACCEPT_KEY, new Date().toISOString());
    } catch {
      /* storage indisponivel */
    }
    setPolicyOpen(false);
  };

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-brand">
          <strong>Carlos Instalador Segurança Eletrônica</strong>
          <span>Controle de acesso, CFTV e automação para empresas, condomínios e residências.</span>
        </p>
        <div className="footer-links">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a
            href="#/privacidade"
            onClick={(event) => {
              event.preventDefault();
              setPolicyOpen(true);
            }}
          >
            Política de Privacidade
          </a>
        </div>
      </div>
      <div className="container footer-copy">
        © {new Date().getFullYear()} Todos os direitos reservados a Carlos Instalador Segurança
        Eletrônica. Desenvolvido por{' '}
        <a
          className="footer-dev-link"
          href="https://www.instagram.com/riqzerol/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Riqzerol
        </a>
        .
      </div>

      {policyOpen && (
        <div
          className="policy-overlay"
          onClick={() => setPolicyOpen(false)}
          role="presentation"
        >
          <div
            className="policy-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Política de Privacidade"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="policy-modal-head">
              <h2>Política de Privacidade</h2>
              <button
                type="button"
                className="policy-close"
                aria-label="Fechar"
                onClick={() => setPolicyOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="policy-modal-body policy-content">
              <PrivacidadeTexto />
            </div>
            <div className="policy-modal-foot">
              <button type="button" className="btn btn-primary" onClick={aceitarTermos}>
                Aceitar os termos
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
