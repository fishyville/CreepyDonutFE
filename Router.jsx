import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './src/pages/Home';
import Menu from './src/pages/Menu';


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
    </Routes>
  );
};

export default AppRouter;
