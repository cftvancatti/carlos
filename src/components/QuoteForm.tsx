import { useState, type FormEvent } from 'react';
import { createLead } from '../supabase';

type Status = 'idle' | 'enviando' | 'sucesso' | 'erro';

export function QuoteForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const enviar = async (event: FormEvent) => {
    event.preventDefault();
    if (status === 'enviando') return;
    setStatus('enviando');

    const ok = await createLead({
      name: name.trim(),
      phone: phone.trim(),
      message: message.trim() || undefined,
    });

    if (ok) {
      setStatus('sucesso');
      setName('');
      setPhone('');
      setMessage('');
    } else {
      setStatus('erro');
    }
  };

  return (
    <form className="quote-form" onSubmit={enviar}>
      <div className="quote-form-row">
        <div className="quote-form-field">
          <label htmlFor="lead-name">Seu nome *</label>
          <input
            id="lead-name"
            type="text"
            required
            maxLength={120}
            placeholder="Ex.: João Silva"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="quote-form-field">
          <label htmlFor="lead-phone">WhatsApp / Telefone *</label>
          <input
            id="lead-phone"
            type="tel"
            required
            maxLength={25}
            placeholder="Ex.: (21) 99999-9999"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
      </div>
      <div className="quote-form-field">
        <label htmlFor="lead-message">O que você precisa?</label>
        <textarea
          id="lead-message"
          rows={4}
          maxLength={1000}
          placeholder="Ex.: Preciso de 4 câmeras e uma fechadura digital para o meu escritório."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>

      <div className="quote-form-foot">
        <button type="submit" className="btn btn-primary" disabled={status === 'enviando'}>
          {status === 'enviando' ? 'Enviando...' : 'Solicitar orçamento'}
        </button>
        {status === 'sucesso' && (
          <p className="quote-form-msg quote-form-ok" role="status">
            Recebemos sua solicitação! Entraremos em contato em breve. ✅
          </p>
        )}
        {status === 'erro' && (
          <p className="quote-form-msg quote-form-erro" role="alert">
            Não foi possível enviar agora. Tente novamente ou fale conosco pelo WhatsApp.
          </p>
        )}
      </div>
    </form>
  );
}
