import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import TiltCard from './ui/TiltCard';

/**
 * Skills, dense by default with the evidence one interaction away.
 *
 * Two audiences read this section and they want opposite things. A recruiter
 * screening for keywords wants the whole list visible in about three seconds.
 * An engineer wants to know which of these were actually shipped and what
 * came out of it. Listing the proof inline serves the second and buries the
 * first under a wall of text, so the proof hides behind a hover instead: the
 * grid stays as compact as a plain chip list, and a marked chip reveals the
 * specific thing it was used for.
 *
 * Proof lines come from work documented elsewhere on this page — the Matrice
 * AI role and the project write-ups — so nothing is claimed here that is not
 * backed with a number somewhere else.
 */

const groups = [
  {
    title: 'Frontend',
    color: '#E23636',
    items: [
      { name: 'React', proof: 'Led frontend delivery as top contributor across 7 repositories', where: 'Matrice AI' },
      { name: 'Next.js', proof: 'Production frontends for the streaming and analytics platform', where: 'Matrice AI' },
      { name: 'TypeScript', proof: 'Primary language day to day', where: 'Matrice AI' },
      { name: 'JavaScript' },
      { name: 'Redux Toolkit', proof: '500+ expenses with sub-100ms adds', where: 'Bill-Manager' },
      { name: 'Tailwind CSS', proof: 'This site, and MCU Hub', where: 'Personal' },
      { name: 'Material UI' },
      { name: 'HTML5' },
      { name: 'CSS3' },
    ],
  },
  {
    title: 'Real-Time & Video',
    color: '#4ADE80',
    items: [
      { name: 'WebRTC', proof: 'Stream startup ~15s → ~5s with trickle ICE, replacing WebSocket frames', where: 'Matrice AI' },
      { name: 'RTP', proof: 'Matched timestamps to async inference in a ~200ms window, killing a 4–5s desync', where: 'Matrice AI' },
      { name: 'Canvas API', proof: '5–25 boxes, polygons, masks and pose key-points per frame, with dynamic frame pacing', where: 'Matrice AI' },
      { name: 'Server-Sent Events', proof: '~1,000 alerts/day, with exponential-backoff reconnect', where: 'Matrice AI' },
      { name: 'WebSockets', proof: 'The transport the platform started on, before WebRTC', where: 'Matrice AI' },
    ],
  },
  {
    title: 'Backend & Databases',
    color: '#3B82F6',
    items: [
      { name: 'Node.js', proof: 'Graph traversal service over 193 nodes, 755 edges', where: 'MCU Hub' },
      { name: 'Express', proof: 'REST API, deployed on Render', where: 'MCU Hub' },
      { name: 'MongoDB', proof: 'Atlas, with an in-process adjacency snapshot over it', where: 'MCU Hub' },
      { name: 'OpenAPI', proof: 'Typed clients from contracts spanning 1,127 operations, with a consumer manifest adopted by 7 repos', where: 'Matrice AI' },
      { name: 'Mongoose' },
      { name: 'REST API design' },
    ],
  },
  {
    title: 'Python & ML Systems',
    color: '#F0A500',
    items: [
      { name: 'Python', proof: '4-stage triage pipeline behind typed contracts, each stage rerunnable alone', where: 'Triage Agent' },
      { name: 'Pydantic', proof: 'Typed contracts between stages, so a bad handoff fails at the boundary', where: 'Triage Agent' },
      { name: 'LLM pipelines', proof: 'Classify → retrieve → draft → route, provider swapped in ~30 lines', where: 'Triage Agent' },
      { name: 'Evaluation design', proof: '177-case fixture and a stratified split written before the system', where: 'Triage Agent' },
      { name: 'scikit-learn', proof: 'Stratified train/test split so every component scores on identical rows', where: 'Triage Agent' },
      { name: 'pandas' },
    ],
  },
  {
    title: 'Auth & Security',
    color: '#FF7A1A',
    items: [
      { name: 'NextAuth', proof: 'SSO across two platforms via a shared session cookie, cloud and on-premise', where: 'Matrice AI' },
      { name: 'JWT / OAuth', proof: 'Authorization hardening across the streaming platform', where: 'Matrice AI' },
      { name: 'Zod', proof: 'Standardised validation across 188 modules, domain-organised schemas', where: 'Matrice AI' },
      { name: 'CSP / HSTS', proof: 'Remediated 6+ CVEs including CRLF-injection and ReDoS', where: 'Matrice AI' },
      { name: 'Sentry', proof: 'Instrumented across server and edge runtimes', where: 'Matrice AI' },
    ],
  },
  {
    title: 'Testing & Tooling',
    color: '#A855F7',
    items: [
      { name: 'Vitest', proof: '41 tests over graph algorithms, verified by mutation testing', where: 'MCU Hub' },
      { name: 'Supertest', proof: 'Route tests caught two 500s that should have been 400s', where: 'MCU Hub' },
      { name: 'GitHub Actions', proof: 'Lint, typecheck and tests on Node 20 and 22, per PR', where: 'MCU Hub' },
      { name: 'mongodb-memory-server' },
      { name: 'Git' },
      { name: 'Postman' },
      { name: 'Vercel', proof: 'Frontend deploys for MCU Hub and three other projects', where: 'Personal' },
    ],
  },
];

const Chip = ({ item, color, openKey, setOpenKey, chipKey }) => {
  const hasProof = Boolean(item.proof);
  const isOpen = openKey === chipKey;
  const ref = useRef(null);
  const [flip, setFlip] = useState(false);

  // A tooltip near the right edge would overflow the viewport, so measure on
  // open and anchor it to the right instead.
  useEffect(() => {
    if (!isOpen || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setFlip(rect.left + 280 > window.innerWidth);
  }, [isOpen]);

  if (!hasProof) {
    return (
      <span className='text-sm px-3 py-1 rounded-full border border-white/12 text-white/40'>
        {item.name}
      </span>
    );
  }

  return (
    <span className='relative inline-block' ref={ref}>
      <button
        type='button'
        // Hover for pointers, click for touch, where hover does not exist.
        onMouseEnter={() => setOpenKey(chipKey)}
        onMouseLeave={() => setOpenKey((k) => (k === chipKey ? null : k))}
        onClick={() => setOpenKey(isOpen ? null : chipKey)}
        onFocus={() => setOpenKey(chipKey)}
        onBlur={() => setOpenKey((k) => (k === chipKey ? null : k))}
        aria-expanded={isOpen}
        className='text-sm pl-3 pr-2.5 py-1 rounded-full border text-white/75 hover:text-white transition-colors inline-flex items-center gap-x-1.5'
        style={{ borderColor: isOpen ? color : 'rgba(255,255,255,0.22)' }}
      >
        {item.name}
        <span
          className='h-1 w-1 rounded-full shrink-0'
          style={{ backgroundColor: color, opacity: isOpen ? 1 : 0.65 }}
        />
      </button>

      {isOpen && (
        <span
          role='tooltip'
          className={
            'absolute z-30 bottom-full mb-2 w-[260px] rounded-lg border border-white/20 bg-[#140d1f] px-3 py-2.5 shadow-xl block ' +
            (flip ? 'right-0' : 'left-0')
          }
        >
          <span className='block text-[13.5px] leading-[1.5] text-white/85'>
            {item.proof}
          </span>
          <span
            className='block text-[10px] font-primary uppercase tracking-[0.18em] mt-1.5'
            style={{ color }}
          >
            {item.where}
          </span>
        </span>
      )}
    </span>
  );
};

const Skills = () => {
  const [openKey, setOpenKey] = useState(null);

  return (
    <section className='section' id='skills'>
      <div className='container mx-auto'>
        <SectionHeading index='03' title='Skills & Tools'>
          The dotted ones come with a receipt — hover for the specific thing it
          was used for.
        </SectionHeading>

        <motion.div
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.1 }}
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
        >
          {groups.map((group) => (
            <motion.div
              key={group.title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
              }}
              className='h-full'
            >
              <TiltCard
                intensity={4}
                className='border border-white/15 rounded-2xl p-6 bg-white/[0.02] backdrop-blur-sm h-full'
              >
                {/* Tooltips escape the card, so this stacking context must not
                    clip them — no overflow-hidden anywhere on this path. */}
                <div className='relative z-10'>
                  <div className='flex items-center gap-x-3 mb-5'>
                    <span
                      className='h-2 w-2 rounded-full shrink-0'
                      style={{
                        backgroundColor: group.color,
                        boxShadow: '0 0 12px ' + group.color + '99',
                      }}
                    />
                    <h3
                      className='font-primary text-[15px] uppercase tracking-[0.2em]'
                      style={{ color: group.color }}
                    >
                      {group.title}
                    </h3>
                  </div>

                  <div className='flex flex-wrap gap-2'>
                    {group.items.map((item) => (
                      <Chip
                        key={item.name}
                        item={item}
                        color={group.color}
                        chipKey={group.title + '::' + item.name}
                        openKey={openKey}
                        setOpenKey={setOpenKey}
                      />
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
