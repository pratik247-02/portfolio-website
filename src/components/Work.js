import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    name: 'MCU Hub',
    tagline: 'A catalogue of the Marvel Cinematic Universe, with a graph traversal engine underneath.',
    description:
      'A graph traversal service over 193 nodes and 755 edges — BFS, weighted Dijkstra and centrality — cutting shortest-path p95 from 34.7ms to 0.2ms with an in-process adjacency snapshot. The win came from eliminating network round trips, not a better algorithm, and the benchmark harness and methodology are published alongside it. Documented with 5 architecture decisions that name their rejection criteria, including why not Neo4j.',
    highlights: [
      'p95 shortest path: 34.7ms → 0.2ms',
      '41 tests, verified by mutation testing',
      'CI on Node 20 and 22 per PR',
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Node 22', 'Express', 'MongoDB', 'Tailwind'],
    live: 'https://marvel-six-lake.vercel.app',
    api: 'https://marvel-api-mueo.onrender.com/health',
    github: 'https://github.com/pratik247-02/Marvel',
    featured: true,
  },
  {
    name: 'Shoesavvy',
    tagline: 'Full-stack MERN e-commerce platform.',
    description:
      'A shoe storefront with catalogue browsing, cart and checkout. JWT-secured APIs with password reset, an admin panel managing 100+ products, orders and categories, Axios call optimization that cut response time by 40%, and Braintree for payments.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Braintree'],
    github: 'https://github.com/pratik247-02/Shoesavvy',
    featured: false,
  },
  {
    name: 'MovieSearcher',
    tagline: 'Movie search and bookmarking app.',
    description:
      'Built on Vite + React for a 30% faster load than CRA, pulling live data from the TMDB API. A two-page UI with a favorites store that persists to LocalStorage.',
    stack: ['Vite', 'React', 'TMDB API', 'LocalStorage'],
    live: 'https://movie-searcher-kappa.vercel.app/',
    github: 'https://github.com/pratik247-02/MovieSearcher',
    featured: false,
  },
  {
    name: 'Bill-Manager',
    tagline: 'Single-page budgeting and expense tracker.',
    description:
      'Redux Toolkit state handling 500+ expenses with near-instant (<100ms) adds. Monthly budget allocation, categorized expenses, bill suggestions based on remaining budget, and an expense-vs-date trend chart.',
    stack: ['React', 'Redux Toolkit', 'Chart.js'],
    live: 'https://bill-manager-theta.vercel.app/',
    github: 'https://github.com/pratik247-02/Bill-Manager',
    featured: false,
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
        Live Demo <FaExternalLinkAlt className='text-sm' />
      </a>
    )}
    {project.api && (
      <a
        href={project.api}
        target='_blank'
        rel='noreferrer'
        className='flex items-center gap-x-2 text-white/70 hover:text-white text-base transition-all'
      >
        API <FaExternalLinkAlt className='text-sm' />
      </a>
    )}
    {project.github && (
      <a
        href={project.github}
        target='_blank'
        rel='noreferrer'
        className='flex items-center gap-x-2 text-white/70 hover:text-white text-base transition-all'
      >
        <FaGithub /> Source
      </a>
    )}
  </div>
);

const Work = () => {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section className='section !h-auto lg:!h-auto lg:py-24' id='work'>
      <div className='container mx-auto'>
        <motion.div
          variants={fadeIn('up', 0.3)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.2 }}
          className='mb-10'
        >
          <h2 className='h2 text-gradient'>PROJECTS</h2>
          <p className='max-w-2xl text-white/70'>
            Things I have built outside of work — from the graph engine below to the
            earlier projects I learned the fundamentals on.
          </p>
        </motion.div>

        {/* Featured project */}
        <motion.div
          variants={fadeIn('up', 0.4)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.2 }}
          className='border border-white/20 rounded-2xl p-6 lg:p-10 bg-black/20 backdrop-blur-sm mb-8'
        >
          <div className='flex flex-col lg:flex-row lg:items-baseline lg:justify-between mb-3'>
            <h3 className='text-[28px] lg:text-[34px] font-primary font-semibold leading-tight text-gradient'>
              {featured.name}
            </h3>
            <span className='text-accent text-sm uppercase tracking-widest mt-2 lg:mt-0'>
              Featured
            </span>
          </div>
          <p className='text-[20px] text-white/90 mb-4 leading-[1.4]'>{featured.tagline}</p>
          <p className='text-base text-white/70 mb-6 leading-[1.6] max-w-3xl'>
            {featured.description}
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6'>
            {featured.highlights.map((h) => (
              <div
                key={h}
                className='border border-white/15 rounded-xl px-4 py-3 text-base text-white/80'
              >
                {h}
              </div>
            ))}
          </div>

          <div className='flex flex-wrap gap-2 mb-6'>
            {featured.stack.map((tech) => (
              <span
                key={tech}
                className='text-sm px-3 py-1 rounded-full border border-white/25 text-white/70'
              >
                {tech}
              </span>
            ))}
          </div>

          <LinkRow project={featured} />
        </motion.div>

        {/* Secondary projects */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch'>
          {rest.map((project, i) => (
            <motion.div
              key={project.name}
              variants={fadeIn('up', 0.5 + i * 0.1)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.2 }}
              className='border border-white/20 rounded-2xl p-6 bg-black/20 backdrop-blur-sm flex flex-col'
            >
              <h3 className='text-[24px] font-primary font-semibold mb-2 text-gradient'>
                {project.name}
              </h3>
              <p className='text-[18px] text-white/90 mb-3 leading-[1.4]'>{project.tagline}</p>
              <p className='text-base text-white/70 mb-5 leading-[1.6] flex-grow'>
                {project.description}
              </p>

              <div className='flex flex-wrap gap-2 mb-5'>
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className='text-sm px-3 py-1 rounded-full border border-white/25 text-white/70'
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <LinkRow project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
