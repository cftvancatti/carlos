import type { AdminSession } from '../supabase';
import { AdminLoginForm } from './AdminLoginForm';

interface LoginModalProps {
  onClose: () => void;
  onSuccess: (session: AdminSession) => void;
}

/** Caixa de login da área restrita (aberta pelo botão do menu). */
export function LoginModal({ onClose, onSuccess }: LoginModalProps) {
  return (
    <div
      className="policy-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Login da área restrita"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="login-modal">
        <button type="button" className="policy-close" aria-label="Fechar" onClick={onClose}>
          ×
        </button>
        <span className="eyebrow">Área restrita</span>
        <h2>Login do administrador</h2>
        <p>Acesse para ver todos os orçamentos recebidos pelo site.</p>
        <AdminLoginForm onSuccess={onSuccess} />
      </div>
    </div>
  );
}
