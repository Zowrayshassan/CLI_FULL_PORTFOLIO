import React, { useEffect } from 'react';
import { useState } from 'react';
import Terminal from './pages/Home';


function App() {
  useEffect(() => {
    window.scrollTo(0, 0); // ensures page always starts at top
  }, []);

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'dark'; // default is dark
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div>
    <Terminal></Terminal>
    </div>
  );
}

export default App;
