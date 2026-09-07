import { ADVANTAGES, APPLICATIONS, WHATSAPP_URL } from '../data';

export function Servicos() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Serviços</span>
          <h1>Soluções completas em segurança eletrônica</h1>
          <p>
            Projetos sob medida em CFTV, controle de acesso e automação, com instalação
            profissional e suporte técnico especializado.
          </p>
          <div className="hero-actions">
            <a
              href={WHATSAPP_URL}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar um orçamento
            </a>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container split-grid">
          <div>
            <span className="eyebrow">Manutenção</span>
            <h2>Manutenção especializada</h2>
            <p>
              A Carlos Instalador Segurança Eletrônica oferece serviços especializados de
              manutenção em sistemas de controle de acesso, garantindo que cada equipamento
              funcione com eficiência e segurança. Estamos preparados para identificar falhas
              rapidamente e aplicar soluções eficazes, assegurando continuidade no dia a dia da
              sua empresa, condomínio ou residência.
            </p>
            <ul className="check-list">
              <li>
                <strong>Manutenção corretiva:</strong> realizada quando surge uma falha
                inesperada, restabelece o funcionamento dos sistemas com agilidade e precisão,
                reduzindo paradas e evitando transtornos.
              </li>
              <li>
                <strong>Suporte contínuo:</strong> mais do que corrigir problemas, nosso objetivo
                é garantir durabilidade e alto desempenho dos equipamentos, prolongando a vida
                útil dos sistemas com o melhor custo-benefício.
              </li>
            </ul>
            <a
              href={WHATSAPP_URL}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar um orçamento
            </a>
          </div>
          <div className="split-media">
            <img src="img/banner.jpg" alt="Carlos Instalador Segurança Eletrônica" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split-grid">
          <div>
            <span className="eyebrow">CFTV</span>
            <h2>O que é segurança eletrônica?</h2>
            <p>
              A segurança eletrônica é a utilização de equipamentos e sistemas tecnológicos para
              monitorar, proteger e controlar o acesso a um determinado local, bem ou pessoas. O
              principal objetivo é prevenir incidentes como roubos, vandalismo e invasões, além de
              permitir o gerenciamento e a resposta rápida a situações de risco.
            </p>
            <p>
              Esses sistemas integram dispositivos como câmeras (CFTV), alarmes, sensores,
              controle de acesso e cercas elétricas para criar um ambiente mais seguro, emitindo
              alertas em caso de ameaças.
            </p>
          </div>
          <div className="split-media">
            <img src="img/cftv.jpg" alt="Instalação de câmeras CFTV" />
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container split-grid">
          <div className="split-media">
            <img src="img/cameras.jpg" alt="Projeto de câmeras de segurança" />
          </div>
          <div>
            <span className="eyebrow">Vantagens</span>
            <h2>Por que investir em monitoramento</h2>
            <ul className="check-list">
              {ADVANTAGES.map((advantage) => (
                <li key={advantage}>{advantage}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Aplicações</span>
            <h2>Onde o monitoramento pode ser aplicado</h2>
          </div>
          <div className="apps-grid">
            {APPLICATIONS.map((application) => (
              <div className="app-card" key={application.label}>
                <h3>{application.label}</h3>
                <p>{application.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
