import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';

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
    <section className='section !h-auto lg:!h-auto lg:py-24' id='about'>
      <div className='container mx-auto'>
        <motion.div
          variants={fadeIn('up', 0.3)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.2 }}
          className='mb-10'
        >
          <h2 className='h2 text-gradient'>SKILLS &amp; TOOLS</h2>
          <p className='max-w-2xl text-white/70'>
            The stack I work in day to day, in production and on my own projects.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {groups.map((group, i) => (
            <motion.div
              key={group.title}
              variants={fadeIn('up', 0.35 + i * 0.05)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.2 }}
              className='border border-white/20 rounded-2xl p-6 bg-black/20 backdrop-blur-sm'
            >
              <h3 className='font-primary text-[18px] uppercase tracking-widest text-gradient mb-4'>
                {group.title}
              </h3>
              <div className='flex flex-wrap gap-2'>
                {group.items.map((item) => (
                  <span
                    key={item}
                    className='text-sm px-3 py-1 rounded-full border border-white/25 text-white/75'
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
