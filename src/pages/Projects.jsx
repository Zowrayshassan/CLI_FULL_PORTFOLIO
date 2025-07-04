// src/pages/Projects.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const projects = {
  theatre: {
    title: "🎭 Theatre Management System (C++)",
    gif: "https://media.giphy.com/media/3o7buirYcmV5nSwIRW/giphy.gif",
    tech: ["C++", "OOP", "GUI", "File I/O"],
    description: "A full-fledged theatre ticketing system featuring premium/standard seats, genre-based plays (drama, action), discounts, and seat availability logic.",
    github: "https://github.com/yourusername/theatre-management"
  },
  carauth: {
    title: "🚗 Django Car Auth App",
    gif: "https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif",
    tech: ["Django", "Python", "JWT", "PostgreSQL", "CRUD"],
    description: "Full-stack CRUD app with JWT auth to add, update, or delete cars. Users can register/login. Backend secured using Django Rest Framework.",
    github: "https://github.com/yourusername/django-car-auth"
  },
  weather: {
    title: "🌦️ Python Weather App",
    gif: "https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif",
    tech: ["Python", "Tkinter", "API Integration"],
    description: "Desktop GUI weather app using API to show real-time temperature, humidity, and weather conditions.",
    github: "https://github.com/yourusername/weather-app"
  },
  assistant: {
    title: "🧠 AI Voice Assistant",
    gif: "https://media.giphy.com/media/26xBsUjYHPz2hxxfC/giphy.gif",
    tech: ["Python", "SpeechRecognition", "pyttsx3", "AI"],
    description: "AI voice assistant that performs tasks like opening apps, searching, giving time/weather – all via voice commands.",
    github: "https://github.com/yourusername/ai-voice-assistant"
  },
  swapverse: {
    title: "🌐 SWAPVERSE – Fiverr for Skill Swapping",
    gif: "https://media.giphy.com/media/l4FGuhL4U2WyjdkaY/giphy.gif",
    tech: ["React", "Node", "MongoDB", "JWT", "Full-Stack"],
    description: "In-progress startup project for freelancers to swap skills like Fiverr — includes authentication, listing, booking, messaging & more.",
    github: "https://github.com/yourusername/swapverse"
  },
  pmapp: {
    title: "📁 Project Management App",
    gif: "https://media.giphy.com/media/Y4z9olnoVl5QI/giphy.gif",
    tech: ["React", "Node", "MongoDB", "Role-based Auth", "Dashboard UI"],
    description: "Admin can assign projects to employees, who view them on their dashboards. Role-based access ensures secure routing.",
    github: "https://github.com/yourusername/project-management"
  },
  amazon: {
    title: "🛒 Amazon Clone",
    gif: "https://media.giphy.com/media/3o7buijTqhjxjbEqjK/giphy.gif",
    tech: ["HTML", "CSS", "JavaScript"],
    description: "Classic Amazon-style frontend clone with product cards, categories, cart logic, and clean UI.",
    github: "https://github.com/yourusername/amazon-clone"
  },
};

const commandResponses = {
  help: (
    <>
      <p className="text-white">📘 Available commands:</p>
      <ul className="list-disc list-inside text-white ml-4">
        <li><code>ls projects</code> – List all project names</li>
        <li><code>cd [project]</code> – View full project card</li>
        <li><code>cat [project].txt</code> – View only description</li>
        <li><code>clear</code> – Clear terminal</li>
      </ul>
    </>
  ),
  'ls projects': (
    <ul className="list-disc list-inside text-white ml-4">
      {Object.keys(projects).map((key) => (
        <li key={key}><code>{key}</code></li>
      ))}
    </ul>
  ),
};

export default function Projects() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);

  const handleCommand = (e) => {
    e.preventDefault();
    const command = input.trim();
    let output;

    if (commandResponses[command]) {
      output = commandResponses[command];
    } else if (command.startsWith('cd ')) {
      const key = command.split('cd ')[1];
      const proj = projects[key];
      output = proj ? (
        <motion.div
          className="p-4 bg-black rounded-lg text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <h2 className="text-2xl font-bold text-green-400 mb-2">{proj.title}</h2>
          <motion.img
            src={proj.gif}
            alt={proj.title}
            className="my-4 mx-auto w-72 rounded-md shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 10 }}
          />
          <p className="font-semibold text-sm mb-1">⚙️ <span className="text-yellow-300">Tech Stack:</span> {proj.tech.join(', ')}</p>
          <p className="mb-3">📜 {proj.description}</p>
          <a
            href={proj.github}
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            🔗 View on GitHub
          </a>
        </motion.div>
      ) : (
        <p className="text-red-500">❌ Project not found. Type <code>ls projects</code> to see all available projects.</p>
      );
    } else if (command.startsWith('cat ') && command.endsWith('.txt')) {
      const key = command.split('cat ')[1].replace('.txt', '');
      const proj = projects[key];
      output = proj ? (
        <p className="text-white">📄 {proj.description}</p>
      ) : (
        <p className="text-red-500">❌ File not found. Try <code>ls projects</code> to see valid names.</p>
      );
    } else if (command === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else {
      output = (
        <p className="text-red-500">
          ⚠️ Unknown command. Type <code>help</code> to see valid commands.
        </p>
      );
    }

    setHistory([...history, { command, output }]);
    setInput('');
  };    

  return (
    <motion.section
   
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ amount: 0.3 }}  // 👈 animate every time it scrolls into view
    transition={{ duration: 0.6 }}
    className="p-4 md:p-8 max-w-2xl mx-auto"
  >
  
      <h1 className="text-center text-3xl font-bold mb-6">MY PROJECTS</h1>
      <div className=" bg-black border  border-green-500 rounded-lg p-4 min-h-[75vh] shadow-md">
        <div className="text-green font-bold mb-2">~/Projects Terminal</div>
        <p className="text-gray-400 mb-4">💡 Type <code>help</code> to get started</p>

        <div className="space-y-4 mb-6">
          {history.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-blue-400">$ {item.command}</div>
              <div className="pl-2">{item.output}</div>
            </motion.div>
          ))}
        </div>

        <form onSubmit={handleCommand}>
          <div className="flex items-center space-x-2">
            <span className="text-green-500">$</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-transparent text-white focus:outline-none placeholder-gray-500"
              placeholder="Enter a command..."
            />
          </div>
        </form>
      </div>
    </motion.section>
  );
}
