import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import CountUp from './ui/CountUp';

// Each card has to mean something standing alone, so the before/after lives
// inside one card rather than being split across two.
const HEADLINE = [
  {
    before: '~15s',
    after: '~5s',
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
    'OpenAPI',
    'NextAuth',
    'Zod',
  ],
  points: [
    {
      head: 'Reduced stream startup latency by 67%, ~15s to ~5s',
      body: 'Migrated from WebSocket to WebRTC and implemented trickle ICE, buffering candidates gathered before session establishment and flushing them once the session resolved.',
    },
    {
      head: 'Eliminated a 4–5 second overlay desync',
      body: 'Worked with the ML team to match RTP timestamps to async inference within a ~200ms window, so annotations landed on the frames they belonged to.',
    },
    {
      head: 'Built an adaptive canvas pipeline',
      body: 'Renders 5–25 bounding boxes, polygons, segmentation masks and pose key-points per frame, with dynamic frame pacing and prediction reuse.',
    },
    {
      head: 'Built a fault-tolerant multi-server streaming layer',
      body: 'One peer connection per media server, 5s health polling, and failover after 2 consecutive failures. Real-time alerting over SSE at ~1,000 alerts/day, with exponential-backoff reconnection after restarts left clients silently disconnected.',
    },
    {
      head: 'Generated typed API clients from OpenAPI contracts',
      body: 'Spanning 1,127 operations, with a consumer manifest adopted by 7 producer repositories to block breaking backend changes.',
    },
    {
      head: 'Hardened auth, validation and security across the platform',
      body: 'Single sign-on across two platforms via a shared NextAuth session cookie, for both cloud and on-premise deployments. Standardised validation across 188 modules with domain-organised Zod schemas, plus JWT/OAuth and CSP/HSTS — remediating 6+ CVEs including CRLF-injection and ReDoS, with Sentry across server and edge runtimes.',
    },
    {
      head: 'Cut camera provisioning from 1000+ streams to 16 ports',
      body: 'Negotiated a 4x4 grid cap with backend and product, removing a server-side scaling problem by constraining the UI.',
    },
    {
      head: 'Led frontend delivery on the streaming platform',
      body: 'Top contributor across 7 repositories, mentoring junior engineers through code review and refactoring work.',
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
          className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8'
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
                <CountUp
                  value={m.after}
                  className='font-primary text-[26px] lg:text-[30px] leading-none text-gradient'
                />
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
          <div className='flex flex-col lg:flex-row lg:items-baseline lg:justify-between mb-6 pb-5 border-b border-white/10'>
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
            className='grid grid-cols-1 xl:grid-cols-2 gap-x-10 gap-y-5 mb-7'
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
