import { useEffect, useState } from 'react';
import { Carousel } from './Carousel';
import { TESTIMONIALS } from '../data';
import { fetchTestimonials } from '../supabase';

export function Testimonials() {
  const [items, setItems] = useState(TESTIMONIALS);

  useEffect(() => {
    let cancelled = false;
    fetchTestimonials().then((rows) => {
      if (!rows || cancelled) return;
      setItems(
        rows.map((row) => ({
          name:
            row.rating >= 5
              ? row.author_name
              : `${row.author_name} (${row.rating} estrelas)`,
          text: row.message,
        })),
      );
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Carousel
      label="Depoimentos de clientes"
      perViewDesktop={3}
      items={items.map((testimonial) => (
        <figure className="testimonial-card" key={testimonial.name}>
          <figcaption>{testimonial.name}</figcaption>
          <div className="stars" aria-label="Avaliação 5 estrelas">
            ★★★★★
          </div>
          <blockquote>{testimonial.text}</blockquote>
        </figure>
      ))}
    />
  );
}
