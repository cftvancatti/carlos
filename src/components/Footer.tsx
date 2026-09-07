import { WHATSAPP_URL, INSTAGRAM_URL } from '../data';

export function Footer() {
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
    </footer>
  );
}
