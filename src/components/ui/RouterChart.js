import React, { useRef, useState, useEffect } from 'react';

/**
 * Where all 89 held-out messages went: auto-handled, or escalated with a
 * stated reason.
 *
 * A screenshot is the wrong visual for this project — there is no UI, and the
 * claim being made is a measurement rather than an interface. So the visual is
 * the measurement: every message accounted for, with the gate that caught it
 * named. Drawn as inline SVG rather than pulled from a chart library, which
 * would be several hundred kilobytes for one figure.
 *
 * Numbers are taken verbatim from reports/router-results.md in the project
 * repo and sum to 89 exactly.
 */

const SEGMENTS = [
  { key: 'auto', label: 'auto-handled', n: 23, color: '#4ADE80', auto: true },
  { key: 'conf', label: 'low confidence', n: 37, color: '#8B5CF6' },
  { key: 'pii', label: 'PII / security', n: 13, color: '#42A6E3' },
  { key: 'ground', label: 'no grounding', n: 12, color: '#B809C3' },
  { key: 'ambig', label: 'ambiguous', n: 2, color: '#F0A500' },
  { key: 'bill', label: 'billing', n: 2, color: '#FF56F6' },
];

const TOTAL = SEGMENTS.reduce((sum, s) => sum + s.n, 0);

const RouterChart = () => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  const [active, setActive] = useState(null);

  // Grow the bar on first view. The figure is the card's argument, so it
  // should read as being measured rather than simply drawn.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className='rounded-xl border border-white/12 bg-black/30 p-5 lg:p-6'
    >
      <div className='flex items-baseline justify-between mb-1'>
        <span className='font-primary text-[11px] uppercase tracking-[0.22em] text-white/45'>
          Where all {TOTAL} held-out messages went
        </span>
      </div>
      <p className='text-[13px] text-white/40 mb-5 leading-snug'>
        Escalation reasons are a closed enum, so the eval reports which gate
        fired — not an undifferentiated escalation rate.
      </p>

      {/* One bar, every message accounted for. */}
      <div className='flex h-11 w-full rounded-lg overflow-hidden mb-4'>
        {SEGMENTS.map((s, i) => (
          <div
            key={s.key}
            onMouseEnter={() => setActive(s.key)}
            onMouseLeave={() => setActive(null)}
            title={`${s.label}: ${s.n} of ${TOTAL}`}
            className='relative h-full transition-all duration-700 ease-out cursor-default'
            style={{
              width: shown ? (s.n / TOTAL) * 100 + '%' : '0%',
              background: s.color,
              opacity: active && active !== s.key ? 0.35 : 1,
              transitionDelay: i * 90 + 'ms',
              // The auto-handled slice is the one the project is arguing
              // about, so it is separated from the escalation reasons.
              marginRight: s.auto ? '3px' : 0,
            }}
          >
            {s.n >= 12 && (
              <span className='absolute inset-0 flex items-center justify-center text-[12px] font-primary text-black/70'>
                {s.n}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className='flex flex-wrap gap-x-4 gap-y-2'>
        {SEGMENTS.map((s) => (
          <button
            key={s.key}
            type='button'
            onMouseEnter={() => setActive(s.key)}
            onMouseLeave={() => setActive(null)}
            className='flex items-center gap-x-2 cursor-default'
            style={{ opacity: active && active !== s.key ? 0.4 : 1 }}
          >
            <span
              className='h-2 w-2 rounded-full shrink-0'
              style={{ backgroundColor: s.color }}
            />
            <span className='text-[12.5px] text-white/60 leading-none'>
              {s.label}
            </span>
            <span className='text-[12.5px] text-white/35 leading-none'>
              {((s.n / TOTAL) * 100).toFixed(1)}%
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RouterChart;
