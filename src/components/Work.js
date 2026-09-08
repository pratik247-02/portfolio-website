import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import SectionHeading from './ui/SectionHeading';
import TiltCard from './ui/TiltCard';
import graphShot from '../assets/mcu-hub-graph.webp';

const featured = {
  name: 'MCU Hub',
  tagline: 'A catalogue of the Marvel Cinematic Universe, with a graph traversal engine underneath.',
  // Broken into paragraphs rather than one block: the second point is the
  // interesting one and gets buried when it is sentence four of four.
  body: [
    'A graph traversal service over 193 nodes and 755 edges — BFS, weighted Dijkstra and centrality — cutting shortest-path p95 from 34.7ms to 0.2ms with an in-process adjacency snapshot.',
    'The win came from eliminating network round trips, not a better algorithm. The benchmark harness and methodology are published alongside it, along with 5 architecture decisions that name what would reverse them — including why not Neo4j.',
  ],
  highlights: [
    { value: '34.7ms → 0.2ms', label: 'p95 shortest path' },
    { value: '41 tests', label: 'verified by mutation' },
    { value: 'Node 20 + 22', label: 'CI on every PR' },
  ],
  stack: ['Next.js 16', 'React 19', 'TypeScript', 'Node 22', 'Express', 'MongoDB', 'Tailwind'],
  live: 'https://marvel-six-lake.vercel.app',
  api: 'https://marvel-api-mueo.onrender.com/health',
  github: 'https://github.com/pratik247-02/Marvel',
};

const projects = [
  {
    name: 'Shoesavvy',
    tagline: 'Full-stack MERN e-commerce platform.',
    description:
      'A shoe storefront with catalogue browsing, cart and checkout. JWT-secured APIs with password reset, an admin panel managing 100+ products, orders and categories, Axios call optimization that cut response time by 40%, and Braintree for payments.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Braintree'],
    github: 'https://github.com/pratik247-02/Shoesavvy',
  },
  {
    name: 'MovieSearcher',
    tagline: 'Movie search and bookmarking app.',
    description:
      'Built on Vite + React for a 30% faster load than CRA, pulling live data from the TMDB API. A two-page UI with a favorites store that persists to LocalStorage.',
    stack: ['Vite', 'React', 'TMDB API', 'LocalStorage'],
    live: 'https://movie-searcher-kappa.vercel.app/',
    github: 'https://github.com/pratik247-02/MovieSearcher',
  },
  {
    name: 'Bill-Manager',
    tagline: 'Single-page budgeting and expense tracker.',
    description:
      'Redux Toolkit state handling 500+ expenses with near-instant (<100ms) adds. Monthly budget allocation, categorized expenses, bill suggestions based on remaining budget, and an expense-vs-date trend chart.',
    stack: ['React', 'Redux Toolkit', 'Chart.js'],
    live: 'https://bill-manager-theta.vercel.app/',
    github: 'https://github.com/pratik247-02/Bill-Manager',
  },
];

const LinkRow = ({ project }) => (
  <div className='flex flex-wrap gap-x-5 gap-y-2 items-center'>
    {project.live && (
      <a
        href={project.live}
        target='_blank'
        rel='noreferrer'
        className='flex items-center gap-x-2 text-gradient text-base'
      >
        Live Demo <FaExternalLinkAlt className='text-xs' />
      </a>
    )}
    {project.api && (
      <a
        href={project.api}
        target='_blank'
        rel='noreferrer'
        className='flex items-center gap-x-2 text-white/55 hover:text-white text-base transition-colors'
      >
        API <FaExternalLinkAlt className='text-xs' />
      </a>
    )}
    {project.github && (
      <a
        href={project.github}
        target='_blank'
        rel='noreferrer'
        className='flex items-center gap-x-2 text-white/55 hover:text-white text-base transition-colors'
      >
        <FaGithub /> Source
      </a>
    )}
  </div>
);

const Chips = ({ items }) => (
  <div className='flex flex-wrap gap-2'>
    {items.map((tech) => (
      <span
        key={tech}
        className='text-sm px-3 py-1 rounded-full border border-white/20 text-white/60'
      >
        {tech}
      </span>
    ))}
  </div>
);

const Work = () => {
  return (
    <section className='section' id='work'>
      <div className='container mx-auto'>
        <SectionHeading index='02' title='Projects'>
          Things I have built outside of work. The first one is where most of the
          engineering went.
        </SectionHeading>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className='mb-8'
        >
          <TiltCard
            intensity={3}
            className='border border-white/15 rounded-2xl p-6 lg:p-10 bg-white/[0.02] backdrop-blur-sm'
          >
            <div className='relative z-10'>
              <div className='flex flex-col lg:flex-row lg:items-baseline lg:justify-between mb-4'>
                <h3 className='text-[30px] lg:text-[38px] font-primary font-semibold leading-tight text-gradient'>
                  {featured.name}
                </h3>
                <span className='text-accent text-xs uppercase tracking-[0.3em] mt-2 lg:mt-0 font-primary'>
                  Featured
                </span>
              </div>

              <p className='text-[19px] lg:text-[21px] text-white/85 mb-8 leading-[1.45] max-w-[46ch]'>
                {featured.tagline}
              </p>

              {/* The graph view is the thing worth showing, so it gets the
                  width. Prose sits beside it, capped to a readable measure. */}
              <div className='grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-x-10 gap-y-8 mb-9 items-start'>
                <a
                  href={featured.live}
                  target='_blank'
                  rel='noreferrer'
                  className='group block rounded-xl overflow-hidden border border-white/12 bg-black/40 hover:border-accent/60 transition-all duration-500'
                >
                  <img
                    src={graphShot}
                    alt='MCU Hub explore view: a force-directed graph of 41 Marvel characters and 177 connections, with edges coloured by relationship type'
                    loading='lazy'
                    className='w-full block group-hover:scale-[1.03] transition-transform duration-700 ease-out'
                  />
                  <div className='flex items-center justify-between px-4 py-2.5 border-t border-white/10 text-[13px]'>
                    <span className='text-white/45'>
                      Explore view · 41 characters, 177 connections
                    </span>
                    <span className='text-white/45 group-hover:text-white transition-colors flex items-center gap-x-1.5'>
                      Open <FaExternalLinkAlt className='text-[10px]' />
                    </span>
                  </div>
                </a>

                <div className='flex flex-col gap-y-4'>
                  {featured.body.map((para) => (
                    <p
                      key={para.slice(0, 24)}
                      className='text-[16px] text-white/65 leading-[1.75] max-w-[58ch]'
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8'>
                {featured.highlights.map((h) => (
                  <div
                    key={h.label}
                    className='border border-white/10 rounded-xl px-4 py-3 bg-white/[0.02]'
                  >
                    <div className='font-primary text-[17px] text-white/90 mb-1'>
                      {h.value}
                    </div>
                    <div className='text-sm text-white/40'>{h.label}</div>
                  </div>
                ))}
              </div>

              <div className='mb-7'>
                <Chips items={featured.stack} />
              </div>

              <LinkRow project={featured} />
            </div>
          </TiltCard>
        </motion.div>

        <motion.div
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.1 }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch'
        >
          {projects.map((project) => (
            <motion.div
              key={project.name}
              variants={{
                hidden: { opacity: 0, y: 28 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
              className='h-full'
            >
              <TiltCard className='border border-white/15 rounded-2xl p-6 bg-white/[0.02] backdrop-blur-sm h-full flex flex-col'>
                <div className='relative z-10 flex flex-col h-full'>
                  <h3 className='text-[22px] font-primary font-semibold mb-2 text-gradient'>
                    {project.name}
                  </h3>
                  <p className='text-[17px] text-white/90 mb-3 leading-[1.45]'>
                    {project.tagline}
                  </p>
                  <p className='text-[15px] text-white/65 mb-6 leading-[1.7] flex-grow'>
                    {project.description}
                  </p>

                  <div className='mb-5'>
                    <Chips items={project.stack} />
                  </div>

                  <div className='mt-auto'>
                    <LinkRow project={project} />
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

export default Work;
