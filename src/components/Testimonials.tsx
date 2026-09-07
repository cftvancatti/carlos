import { Carousel } from './Carousel';
import { TESTIMONIALS } from '../data';

export function Testimonials() {
  return (
    <Carousel
      label="Depoimentos de clientes"
      perViewDesktop={3}
      items={TESTIMONIALS.map((testimonial) => (
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
