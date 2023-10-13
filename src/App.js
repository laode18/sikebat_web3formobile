import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import Layout from './Layout';
import Register from './register/Register';
import Registernext from './register/Registernext';
import Suratkependudukan from './surat/suratkependudukan/Suratkependudukan';

const Loginuser = React.lazy(() => import('./loginuser/Loginuser'))

const App = () => {
  const [activeMenu, setActiveMenu] = useState('menu1');

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/login" element={<Loginuser />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registernext" element={<Registernext />} />
          <Route path="/suratkependudukan" element={<Suratkependudukan />} />
        </Routes>
    </Router>
    </div>
  );
};

export default App;