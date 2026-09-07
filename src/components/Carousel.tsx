import { useEffect, useState, type ReactNode } from 'react';

interface CarouselProps {
  items: ReactNode[];
  perViewDesktop?: number;
  className?: string;
}

function useSlidesPerView(desktop: number) {
  const get = () => (window.innerWidth >= 880 ? desktop : window.innerWidth >= 560 ? 2 : 1);
  const [perView, setPerView] = useState(get);

  useEffect(() => {
    const onResize = () => setPerView(get());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return perView;
}

interface CarouselPropsWithPause extends CarouselProps {
  label?: string;
}

export function Carousel({
  items,
  perViewDesktop = 3,
  className = '',
  label,
}: CarouselPropsWithPause) {
  const perView = useSlidesPerView(perViewDesktop);
  const count = items.length;
  const maxIndex = Math.max(0, count - perView);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [paused, maxIndex]);

  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1));

  return (
    <div
      className={`carousel ${className}`.trim()}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label={label}
    >
      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${(index * 100) / perView}%)` }}
        >
          {items.map((item, i) => (
            <div
              className="carousel-slide"
              key={i}
              style={{ flex: `0 0 ${100 / perView}%` }}
            >
              {item}
            </div>
          ))}
        </div>

        <button className="carousel-nav carousel-prev" onClick={prev} aria-label="Anterior">
          ‹
        </button>
        <button className="carousel-nav carousel-next" onClick={next} aria-label="Próximo">
          ›
        </button>
      </div>

      <div className="carousel-bullets" role="tablist" aria-label="Posições do carrossel">
        {Array.from({ length: maxIndex + 1 }, (_, i) => (
          <button
            key={i}
            className={`carousel-bullet ${i === index ? 'carousel-bullet-active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Ir para a posição ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
