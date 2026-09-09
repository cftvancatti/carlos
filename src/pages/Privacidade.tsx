import { PrivacidadeTexto } from '../components/PrivacidadeTexto';

export function Privacidade() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Transparência</span>
          <h1>Política de Privacidade</h1>
          <p>
            Como coletamos, usamos e protegemos os seus dados.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container policy-content">
          <PrivacidadeTexto />
        </div>
      </section>
    </>
  );
}
