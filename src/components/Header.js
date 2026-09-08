import React from 'react';
import { Link } from 'react-scroll';

const openPalette = () =>
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));

const Header = () => {
  return (
    <header className='py-8 relative z-20'>
      <div className='container mx-auto'>
        <div className='flex justify-between items-center'>
          <Link to='home' smooth={true} offset={-200} className='cursor-pointer'>
            <h2
              style={{ fontSize: '42px' }}
              className='text-gradient font-bold inline-block'
            >
              नमस्कार
            </h2>
            <p style={{ fontSize: '42px' }} className='inline'>
              🙏
            </p>
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
