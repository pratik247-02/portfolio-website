import React from 'react';
import {motion } from 'framer-motion';
import { fadeIn } from '../variants';
import Img1 from '../assets/musicxx.png'
import Img2 from '../assets/shoesavvy.jpeg'
import Img3 from '../assets/portfolio-img3.png'

const Work = () => {
  return (
    <section className='section' id='work'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row gap-x-10'>
          
          <motion.div 
          variants={fadeIn('right', 0.5)}
          initial='hidden'
          whileInView={'show'}
          viewport={{once:false , amount: 0.5}}
          className='flex-1 flex flex-col gap-y-12 mb-10 lg:mb-0'>
            <div>
              <h2 className='h2 text-gradient'>MY PROJECTS/WORK</h2>
              <p className='max-w-sm mb-16'>
                Here are some of my projects that I have worked on recently. I love to create beautiful front-end UIs and also work on the back-end. I have an expertise in Node & Express for back-end and React for front-end.
              </p>
              <button className='btn btn-sm'>View All</button>
            </div>
            <a href='https://www.github.com/pratik247-02/Musicxx'>
            <div className='group relative overflow-hidden border-2 border-white/50 rounded-x1'>
              <div className='group-hover:bg-black/70 w-full h-full absolute z-40 transition-all duration-300'> </div>
              <img className='group-hover:scale-125  transition-all duration-500' src={Img1} alt=''/>
              <div className='absolute -bottom-full left-12 group-hover:bottom-24 transition-all duration-500 z-50'>
                <span className='text-gradient'>MUSICXX</span>
              </div>
              <div className='absolute -bottom-full left-12 group-hover:bottom-14 transition-all duration-500 z-50'>
                <span className='text-bold'>Javascript Project: Single Page Music Player</span>
              </div>
            </div>
            </a>
          </motion.div>
          <motion.div 
          variants={fadeIn('left', 0.5)}
          initial='hidden'
          whileInView={'show'}
          viewport={{once:false , amount: 0.5}}
          className='flex-1 flex flex-col gap-y-6'>
            <a href='https://www.github.com/pratik247-02/Shoesavvy'>
          <div className='group relative overflow-hidden border-2 border-white/50 rounded-x1 h-64'>
              <div className='group-hover:bg-black/70 w-full h-full absolute z-40 transition-all duration-300'> </div>
              <img className='group-hover:scale-125  transition-all duration-500' src={Img2} alt=''/>
              <div className='absolute -bottom-full left-12 group-hover:bottom-24 transition-all duration-500 z-50'>
                <span className='text-gradient'>Shoesavvy</span>
              </div>
              <div className='absolute -bottom-full left-12 group-hover:bottom-14 transition-all duration-500 z-50'>
                <span className=''>Full Stack-MERN- E-Commerce Website</span>
              </div>
            </div>
            </a>
            <a href='https://www.github.com/pratik247-02/ReactFlix'>
            <div className='group relative overflow-hidden border-2 border-white/50 rounded-x1 h-64'>
              <div className='group-hover:bg-black/70 w-full h-full absolute z-40 transition-all duration-300'> </div>
              <img className='group-hover:scale-125  transition-all duration-500' src={Img3} alt=''/>
              <div className='absolute -bottom-full left-12 group-hover:bottom-24 transition-all duration-500 z-50'>
                <span className='text-gradient'>ReactFlix</span>
              </div>
              <div className='absolute -bottom-full left-12 group-hover:bottom-14 transition-all duration-500 z-50'>
                <span className=''>React Project: Movie Searching UI using OMDB-API</span>
              </div>
            </div>
            </a>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Work;
