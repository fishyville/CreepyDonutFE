import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './src/pages/Home';
import Menu from './src/pages/Menu';
import Cart from './src/pages/Cart'; 
import Login from './src/pages/Login';
import Fundraising from './src/pages/Fundraising';
import Register from './src/pages/Register';
import ResetPassword from './src/pages/ResetPassword';
import Order from './src/pages/Orders';
import Account from './src/pages/Account';
import History from './src/pages/History';
import AboutUs from './src/pages/About';

const AppRouter = () => {
  return (
    <div className="overflow-x-hidden max-w-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/fundraising" element={<Fundraising />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/account" element={<Account />} />
        <Route path="/history" element={<History />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
