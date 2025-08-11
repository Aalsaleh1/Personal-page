import logo from './images/Image.png';
import './App.css';
import React, { useEffect, useContext, useRef } from 'react';
import { LangContext } from './LanguageContext';

function App() {
  const { language, changeLanguage, translation } = useContext(LangContext);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const letters = "01".split("");
    const fontSize = 15;
    let columns = canvas.width / fontSize;
    let drops = Array(Math.floor(columns)).fill(1);

    const updateColumns = () => {
      columns = canvas.width / fontSize;
      drops = Array(Math.floor(columns)).fill(1);
    };

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F4"; // Slightly different green
      ctx.font = fontSize + "px 'Courier New'";

      drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        const x = i * fontSize;
        
        // Add some randomness to opacity
        const alpha = Math.random() * 0.5 + 0.5;
        ctx.fillStyle = `rgba(0, 255, 68, ${alpha})`;
        
        ctx.fillText(text, x, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });
    }

    updateColumns();
    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Add animation delay CSS variables for sidebar items
  useEffect(() => {
    const sidebarItems = document.querySelectorAll('.sidebar li');
    sidebarItems.forEach((item, index) => {
      item.style.setProperty('--i', index);
    });
  }, []);

  return (
    <div className="App">
      <canvas ref={canvasRef} id="matrix-canvas"></canvas>
      
      <button 
        onClick={() => changeLanguage(language)} 
        className="language-btn"
      >
        {language === "ar" ? "English" : "العربية"}
      </button>
      
      <div className='container'>
        <div className='sidebar'>
          <ul>
            <li>
              <a 
                href="https://www.linkedin.com/in/abdulaziz-alsaleh-b60131196" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a 
                href="https://github.com/Aalsaleh1" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a 
                href="mailto:abdulazizsalsaleh2@gmail.com"
              >
                Email
              </a>
            </li>
          </ul>
        </div>

        <div className='main-content'>
          <div className='content-wrapper'>
            <img src={logo} className='App-logo' alt="Profile" />
            <h1>{translation.name}</h1>
            <h2>{translation.title}</h2>
            <p>{translation.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;