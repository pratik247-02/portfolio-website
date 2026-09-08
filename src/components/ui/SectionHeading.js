import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Section heading with an index label and a rule that draws itself in when
 * the heading first enters the viewport.
 */
const SectionHeading = ({ index, title, children }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className='mb-12'
    >
      <div className='flex items-baseline gap-x-4 mb-4'>
        <span className='font-primary text-sm text-accent tracking-[0.3em]'>{index}</span>
        <h2
          ref={ref}
          data-shown={shown}
          className='rule-in font-primary text-[28px] lg:text-[38px] uppercase tracking-[0.06em] text-white'
        >
          {title}
        </h2>
      </div>
      {children && (
        <p className='max-w-2xl text-white/60 text-[17px] leading-[1.7] mt-8'>{children}</p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
