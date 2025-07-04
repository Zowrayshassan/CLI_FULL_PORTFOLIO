// src/pages/Home.jsx
'use client';
import React, { useState, useRef } from 'react';
import { ThemeProvider, useTheme } from 'next-themes';
import { FaInstagram, FaGithub, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';
import HeroImg from '../assets/heroo.png';
import Navbar from './Nav';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef(null);
  const { theme } = useTheme();

  const glitchAscii = `
  ____  _     ___   ___  ____  _____ ____ 
 /  _ \\| |   / _ \\ / _ \\|  _ \\| ____|  _ \\
| | | | |  | | | | | | | |_) |  _| | | | |
| |_| | |__| |_| | |_| |  _ <| |___| |_| |
 \\___/|_____\\___/ \\___/|_| \\_\\_____|____/`;

  const commands = {
    'ls me': [
      '👋 Hello, I’m Zowrays Hassan.',
      '🧠 Passionate full-stack developer.',
      '🚀 Building real-world solutions using code.',
      <img key="gif1" src="https://media.giphy.com/media/M9gbBd9nbDrOTu1Mqx/giphy.gif" alt="Dev working" className="rounded w-48 my-2" />,
    ],
    'ls stacks': [
      '💻 Full-Stack Toolkit:',
      '• React ⚛️',
      '• Next.js 🚀',
      '• Tailwind CSS 💨',
      '• Python 🐍',
      '• Django 🎯',
      '• AI Tools 🤖',
      <img key="gif2" src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif" alt="Stack gif" className="rounded w-48 my-2" />,
    ],
    'ls socials': [
      <a key="insta" href="https://instagram.com/zowrayshassan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-pink-400 hover:underline">
        <FaInstagram /> instagram.com/zowrayshassan
      </a>,
      <a key="github" href="https://github.com/zowrayshassan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white hover:underline">
        <FaGithub /> github.com/zowrayshassan
      </a>,
      <a key="youtube" href="https://youtube.com/@zowrayshassan439" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-red-600 hover:underline">
        <FaYoutube /> youtube.com/@zowrayshassan
      </a>,
      <a key="linkedin" href="https://linkedin.com/in/zowrayshassan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-400 hover:underline">
        <FaLinkedin /> linkedin.com/in/zowrayshassan
      </a>,
    ],
    'download resume': [
      <a key="resume" href="/resume.pdf" download className="text-green-400 hover:underline">
        ⬇️ Resume download started...
      </a>,
    ],
    help: [
      '📝 Available commands:',
      '• ls me',
      '• ls stacks',
      '• ls socials',
      '• download resume',
      '• clear',
    ],
    clear: [],
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  const printLinesWithDelay = (lines, delay = 100) => {
    setIsTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      setOutput(prev => [...prev, lines[i]]);
      i++;
      scrollToBottom();
      if (i >= lines.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, delay);
  };

  const handleCommand = (command) => {
    const cmd = command.trim().toLowerCase();
    setOutput(prev => [...prev, <div className="text-green-400 font-bold">$ {cmd}</div>]);

    if (cmd in commands) {
      if (cmd === 'clear') {
        setOutput([]);
        return;
      }
      const response = commands[cmd];
      printLinesWithDelay(response);
    } else {
      printLinesWithDelay([
        `❌ Command not found: ${cmd}`,
        '👉 Type `help` for list of available commands.',
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isTyping) {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <main className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} font-mono`}>
     <Navbar></Navbar>

      <section className="flex flex-col md:flex-row min-h-[80vh] px-8 py-10">
        <div className="w-full md:w-1/2 p-4">
          <motion.div className="mb-4 text-lg md:text-2xl text-center font-semibold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            👨‍💻 Get to know me through this terminal
          </motion.div>

          <motion.div
            ref={containerRef}
            className="bg-black border border-green-500 rounded-lg p-6 h-[400px] overflow-y-auto shadow-inner backdrop-blur-md custom-scroll"
            style={{ scrollbarWidth: 'none' }}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <pre className="text-green-500 text-sm">{glitchAscii}</pre>
            <div className="text-green-400 mb-2 font-bold">~/zh-developers</div>
            {output.map((line, index) => (
              <motion.div key={index} className="whitespace-pre-wrap" initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                {line}
              </motion.div>
            ))}
            <div className="flex items-center mt-2">
              <span className="text-green-400 font-bold mr-2">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent outline-none w-full text-gray-400 py-1 animate-pulse"
                placeholder={isTyping ? 'processing...' : 'Type a command... (try `help`)' }
                disabled={isTyping}
                autoFocus
              />
              <span className="animate-blink ml-1 text-green-500">█</span>
            </div>
          </motion.div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center ml-20 mt-6 md:mt-0">
          <motion.img
            src={HeroImg}
            alt="Zowrays Hassan"
            className=""
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
          />
        </div>
      </section>


      <About></About>
      <Projects></Projects>
      <Contact></Contact>
    </main>
  );
};

export default function PageWrapper() {
  return (
    <ThemeProvider attribute="class">
      <Terminal />
    </ThemeProvider>
  );
}
