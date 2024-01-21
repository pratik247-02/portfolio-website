import React from 'react';

const Header = () => {
  return (
    <header className="py-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          
          <a href="">
          <h2 style={{ fontSize: '45px' }} className='text-gradient font-bold inline-block'>नमस्कार</h2>
          <p style={{ fontSize: '45px' }}className='inline'>🙏</p>
          </a>
          
          <button className="btn btn-sm">Work with me</button>
          
        </div>
      </div>
    </header>
  );
};

export default Header;
