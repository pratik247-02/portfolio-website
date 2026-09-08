import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';

// Each card has to mean something standing alone, so the before/after lives
// inside one card rather than being split across two.
const HEADLINE = [
  {
    before: '~15s',
    after: '~7s',
    label: 'Stream startup latency, after moving transport to WebRTC',
  },
  {
    before: '4–5s',
    after: 'none',
    label: 'ML overlay desync, after matching RTP timestamps',
  },
  {
    before: '1000+',
    after: '16',
    label: 'Camera ports the backend provisions, after capping the grid',
  },
];

const role = {
  company: 'Matrice AI',
  title: 'Software Developer - 1',
  period: 'May 2025 — Present',
  stack: [
    'Next.js',
    'TypeScript',
    'React',
    'Node.js',
    'WebRTC',
    'WebSockets',
    'SSE',
    'Canvas API',
  ],
  points: [
    {
      head: 'Cut stream startup latency from ~15s to ~7–9s',
      body: 'Replaced a frame-by-frame WebSocket image stream with WebRTC, then optimized ICE negotiation and media buffering.',
    },
    {
      head: 'Eliminated a 4–5 second overlay desync',
      body: 'Matched RTP timestamps to async inference within a ~200ms window, so annotations landed on the frames they belonged to.',
    },
    {
      head: 'Capped multi-camera views at a 4x4 grid',
      body: 'The backend opens 16 ports instead of provisioning 1000+ cameras — a constraint on the UI that removed a scaling problem underneath it.',
    },
    {
      head: 'Rendered 5–25 shapes per frame at 30 FPS',
      body: 'A canvas layer over live video using requestVideoFrameCallback and normalized coordinates, with pan and zoom.',
    },
    {
      head: 'Built real-time alerting over SSE',
      body: '~1,000 alerts/day in testing, with exponential-backoff reconnection after restarts left clients silently disconnected.',
    },
    {
      head: 'Shipped 12–15 reusable components',
      body: 'Production frontends in Next.js/TypeScript for an analytics platform with role-based access.',
    },
    {
      head: 'Hardened auth and remediated 6+ CVEs',
      body: 'NextAuth (JWT/OAuth), Zod and CSP/HSTS; fixed CRLF-injection and ReDoS, and instrumented Sentry across server and edge runtimes.',
    },
  ],
};

const Experience = () => {
  return (
    <section className='section' id='experience'>
      <div className='container mx-auto'>
        <SectionHeading index='01' title='Experience' />

        {/* Before/after outcomes, staggered in on first view. */}
        <motion.div
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.3 }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12'
        >
          {HEADLINE.map((m) => (
            <motion.div
              key={m.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className='border border-white/10 rounded-xl px-5 py-5 bg-white/[0.02]'
            >
              <div className='flex items-baseline gap-x-3 mb-3'>
                <span className='font-primary text-[20px] lg:text-[22px] leading-none text-white/30 line-through decoration-white/25'>
                  {m.before}
                </span>
                <span className='text-white/25 text-[15px]'>→</span>
                <span className='font-primary text-[26px] lg:text-[30px] leading-none text-gradient'>
                  {m.after}
                </span>
              </div>
              <div className='text-sm text-white/45 leading-[1.5]'>{m.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className='border border-white/15 rounded-2xl p-6 lg:p-10 bg-white/[0.02] backdrop-blur-sm'
        >
          <div className='flex flex-col lg:flex-row lg:items-baseline lg:justify-between mb-8 pb-6 border-b border-white/10'>
            <div>
              <h3 className='text-[24px] lg:text-[28px] font-primary font-semibold leading-tight mb-1'>
                {role.title}
              </h3>
              <span className='text-gradient text-[19px]'>{role.company}</span>
            </div>
            <span className='text-white/45 mt-2 lg:mt-0 font-primary tracking-wider text-sm'>
              {role.period}
            </span>
          </div>

          <motion.ul
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.1 }}
            variants={{ show: { transition: { staggerChildren: 0.07 } } }}
            className='flex flex-col gap-y-6 mb-9'
          >
            {role.points.map((point) => (
              <motion.li
                key={point.head}
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                }}
                className='group'
              >
                <div className='flex gap-x-4'>
                  <span className='text-accent mt-[9px] h-px w-5 bg-accent shrink-0 group-hover:w-8 transition-all duration-300' />
                  <div>
                    <p className='text-white/90 text-[17px] leading-snug mb-1'>
                      {point.head}
                    </p>
                    <p className='text-white/55 text-[15px] leading-[1.6]'>{point.body}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          <div className='flex flex-wrap gap-2'>
            {role.stack.map((tech) => (
              <span
                key={tech}
                className='text-sm px-3 py-1 rounded-full border border-white/20 text-white/60 hover:border-accent hover:text-white transition-colors duration-300'
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
