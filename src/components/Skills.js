import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import TiltCard from './ui/TiltCard';

const groups = [
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Material UI'],
  },
  {
    title: 'State & Data',
    items: ['Redux Toolkit', 'Redux Persist', 'REST APIs', 'Async data fetching'],
  },
  {
    title: 'Real-Time & Video',
    items: ['WebRTC', 'WebSockets', 'Server-Sent Events', 'RTP', 'Canvas API'],
  },
  {
    title: 'Backend & Databases',
    items: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Zod', 'REST API design'],
  },
  {
    title: 'Testing',
    items: ['Vitest', 'Supertest', 'mongodb-memory-server', 'GitHub Actions (CI/CD)'],
  },
  {
    title: 'Developer Tools',
    items: ['Git', 'GitHub', 'Postman', 'VS Code', 'Vercel'],
  },
];

const Skills = () => {
  return (
    <section className='section' id='about'>
      <div className='container mx-auto'>
        <SectionHeading index='03' title='Skills & Tools'>
          The stack I work in day to day, in production and on my own projects.
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
                intensity={5}
                className='border border-white/15 rounded-2xl p-6 bg-white/[0.02] backdrop-blur-sm h-full'
              >
                <div className='relative z-10'>
                  <h3 className='font-primary text-[15px] uppercase tracking-[0.2em] text-gradient mb-5'>
                    {group.title}
                  </h3>
                  <div className='flex flex-wrap gap-2'>
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className='text-sm px-3 py-1 rounded-full border border-white/20 text-white/65 hover:border-accent hover:text-white transition-colors duration-300'
                      >
                        {item}
                      </span>
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
