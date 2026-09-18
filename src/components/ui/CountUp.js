import React, { useRef, useState, useEffect } from 'react';

/**
 * Animates a numeric value when it first scrolls into view.
 *
 * The values here are the point of the card — "~15s to ~7s" is the claim, not
 * decoration around it — so the number itself is what moves. Everything that
 * is not a digit (tildes, units, ranges like "7–9s") is preserved verbatim:
 * the string is split into numeric and non-numeric runs, and only the numeric
 * runs are interpolated.
 */

const EASE_OUT = (t) => 1 - Math.pow(1 - t, 3);

// Splits "~7–9s" into ['~', '7', '–', '9', 's'] so each number animates in
// place while the surrounding characters stay put.
const tokenize = (text) => String(text).split(/(\d+(?:\.\d+)?)/);

const CountUp = ({ value, duration = 1100, className = '' }) => {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1);
      return;
    }

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        observer.disconnect();

        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          setProgress(EASE_OUT(t));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [duration]);

  const rendered = tokenize(value)
    .map((part) => {
      if (!/^\d/.test(part)) return part;
      const target = parseFloat(part);
      const decimals = part.includes('.') ? part.split('.')[1].length : 0;
      const current = target * progress;
      // Keep the digit count stable while counting, so the text does not
      // reflow and shove the label around mid-animation.
      return current.toFixed(decimals).padStart(part.length, '0').slice(-part.length);
    })
    .join('');

  return (
    <span ref={ref} className={className}>
      {/* The final value is always in the accessibility tree, so a screen
          reader never reads a half-counted number. */}
      <span aria-hidden='true'>{rendered}</span>
      <span className='sr-only'>{value}</span>
    </span>
  );
};

export default CountUp;
