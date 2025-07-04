// src/components/Navbar.jsx
'use client';
import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import { Link } from 'react-scroll';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <>
      <motion.header className="sticky top-0 z-50 backdrop-blur-sm px-6 py-3 flex justify-between items-center border-b border-gray-700">
        <div className="text-lg font-bold text-green-400">{`</PORTFOLIO>`}</div>
        <div className="hidden sm:flex gap-20 font-semibold">
          <Link to="about" className='hover:text-green-400 cursor-pointer' smooth duration={500}>About</Link>
          <Link to="projects" className='hover:text-green-400 cursor-pointer' smooth duration={500}>Projects</Link>
          <Link to="contact" className='hover:text-green-400 cursor-pointer' smooth duration={500}>Contact</Link>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <SunIcon className="w-5 h-5 text-yellow-400" /> : <MoonIcon className="w-5 h-5 text-black" />}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden">
            {menuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </motion.header>

      {menuOpen && (
        <motion.div className="sm:hidden flex flex-col gap-10 text-center font-semibold p-4 bg-black text-green-400">
          <Link to="about" className='hover:text-green-400 cursor-pointer' smooth duration={500}>About</Link>
          <Link to="projects" className='hover:text-green-400 cursor-pointer' smooth duration={500}>Projects</Link>
          <Link to="contact" className='hover:text-green-400 cursor-pointer' smooth duration={500}>Contact</Link>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
