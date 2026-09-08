import React from 'react';
import { Link } from 'react-scroll';

const Header = () => {
  return (
    <header className="py-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">

          <Link to="home" smooth={true} offset={-200} className="cursor-pointer">
          <h2 style={{ fontSize: '45px' }} className='text-gradient font-bold inline-block'>नमस्कार</h2>
          <p style={{ fontSize: '45px' }}className='inline'>🙏</p>
          </Link>

          <Link to="contact" smooth={true} offset={50} className="cursor-pointer">
            <button className="btn btn-sm">Work with me</button>
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Header;
