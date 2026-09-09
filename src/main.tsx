import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingContact } from './components/FloatingContact';
import { Home } from './pages/Home';
import { Servicos } from './pages/Servicos';
import { Privacidade } from './pages/Privacidade';
import { Admin } from './pages/Admin';
import { ADSENSE_CLIENT, POLICY_ACCEPT_KEY } from './data';

function getRoute(): string {
  return window.location.hash || '#/';
}

function App() {
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (!ADSENSE_CLIENT) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    // LGPD: sem aceite da Política de Privacidade, os anúncios
    // são servidos em modo não personalizado.
    let aceitou = false;
    try {
      aceitou = localStorage.getItem(POLICY_ACCEPT_KEY) !== null;
    } catch {
      aceitou = false;
    }
    if (!aceitou) {
      const ads = (window.adsbygoogle = window.adsbygoogle || []) as unknown[] & {
        requestNonPersonalizedAds?: number;
      };
      ads.requestNonPersonalizedAds = 1;
    }
  }, []);

  return (
    <div className="app">
      <Header route={route} onNavigate={setRoute} />
      <main>
        {route === '#/servicos' ? (
          <Servicos />
        ) : route === '#/privacidade' ? (
          <Privacidade />
        ) : route === '#/admin' ? (
          <Admin />
        ) : (
          <Home />
        )}
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
