import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './src/pages/Home';
import Menu from './src/pages/Menu';
import Cart from './src/pages/Cart'; // Add this import

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default AppRouter;
