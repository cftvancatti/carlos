import { useState, type FormEvent } from 'react';
import { adminSignIn, setAdminSession, type AdminSession } from '../supabase';

interface AdminLoginFormProps {
  onSuccess: (session: AdminSession) => void;
}

/** Formulário de login do admin (usado na página e na caixa do menu). */
export function AdminLoginForm({ onSuccess }: AdminLoginFormProps) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [entrando, setEntrando] = useState(false);
  const [loginErro, setLoginErro] = useState(false);

  const entrar = async (event: FormEvent) => {
    event.preventDefault();
    if (entrando) return;
    setEntrando(true);
    setLoginErro(false);

    const session = await adminSignIn(email.trim(), senha);
    if (session) {
      setAdminSession(session);
      setSenha('');
      onSuccess(session);
    } else {
      setLoginErro(true);
    }
    setEntrando(false);
  };

  return (
    <form onSubmit={entrar}>
      <div className="admin-field">
        <label htmlFor="admin-email">E-mail</label>
        <input
          id="admin-email"
          type="email"
          required
          autoComplete="username"
          placeholder="admin@carlosinstalador.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="admin-field">
        <label htmlFor="admin-senha">Senha</label>
        <input
          id="admin-senha"
          type="password"
          required
          autoComplete="current-password"
          placeholder="Sua senha"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={entrando}>
        {entrando ? 'Entrando...' : 'Entrar'}
      </button>

      {loginErro && (
        <p className="admin-erro" role="alert">
          E-mail ou senha inválidos. Tente novamente.
        </p>
      )}
    </form>
  );
}
