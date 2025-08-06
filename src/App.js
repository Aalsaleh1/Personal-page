import logo from './images/Image.png';
import './App.css';
import React, { useEffect,useContext } from 'react';
import { LangContext } from './LanguageContext';
function App() {
 
  const{language,changeLanguage,translation} = useContext(LangContext);
  useEffect(() => {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  const letters = Array(256).join("01").split("");
  const fontSize = 50;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0"; // لون الأكواد
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, i) => {
      const text = letters[Math.floor(Math.random() * letters.length)];
      const x = i * fontSize;
      ctx.fillText(text, x, y * fontSize);

      if (y * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    });
  }

  const interval = setInterval(draw, 33);
  return () => clearInterval(interval);
}, []);

  
  return (
    <div className="App">
      <canvas id="matrix-canvas"></canvas>
      <button onClick={()=>changeLanguage(language)} style={{ position: "absolute", top: 10, right: 10,background:'grey'}}>
        {language === "ar" ? "English" : "العربية"}
      </button>
      <div className='container' >
<div className='sidebar'>
<ul>
<li><a href="https://www.linkedin.com/in/abdulaziz-alsaleh-b60131196

">LinkedIn</a></li>
<li><a href="https://github.com/Aalsaleh1">GitHub</a></li>
<li><a href="mailto:abdulazizsalsaleh2@gmail.com
">Email</a></li>
</ul>
</div>

<div className='main-content'>
<img  src={logo}  className='App-logo'   />
<h1>{translation.name}</h1>
          <h2>{translation.title}</h2>
          <p>{translation.description}</p>

</div>
      </div>
       </div>
  );
}

export default App;
