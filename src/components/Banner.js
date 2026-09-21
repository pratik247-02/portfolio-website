import React, { useRef, useCallback } from 'react';
import { FaGithub, FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import imgWebp from '../assets/pratik2.webp';
import img from '../assets/pratik2.jpeg';
import { BsCloudDownload } from 'react-icons/bs';
import GraphCanvas from './GraphCanvas';

const NAME = 'Pratik Raje';

// Served from public/ with Content-Disposition: inline, so it opens in a tab
// rather than downloading. The version query busts the cache for anyone who
// fetched an earlier copy, since the file is not content-hashed.
const RESUME = '/Pratik-Resume.pdf?v=2026-09';

// Each glyph animates in on its own delay. Spaces keep their width via a
// non-breaking space so the name does not collapse mid-reveal.
const nameChars = NAME.split('');

const MagneticButton = ({ children, className = '', ...rest }) => {
  const ref = useRef(null);
  const frame = useRef(0);

  const onPointerMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = 'translate(' + dx * 0.18 + 'px, ' + dy * 0.28 + 'px)';
    });
  }, []);

  const onPointerLeave = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    if (ref.current) ref.current.style.transform = '';
  }, []);

  return (
    <a
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={className}
      style={{ transition: 'transform 400ms cubic-bezier(0.16,1,0.3,1)' }}
      {...rest}
    >
      {children}
    </a>
  );
};

const Banner = () => {
  // Hero height is driven by its content with a floor and a cap, rather than
  // by a share of the viewport. min-h-[82vh] meant a tall screen produced
  // ~2,600px of hero around ~500px of content, leaving the name floating in
  // a void; the cap stops the same thing happening in the other direction.
  return (
    <section
      className='relative min-h-[560px] lg:min-h-[640px] max-h-[900px] py-16 flex items-center overflow-hidden'
      id='home'
    >
      <GraphCanvas />

      {/* Keeps the canvas from competing with the text it sits behind. */}
      <div className='absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/70 via-[#0a0a0a]/25 to-transparent pointer-events-none' />

      <div className='container mx-auto relative z-10'>
        <div className='flex flex-col gap-y-10 lg:flex-row lg:items-center lg:gap-x-16'>
          <div className='flex-1 text-center font-secondary lg:text-left'>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className='font-primary text-sm tracking-[0.35em] text-accent uppercase mb-5'
            >
              Software Developer
            </motion.p>

            <h1
              aria-label={NAME}
              className='text-[56px] font-bold leading-[1] lg:text-[86px] mb-4 tracking-[-0.02em]'
            >
              {nameChars.map((char, i) => (
                <motion.span
                  key={i}
                  aria-hidden='true'
                  className='inline-block'
                  initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.55,
                    delay: 0.25 + i * 0.035,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {char === ' ' ? ' ' : char}
                </motion.span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className='text-[19px] lg:text-[20px] max-w-[560px] mx-auto lg:mx-0 leading-[1.65] text-white/70 mb-9'>
                I work on a real-time multi-camera video streaming and analytics
                platform at{' '}
                <span className='text-white/95 font-medium'>Matrice AI</span> — WebRTC
                transport, adaptive canvas overlays, and the latency problems
                underneath both.
              </p>

              <div className='flex flex-wrap gap-x-5 gap-y-4 items-center justify-center lg:justify-start mb-10'>
                {/* Viewing is the primary action: downloading a PDF means
                    choosing a location, waiting, then finding it again, which
                    is several steps too many for someone who only wants to
                    glance at it. The file is served inline, so this opens in
                    a tab. Downloading stays available beside the socials. */}
                <MagneticButton
                  href={RESUME}
                  target='_blank'
                  rel='noreferrer'
                  className='btn btn-lg flex items-center cursor-pointer'
                >
                  <span className='flex items-center'>
                    View Resume <FaExternalLinkAlt className='ml-2 text-sm' />
                  </span>
                </MagneticButton>

                <button
                  type='button'
                  onClick={() =>
                    window.dispatchEvent(
                      new KeyboardEvent('keydown', { key: 'k', metaKey: true })
                    )
                  }
                  className='hidden sm:flex items-center gap-x-2 text-white/50 hover:text-white/80 transition-colors text-base group'
                >
                  <span>Press</span>
                  <kbd className='border border-white/25 rounded px-2 py-0.5 text-sm group-hover:border-white/50 transition-colors'>
                    ⌘K
                  </kbd>
                  <span>to navigate</span>
                </button>
              </div>

              <div className='flex text-[20px] gap-x-5 max-w-max mx-auto lg:mx-0'>
                <a
                  href='https://www.github.com/pratik247-02'
                  target='_blank'
                  rel='noreferrer'
                  aria-label='GitHub'
                  className='text-white/60 hover:text-white hover:-translate-y-1 transition-all duration-300'
                >
                  <FaGithub className='text-[28px]' />
                </a>
                <a
                  href='https://www.linkedin.com/in/pratik24702'
                  target='_blank'
                  rel='noreferrer'
                  aria-label='LinkedIn'
                  className='text-white/60 hover:text-white hover:-translate-y-1 transition-all duration-300'
                >
                  <FaLinkedin className='text-[28px]' />
                </a>

                <span className='w-px bg-white/15 self-stretch my-1' />

                {/* The secondary path, for anyone who wants the file itself. */}
                <a
                  href={RESUME}
                  download='Pratik-Raje-Resume.pdf'
                  aria-label='Download resume as PDF'
                  title='Download PDF'
                  className='text-white/60 hover:text-white hover:-translate-y-1 transition-all duration-300'
                >
                  <BsCloudDownload className='text-[28px]' />
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className='lg:flex-1 max-w-[320px] lg:max-w-[440px] mx-auto lg:mx-0 lg:ml-8'
          >
            <div className='relative'>
              <div className='absolute -inset-3 rounded-full bg-gradient-to-tr from-[#42A6E3]/25 to-[#FF56F6]/25 blur-2xl' />
              <div className='relative rounded-full overflow-hidden border border-white/15 h-[300px] w-[300px] lg:h-[420px] lg:w-[420px] mx-auto'>
                {/* WebP at 840px (2x the largest render size) with the
                    original JPEG as a fallback. width/height are set so the
                    circle reserves its space before the image decodes. */}
                <picture>
                  <source srcSet={imgWebp} type='image/webp' />
                  <img
                    src={img}
                    alt='Pratik Raje'
                    width='420'
                    height='420'
                    fetchPriority='high'
                    className='object-cover object-center h-full w-full'
                  />
                </picture>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
