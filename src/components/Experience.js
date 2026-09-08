import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';

const roles = [
  {
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
      'Cut stream startup latency from ~15s to ~7–9s, replacing a frame-by-frame WebSocket image stream with WebRTC and optimizing ICE negotiation and media buffering.',
      'Eliminated a 4–5 second desync between ML overlays and live video by matching RTP timestamps to async inference within a ~200ms window.',
      'Designed a multi-camera streaming platform capping views at a 4x4 grid, so the backend opens 16 ports instead of provisioning 1000+ cameras.',
      'Engineered a canvas layer using requestVideoFrameCallback and normalized coordinates, rendering 5–25 bounding boxes and polygons per frame at 30 FPS with pan and zoom.',
      'Developed a real-time alerting system over SSE and Fetch streaming handling ~1,000 alerts/day in testing, adding exponential-backoff reconnection after restarts left clients silently disconnected.',
      'Shipped production frontends in Next.js/TypeScript, building 12–15 reusable UI components for an analytics platform with role-based access.',
      'Hardened security with NextAuth (JWT/OAuth), Zod and CSP/HSTS; remediated 6+ CVEs including CRLF-injection and ReDoS, and instrumented Sentry across server and edge runtimes.',
    ],
  },
];

const Experience = () => {
  return (
    <section className='section !h-auto lg:!h-auto lg:py-24' id='experience'>
      <div className='container mx-auto'>
        <motion.div
          variants={fadeIn('up', 0.3)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className='h2 text-gradient'>EXPERIENCE</h2>
        </motion.div>

        {roles.map((role) => (
          <motion.div
            key={role.company}
            variants={fadeIn('up', 0.5)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.2 }}
            className='border border-white/20 rounded-2xl p-6 lg:p-10 bg-black/20 backdrop-blur-sm'
          >
            <div className='flex flex-col lg:flex-row lg:items-baseline lg:justify-between mb-6'>
              <div>
                <h3 className='text-[26px] lg:text-[30px] font-primary font-semibold leading-tight'>
                  {role.title}
                </h3>
                <span className='text-gradient text-[20px]'>{role.company}</span>
              </div>
              <span className='text-white/60 text-base mt-2 lg:mt-0'>{role.period}</span>
            </div>

            <ul className='flex flex-col gap-y-4 mb-8'>
              {role.points.map((point, i) => (
                <li key={i} className='flex gap-x-3 text-base leading-[1.6]'>
                  <span className='text-accent mt-[2px]'>▸</span>
                  <span className='text-white/80'>{point}</span>
                </li>
              ))}
            </ul>

            <div className='flex flex-wrap gap-2'>
              {role.stack.map((tech) => (
                <span
                  key={tech}
                  className='text-sm px-3 py-1 rounded-full border border-white/25 text-white/70'
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
