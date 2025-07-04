// src/pages/About.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const asciiArt = `
  ________        __              ________               
 /  _____/  _____/  |_  ____     /  _____/_____    ____  
/   \\  ____/ __ \\   __\\/ __ \\   /   \\  ___\\__  \\  /    \\ 
\\    \\_\\  \\  ___/|  | \\  ___/   \\    \\_\\  \\/ __ \\|   |  \\
 \\______  /\\___  >__|  \\___  >   \\______  (____  /___|  /
        \\/     \\/          \\/           \\/     \\/     \\/
`;

const hireMeASCII = `
 _    _ _           __  __ ______ 
| |  | (_)         |  \\/  |  ____|
| |__| |_  ___ ___ | \\  / | |__   
|  __  | |/ __/ _ \\| |\\/| |  __|  
| |  | | | (_| (_) | |  | | |____ 
|_|  |_|_|\\___\\___/|_|  |_|______|
`;

const timeline = [
  "2023: Started web dev journey with HTML, CSS, and JS 🚀",
  "2023: Leveraged AI tools like ChatGPT to grow faster 🤖",
  "2024: Mastered full-stack MERN & Next.js with real projects ⚙️",
  "2024: Learned Django & Python for backend power 🐍",
  "2025: Co-founded ZH Developers Agency 💼",
  "2025: Specialized in lead-gen landing pages & SaaS for local niches 🌐",
  "Ongoing: Personal branding through Reels & storytelling 📣",
  "Today: Blending tech + creativity with sleek UI/UX 💡",
];

const skills = [
  "React.js ⚛️", "Vite ⚡", "Next.js", "MongoDB", "Python (Django)",
  "Tailwind CSS 🎨", "Framer Motion 🎞️", "Git 🔧",
  "REST APIs & Automation 🔁", "Terminal UI Design 💻",
  "Communication & Personal Branding 💬",
];

const gifs = {
  skills: "https://media.giphy.com/media/QMHoU66sBXqqLqYvGO/giphy.gif",
  timeline: "https://media.giphy.com/media/SWoSkN6DxTszqIKEqv/giphy.gif",
  ascii: "https://media.giphy.com/media/xUOxf48t3aCwTkbCZO/giphy.gif",
  hireme: "https://media.giphy.com/media/3o6Mbbs879ozZ9Yic0/giphy.gif",
};

const commands = {
  help: (
    <>
      <p>Available commands:</p>
      <ul className="list-disc list-inside">
        <li><code>ls skills</code> – View tech stack</li>
        <li><code>ls timeline</code> – View journey</li>
        <li><code>ls ascii</code> – Show ASCII art</li>
        <li><code>cat hireme</code> – Why you should hire me</li>
        <li><code>clear</code> – Clear terminal</li>
      </ul>
    </>
  ),
  'ls skills': (
    <>
      <p>Wanna see my skills huh? Naughty dev 😏</p>
      <ul className="list-disc list-inside">{skills.map((s, i) => <li key={i}>{s}</li>)}</ul>
      <img src={gifs.skills} alt="skills-gif" className="mt-4 rounded-lg w-64 mx-auto" />
    </>
  ),
  'ls timeline': (
    <>
      <p>Here’s my journey — raw, real, and always evolving 💫</p>
      <ul className="list-disc list-inside">{timeline.map((t, i) => <li key={i}>{t}</li>)}</ul>
      <img src={gifs.timeline} alt="timeline-gif" className="mt-4 rounded-lg w-64 mx-auto" />
    </>
  ),
  'ls ascii': (
    <>
      <pre className="text-green-400">{asciiArt}</pre>
      <img src={gifs.ascii} alt="ascii-gif" className="mt-4 rounded-lg w-64 mx-auto" />
    </>
  ),
  'cat hireme': (
    <>
      <pre className="text-green-400">{hireMeASCII}</pre>
      <img src={gifs.hireme} alt="hireme-gif" className="mt-4 rounded-lg w-64 mx-auto" />
      <p className="mt-2 text-white">
        I'm Zowrays — a full-stack dev blending frontend vibe ✨ with backend power 💥.<br />
        Co-founder of <strong>ZH Developers</strong> — we build smart, stunning, conversion-focused digital solutions.<br />
        From SaaS to landing pages, I merge creativity with code for real results.<br />
        Let’s build something remarkable — I speak both code & client 🤝
      </p>
    </>
  ),
  clear: null,
};

function About() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');

  const handleCommand = (e) => {
    e.preventDefault();
    const value = input.trim();
    if (!value) return;

    if (value === 'clear') {
      setHistory([]);
    } else {
      setHistory(prev => [
        ...prev,
        {
          command: value,
          output: commands[value] || <p className="text-red-500">Command not found. Type <code>help</code> for options.</p>,
        }
      ]);
    }
    setInput('');
  };

  return (
    <motion.section
      className="about"
      initial={{ opacity: 0, x: 0 }}
      whileInView={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
        className="p-4 md:p-8 max-w-2xl mx-auto"
      >
        <h1 className='text-center font-bold text-3xl p-5'>ABOUT ME</h1>
        <div className=" bg-black border  border-green-500 rounded-lg p-4 min-h-[75vh] shadow-md">
          <div className="text-green-500 font-bold mb-2">~/About Terminal</div>
          <div className="text-gray-400 mb-4">Type <code>help</code> to see available commands.</div>

          <div className="space-y-4 mb-4">
            <AnimatePresence>
              {history.map((item, i) => (
                <motion.div
                  key={item.command + i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <div className="text-blue-400">$ {item.command}</div>
                  <div className="pl-2 text-white">{item.output}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <form onSubmit={handleCommand}>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">$</span>
              <input
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-white placeholder-gray-500"
                placeholder="Type a command..."
              />
            </div>
          </form>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default About;
