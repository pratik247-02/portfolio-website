import React from 'react';
import { Link } from 'react-scroll';

const openPalette = () =>
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));

const Header = () => {
  // The hero darkens its own background with a gradient overlay; without a
  // matching wash up here the two backgrounds meet in a visible seam across
  // the top of the page.
  return (
    <header className='py-6 lg:py-7 relative z-20 bg-gradient-to-b from-[#0a0a0a]/75 to-transparent'>
      <div className='container mx-auto'>
        <div className='flex justify-between items-center'>
          <Link
            to='home'
            smooth={true}
            offset={-200}
            className='cursor-pointer group flex items-center gap-x-3'
            aria-label='Pratik Raje — home'
          >
            {/* Devanagari and Latin have different vertical metrics, so the
                two halves are aligned on their own baselines in a flex row
                rather than left to sit inline and drift apart. */}
            <span className='font-devanagari text-gradient font-semibold text-[34px] lg:text-[38px] leading-none'>
              नमस्कार
            </span>
            <span
              className='text-[26px] lg:text-[28px] leading-none transition-transform duration-300 group-hover:-rotate-6'
              role='img'
              aria-label='folded hands'
            >
              🙏
            </span>
          </Link>

          <div className='flex items-center gap-x-4'>
            <button
              type='button'
              onClick={openPalette}
              aria-label='Open command palette'
              className='hidden sm:flex items-center gap-x-2 text-white/45 hover:text-white/80 border border-white/15 hover:border-white/35 rounded-full px-4 h-[44px] transition-colors text-sm'
            >
              <span>Search</span>
              <kbd className='border border-white/25 rounded px-1.5 py-0.5 text-xs'>⌘K</kbd>
            </button>

            <Link to='contact' smooth={true} offset={50} className='cursor-pointer'>
              <button className='btn btn-sm'>Work with me</button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
