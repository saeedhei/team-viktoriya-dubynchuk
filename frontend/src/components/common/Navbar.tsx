// src/components/common/Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-800">
          EasyDeutsch
        </Link>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button> 


        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
          <li><Link to="/cards" className="hover:text-blue-600">Cards</Link></li>
          <li><Link to="/learn" className="hover:text-blue-600">Learn</Link></li>
          <li><Link to="/quiz" className="hover:text-blue-600">Quiz</Link></li>
        </ul>
      </div>


      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col space-y-2 text-gray-700 font-medium">
            <li><Link to="/" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link to="/cards" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Cards</Link></li>
            <li><Link to="/learn" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Learn</Link></li>
            <li><Link to="/quiz" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Quiz</Link></li>
          </ul>
        </div>
      )} 
    </nav>
  );
};

export default Navbar;






