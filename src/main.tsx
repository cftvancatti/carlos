import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingContact } from './components/FloatingContact';
import { Home } from './pages/Home';
import { Servicos } from './pages/Servicos';

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

  return (
    <div className="app">
      <Header route={route} onNavigate={setRoute} />
      <main>{route === '#/servicos' ? <Servicos /> : <Home />}</main>
      <Footer />
      <FloatingContact />
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
