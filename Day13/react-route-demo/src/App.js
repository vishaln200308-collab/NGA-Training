import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import About from './pages/about';
import Contactus from './pages/contactus';
import Home from './pages/home';


function App() {
  return (

    
    <div className="app">
      <nav style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
        <NavLink to="/" end style={({isActive})=>({marginRight:12, color: isActive? 'blue':'black'})}>Home</NavLink>
        <NavLink to="/about" style={({isActive})=>({marginRight:12, color: isActive? 'blue':'black'})}>About</NavLink>
        <NavLink to="/contactus" style={({isActive})=>({marginRight:12, color: isActive? 'blue':'black'})}>contactus</NavLink>
        <NavLink to="/user/42" style={({isActive})=>({color: isActive? 'blue':'black'})}>User 42</NavLink>
      </nav>

      <main style={{ padding: 12 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<Contactus />} />
          {/* <Route path="/user/:id" element={<User />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
    </div>


    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
