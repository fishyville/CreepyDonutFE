import React from 'react';
import './App.css';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold">
          Hello Albert!
        </h1>
      </div>
      <Footer />
    </div>
  );
}

export default Home;