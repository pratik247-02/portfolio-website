import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { FadeIn, fadeIn } from '../variants';
import img from '../assets/image.webp';
import { BsCloudDownload } from 'react-icons/bs';

const Banner = () => {
  return (
    <section className="min-h-[85vh] lg:min-h-[78vh] flex items-center" id="home">
      <div className="container mx-auto h-screen">
        <div className='flex flex-col gap-y-8 lg:flex-row lg:items-center lg:gap-x-12'>
        <div className='flex-1 text-center font-secondary lg:text-left'>
                <motion.h2 variants=
                {fadeIn('up' , 0.5)} 
                initial='hidden' 
                whileInView={'show'}
                viewport={{once: false, amount: 0.7}}
                className='text-[55px] font-bold leading-[0.8] lg:text-[90px]'> PRATIK <span>RAJE</span>
                </motion.h2>
              <motion.div 
              variants=
              {fadeIn('up' , 0.6)} 
              initial='hidden' 
              whileInView={'show'}
              viewport={{once: false, amount: 0.7}}
              className="mb-6 text-[36px] lg:text-[40px] font-secondary leading-[1]">
                <span className="mr-4">I am a</span>
                  <TypeAnimation
                    sequence={['Web-Developer', 2000, 'Programmer', 2000, 'Freelancer', 2000]}
                    speed={50}
                    className="text-gradient uppercase"
                    wrapper="span"
                    repeat={Infinity}
                  />
                  <p className='text-[20px]' style={{ fontWeight: 'lowercase' }}>A self taught Full-Stack Web-Developer and an Undergrad Student at IIIT-Bhopal.</p>
              </motion.div>
          
          < motion.div 
           variants=
           {fadeIn('up' , 0.8)} 
           initial='hidden' 
           whileInView={'show'}
           viewport={{once: false, amount: 0.7}}
          className='flex gap-x-6 max-w-max items-center mb-12 mx-auto lg:mx-0'>
            <button 
              onClick={() => window.location.href = '/Pratik-Resume.pdf'} 
              download 
              className='btn btn-lg'
            ><span className="flex items-center">
            Download Resume <BsCloudDownload className="ml-2" />
          </span>
            </button>

          </motion.div>

          <motion.div 
           variants=
           {fadeIn('up' , 0.9)} 
           initial='hidden' 
           whileInView={'show'}
           viewport={{once: false, amount: 0.7}}
          className='flex text-[20px] gap-x-6 max-w-max mx-auto lg:mx-0'>
            <a href='https://www.github.com/pratik247-02'>
              <FaGithub className='text-3xl' />
            </a>
            <a href='https://www.linkedin.com/in/pratik24702'>
              <FaLinkedin className='text-3xl' />
            </a>
          </motion.div>

        </div>
        <div className="lg:flex-1 max-w-[320px] lg:max-w-[482px] lg:ml-8 mt-8 lg:mt-0">
          <div className="rounded-full overflow-hidden mx-auto lg:mx-0 h-[320px] w-[250px] lg:h-[482px] lg:w-[400px]">
            <img src={img} alt="" className="object-cover object-center h-full w-full" />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Banner;
