import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import About from './components/About.js';
import News from './components/News.js';
import Login from './Login/Login.js';
import logo from './images/logo.jpg';
import './css/Header.css';
import './Login/Module.js';
import Home from './components/Home.js';

function App() {
  const [textColor, setTextColor] = useState('white');

  useEffect(() => {
    const toggleColor = () => {
      setTextColor((prevColor) => (prevColor === 'white' ? 'red' : 'white'));
    };

    const interval = setInterval(toggleColor, 1500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className=''>
      <div className="headerParentDiv">
        <div className="homeLogo">
          <Link to={"/"}><img src={logo} alt='Logo'/></Link>
        </div>
        <header>
          <Link style={{ color: textColor }} to={"/About"}>About</Link>
          <Link style={{ color: textColor }} to={"/News"}>News</Link>
        </header>
      </div>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"About"} element={<About />} />
        <Route path={"News"} element={<News />} />
        <Route path={"Home"} element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
