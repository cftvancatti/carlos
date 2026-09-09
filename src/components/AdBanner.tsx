import { useEffect } from 'react';
import { ADSENSE_CLIENT } from '../data';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdBannerProps {
  /** ID do bloco de anúncio criado no painel do AdSense (data-ad-slot). */
  slot: string;
  /** 'auto' (responsivo), 'fluid' (in-article) ou 'horizontal'. */
  format?: string;
  /** Rótulo acessível exibido para leitores de tela. */
  label?: string;
}

/**
 * Bloco de anúncio do Google AdSense.
 * Renderiza apenas quando ADSENSE_CLIENT e o slot estiverem configurados;
 * caso contrário, não gera nenhum elemento nem carrega script.
 */
export function AdBanner({ slot, format = 'auto', label = 'Publicidade' }: AdBannerProps) {
  const ativo = Boolean(ADSENSE_CLIENT && slot);

  useEffect(() => {
    if (!ativo) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* script ainda não carregado; o push é ignorado */
    }
  }, [ativo, slot]);

  if (!ativo) return null;

  return (
    <div className="ad-banner" role="complementary" aria-label={label}>
      <span className="ad-label">{label}</span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
