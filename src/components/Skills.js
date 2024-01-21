import React from 'react'
import html from '../assets/htmllogo.png'
import css from '../assets/CSS3_logo.png'
import tailwind from '../assets/tailwind-css-2.webp'
import javascript from '../assets/javascript-js-logo.png'
import mongo from '../assets/mongologo.png'
import express from '../assets/expresslogo.png'
import react from '../assets/reactlogo.png'
import node from '../assets/nodelogo.png'
import clang from '../assets/clogo.png'
import cpp from '../assets/cpplogo.png'
import git from '../assets/gitlogo.png'
import github from '../assets/githublogo.png'

const Skills = () => {

      const skills = [
        {
          id: 1,
          src: html,
          title: 'HTML-5',
          style: 'shadow-md shadow-orange-300 hover:scale-105 duration-500 py-2 rounded-lg' 
        },
        {
          id: 2,
          src: css,
          title: 'CSS-3',
          style: 'shadow-md shadow-blue-500 hover:scale-105 duration-500 py-2 rounded-lg' 
        },
        {
          id: 3,
          src: tailwind,
          title: 'Tailwind CSS',
          style: 'shadow-md shadow-green-800 hover:scale-105 duration-500 py-2 rounded-lg' 
        },
        {
          id: 4,
          src: javascript,
          title: 'JAVA SCRIPT',
          style: 'shadow-md shadow-yellow-500 hover:scale-105 duration-500 py-2 rounded-lg' 
        },
        {
          id: 5,
          src: mongo,
          title: 'MONGO DB',
          style: 'shadow-md shadow-green-800 hover:scale-105 duration-500 py-2 rounded-lg' 
        },
        {
          id: 6,
          src: express,
          title: 'EXPRESS JS',
          style: 'shadow-md shadow-gray-900 hover:scale-105 duration-500 py-2 rounded-lg' 
        },
        {
          id: 7,
          src: react,
          title: 'REACT JS',
          style: 'shadow-md shadow-blue-300 hover:scale-105 duration-500 py-2 rounded-lg' 
        },
        {
          id: 8,
          src: node,
          title: 'NODE JS',
          style: 'shadow-md shadow-green-400 hover:scale-105 duration-500 py-2 rounded-lg' 
        },
        {
          id: 9,
          src: clang,
          title: 'C',
          style: 'shadow-md shadow-gray-500 hover:scale-105 duration-500 py-2 rounded-lg' 
        },
        {
          id: 10,
          src: cpp,
          title: 'C++',
          style: 'shadow-md shadow-blue-900 hover:scale-105 duration-500 py-2 rounded-lg' 
        },
        {
          id: 11,
          src: git,
          title: 'GIT',
          style: 'shadow-lg shadow-red-800 hover:scale-105 duration-500 py-2 rounded-lg' 
        },
        {
          id: 12,
          src: github,
          title: 'GITHUB',
          style: 'shadow-md shadow-orange-50 hover:scale-105 duration-500 py-2 rounded-lg' 
        }
        
      ]
  return (
    <section className='section' id='about'>
    <div className='container-mx-auto w-full h-screen text-center'>
      <div className='p-4 flex flex-col justify-center w-full h-full'>
        <div>
          <h2 className='h2 leading-tight font-bold border-b-4 p-2 inline text-gradient'> SKILLS & TOOLS</h2>
          <p className='py-6'>Recently, I have been actively engaged with the following technologies.</p>
        </div>
  
        <div className='w-full grid grid-cols-2 sm:grid-cols-4 gap-8 text-center py-8 px-12 sm:px-0'>
          {skills.map(({ id, src, title, style }) => (
            <div key={id} className={`flex flex-col items-center ${style}`}>
              <img src={src} alt={title} className='w-30 h-20 mx-auto' />
              <span className='text-gradient mt-4'>{title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
  
  );
};

export default Skills;
