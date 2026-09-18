import React from 'react';
// components
import Banner from './components/Banner';
import Header from './components/Header';
import Nav from './components/Nav';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Work from './components/Work';
import Contact from './components/Contact';
import CommandPalette from './components/CommandPalette';

const App = () => {
  // bg-fixed pins the gradient to the viewport rather than stretching it over
  // the full scroll height, which is what the old 6620px-tall image did.
  return (
    <div className='bg-site bg-fixed overflow-hidden'>
      <CommandPalette />
      <Header />
      <Banner />
      <Nav />
      <About />
      <Experience />
      <Work />
      <Skills />
      <Contact />
    </div>
  );
};

export default App;
