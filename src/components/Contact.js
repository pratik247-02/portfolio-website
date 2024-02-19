import React from 'react';
import {motion } from 'framer-motion';
import { fadeIn } from '../variants';

const Contact = () => {
  return (
    <section className="py-16 lg:section" id="contact">
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row'>
          <motion.div 
          variants={fadeIn('right', 0.5)}
          initial='hidden'
          whileInView={'show'}
          viewport={{once:false , amount: 0.5}}
          className='flex-1 flex justify-start items-center'>
          <div>
            <h4 className='text-[45px] uppercase text-accent font-medium mb-2 tracking-wide'>Get In Touch</h4>
            <h2 className='text-[45px] lg:text-[80px] leading-none mb-12'>Let's Work <br/>Together!</h2>
          </div>
          </motion.div>
          <motion.form variants={fadeIn('left', 0.5)}
          initial='hidden'
          whileInView={'show'}
          viewport={{once:false , amount: 0.5}}
          className='flex-1 border rounded 2x1 flex flex-col gap-y-6 pb-24 p-6 items-start'
          action="https://getform.io/f/04b31b58-e1ed-46ac-9d04-c1ea613fa881" method="POST"
          >
            <input type='text' name="name" placeholder='Your Name' className='w-full 
            bg-transparent 
            border-b border-gray-300 
            py-3 px-4 mb-8 
            focus:outline-none focus:border-accent
            transition-all' />
             <input type='email' name="email" placeholder='Your Email' className='w-full 
            bg-transparent 
            border-b border-gray-300 
            py-3 px-4 mb-8 
            focus:outline-none focus:border-accent
            transition-all' required />
            <textarea name="message" className='w-full 
            bg-transparent 
            border-b border-gray-300 
            py-3 px-4 mb-8 
            focus:outline-none focus:border-accent
            transition-all' placeholder='Your Message' type='text'
            ></textarea>
            <button className='btn btn-lg'>Send Message</button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
