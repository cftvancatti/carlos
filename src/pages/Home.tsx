import { useEffect, useState } from 'react';
import {
  ROTATING_WORDS,
  WHATSAPP_URL,
  INSTAGRAM_URL,
  ADSENSE_SLOTS,
} from '../data';
import { Testimonials } from '../components/Testimonials';
import { AdBanner } from '../components/AdBanner';

export function Home() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((index) => (index + 1) % ROTATING_WORDS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <h1>
            Controle de acesso para{' '}
            <span className="highlight">empresas, condomínios e residências</span>
          </h1>
          <p className="hero-sub">
            Soluções para segurança eletrônica:{' '}
            <span className="rotating-word" key={wordIndex}>
              {ROTATING_WORDS[wordIndex].toUpperCase()}
            </span>
          </p>
          <p className="hero-copy">
            Projetos personalizados conforme a necessidade de cada cliente, do reconhecimento
            facial ao ponto eletrônico.
          </p>
          <div className="hero-actions">
            <a
              href={WHATSAPP_URL}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contratar agora !
            </a>
          </div>
        </div>
      </section>

      <div className="container">
        <AdBanner slot={ADSENSE_SLOTS.hero} label="Publicidade" />
      </div>

      <section className="section section-alt" id="sobre">
        <div className="container about-grid">
          <div className="about-media">
            <img src="img/sis.jpg" alt="Sistema Integrado de Segurança" />
          </div>
          <div className="about-content">
            <span className="eyebrow">CFTV e segurança eletrônica em geral</span>
            <h2>
              <strong>Carlos Instalador</strong> — 14 anos de experiência
            </h2>
            <p>
              Localizada no Rio de Janeiro, a Carlos Instalador Segurança Eletrônica nasceu para
              oferecer soluções inteligentes e confiáveis em segurança eletrônica, com foco em
              controle de acesso para empresas, condomínios e residências. Ao longo de sua
              trajetória, consolidou-se como referência em tecnologia, integrando equipamentos
              modernos e softwares que garantem praticidade, agilidade e confiabilidade.
            </p>
            <p>
              Mais do que fornecer sistemas, a Carlos Instalador atua como parceira de seus
              clientes, desenvolvendo projetos sob medida para cada necessidade.
            </p>
            <blockquote>
              Estamos sempre nos reinventando para acompanhar a evolução da segurança eletrônica,
              oferecendo soluções que unem tecnologia de ponta, simplicidade de uso e total
              confiabilidade.
            </blockquote>
            <a
              href={WHATSAPP_URL}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contratar agora !
            </a>
          </div>
        </div>
      </section>

      <div className="container">
        <AdBanner slot={ADSENSE_SLOTS.mid} label="Publicidade" />
      </div>

      <section className="section" id="depoimentos">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Depoimentos</span>
            <h2>
              Avaliações 5 estrelas no{' '}
              <a
                className="google-link"
                href="https://share.google/AEGlwKcg32d6gzAHF"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="g-blue">G</span>
                <span className="g-red">o</span>
                <span className="g-yellow">o</span>
                <span className="g-blue">g</span>
                <span className="g-green">l</span>
                <span className="g-red">e</span>
              </a>
            </h2>
            <p>Mais de 200 avaliações 5 estrelas de clientes reais.</p>
          </div>
          <div className="testimonials">
            <Testimonials />
          </div>
          <p className="google-cta">
            Confira a reputação real do Carlos Instalador no{' '}
            <a
              href="https://share.google/AEGlwKcg32d6gzAHF"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Meu Negócio
            </a>{' '}
            ou fale conosco pelo{' '}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>{' '}
            e Instagram{' '}
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              @carlosinstalador
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
