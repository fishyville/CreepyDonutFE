import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './src/pages/Home';
import Menu from './src/pages/Menu';
import Login from './src/pages/Login';
import Fundraising from './src/pages/Funraising';


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/login" element={<Login />} />
      <Route path="/fundraising" element={<Fundraising />} />
    </Routes>
  );
};

export default AppRouter;
