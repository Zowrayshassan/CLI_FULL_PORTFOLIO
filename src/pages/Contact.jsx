// src/pages/Contact.jsx
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

const confirmationGIF = "https://media.giphy.com/media/3o6Mbbs879ozZ9Yic0/giphy.gif";

const glitchASCII = `
██████╗ ███████╗███╗   ███╗ █████╗ ██╗     
██╔══██╗██╔════╝████╗ ████║██╔══██╗██║     
██████╔╝█████╗  ██╔████╔██║███████║██║     
██╔═══╝ ██╔══╝  ██║╚██╔╝██║██╔══██║██║     
██║     ███████╗██║ ╚═╝ ██║██║  ██║███████╗
╚═╝     ╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝
`;

function Contact() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const sendEmail = () => {
    emailjs.send(
      'service_ltwn52g',
      'template_jd99h5t',
      formData,
      'XSadUYaQOsZEDdSdd'
    ).then(() => {
      setHistory(prev => [
        ...prev,
        {
          command: 'send',
          output: (
            <>
              <pre className="text-green-400 text-xs md:text-sm">{glitchASCII}</pre>
              <img src={confirmationGIF} alt="sent" className="mt-4 w-48 rounded shadow-md ml-10" />
              <p className="text-white mt-3">Message sent successfully! 🔥<br />I'll reach out soon BYE BYE !</p>
            </>
          ),
        },
      ]);
    }).catch((error) => {
      setHistory(prev => [
        ...prev,
        {
          command: 'send',
          output: <p className="text-red-500">Error: {error.text}</p>,
        },
      ]);
    });
  };

  const handleCommand = (e) => {
    e.preventDefault();
    const value = input.trim();

    if (!value) return;

    const [cmd, ...args] = value.split(" ");
    const argStr = args.join(" ");

    let response = null;

    switch (cmd) {
      case 'help':
        response = (
          <ul className="list-disc list-inside text-sm md:text-base">
            <li><code>set name &lt;your_name&gt;</code></li>
            <li><code>set email &lt;your_email&gt;</code></li>
            <li><code>set message &lt;your_message&gt;</code></li>
            <li><code>send</code> — Send your message</li>
            <li><code>clear</code> — Clear the terminal</li>
          </ul>
        );
        break;
      case 'set':
        if (args.length < 2) {
          response = <p className="text-yellow-300">⚠️ Usage: set [name/email/message] [value]</p>;
          break;
        }
        const field = args[0];
        const value = args.slice(1).join(" ");
        if (['name', 'email', 'message'].includes(field)) {
          setFormData(prev => ({ ...prev, [field]: value }));
          response = <p className="text-green-400">✅ {field} set to <span className="italic">"{value}"</span></p>;
        } else {
          response = <p className="text-red-400">❌ Invalid field '{field}'</p>;
        }
        break;
      case 'send':
        if (!formData.name || !formData.email || !formData.message) {
          response = <p className="text-yellow-300">⚠️ Fill all fields before sending (name, email, message)</p>;
        } else {
          sendEmail();
          return;
        }
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        response = <p className="text-red-400">❌ Unknown command. Type <code>help</code></p>;
    }

    setHistory(prev => [...prev, { command: value, output: response }]);
    setInput('');
  };

  return (
    <motion.section
      className="contact min-h-screen p-6 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Contact Me</h1>
      <div className="bg-black rounded-lg border border-green-500  p-5 max-w-2xl mx-auto">
        <div className="p-4 md:p-6 shadow-xl">
          <div className="text-green-400 font-mono mb-2">~/contact-terminal</div>
          <div className="text-gray-400 mb-3 font-mono text-sm">Type <code className="text-green-300">help</code> to see available commands</div>

          <div className="space-y-4 mb-4 font-mono text-sm md:text-base">
            {history.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-blue-300">$ {entry.command}</div>
                <div className="pl-2">{entry.output}</div>
              </motion.div>
            ))}
          </div>

          <form onSubmit={handleCommand} className="flex items-center space-x-2">
            <span className="text-green-400">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              className="bg-transparent w-full outline-none text-white placeholder-gray-500 font-mono"
              placeholder="Type your command..."
            />
          </form>
        </div>
      </div>
    </motion.section>
  );
}

export default Contact;
