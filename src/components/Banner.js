import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';
import img from '../assets/pratik3.jpeg';
import { BsCloudDownload } from 'react-icons/bs';

const Banner = () => {
  return (
    <section className="min-h-[85vh] lg:min-h-[78vh] flex items-center" id="home">
      <div className="container mx-auto h-screen">
        <div className='flex flex-col gap-y-8 lg:flex-row lg:items-center lg:gap-x-12'>
        <div className='flex-1 text-center font-secondary lg:text-left'>
                <motion.h1 variants=
                {fadeIn('up' , 0.5)}
                initial='hidden'
                whileInView={'show'}
                viewport={{once: false, amount: 0.7}}
                className='text-[55px] font-bold leading-[1] lg:text-[80px] mb-2'>
                  Pratik Raje
                </motion.h1>

              <motion.div
              variants=
              {fadeIn('up' , 0.6)}
              initial='hidden'
              whileInView={'show'}
              viewport={{once: false, amount: 0.7}}
              className="mb-6 font-secondary">
                <h2 className='text-gradient text-[26px] lg:text-[32px] leading-[1.2] mb-4'>
                  Software Developer, Real-Time Systems
                </h2>
                <p className='text-[20px] max-w-[600px] mx-auto lg:mx-0 leading-[1.5] text-white/80'>
                  Software Developer at Matrice AI, working on a real-time
                  multi-camera video streaming and analytics platform built with
                  WebRTC, Next.js and Node.js.
                </p>
              </motion.div>

          < motion.div
           variants=
           {fadeIn('up' , 0.8)}
           initial='hidden'
           whileInView={'show'}
           viewport={{once: false, amount: 0.7}}
          className='flex gap-x-6 max-w-max items-center mb-12 mx-auto lg:mx-0'>
            <a
              href='/Pratik-Resume.pdf'
              download
              className='btn btn-lg flex items-center'
            ><span className="flex items-center">
            Download Resume <BsCloudDownload className="ml-2" />
          </span>
            </a>

          </motion.div>

          <motion.div
           variants=
           {fadeIn('up' , 0.9)}
           initial='hidden'
           whileInView={'show'}
           viewport={{once: false, amount: 0.7}}
          className='flex text-[20px] gap-x-6 max-w-max mx-auto lg:mx-0'>
            <a href='https://www.github.com/pratik247-02' target='_blank' rel='noreferrer' aria-label='GitHub'>
              <FaGithub className='text-3xl' />
            </a>
            <a href='https://www.linkedin.com/in/pratik24702' target='_blank' rel='noreferrer' aria-label='LinkedIn'>
              <FaLinkedin className='text-3xl' />
            </a>
          </motion.div>

        </div>
        <div className="lg:flex-1 max-w-[320px] lg:max-w-[482px] lg:ml-8 mt-8 lg:mt-0">
          <div className="rounded-full overflow-hidden mx-auto lg:mx-0 h-[320px] w-[320px] lg:h-[440px] lg:w-[440px]">
            <img src={img} alt="Pratik Raje" className="object-cover object-center h-full w-full" />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Banner;
