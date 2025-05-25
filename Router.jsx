import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './src/pages/Home';
import Menu from './src/pages/Menu';
import Cart from './src/pages/Cart'; 
import Login from './src/pages/Login';
import Fundraising from './src/pages/Fundraising';
import Register from './src/pages/Register';
import ResetPassword from './src/pages/ResetPassword';


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/menu" element={<Menu />} />

      <Route path="/cart" element={<Cart />} />

      <Route path="/login" element={<Login />} />
      <Route path="/fundraising" element={<Fundraising />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<ResetPassword />} />

    </Routes>
  );
};

export default AppRouter;
