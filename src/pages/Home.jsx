import React from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import Navbar from '../component/Navbar'; // Import the Navbar component

function App() {
  return (
    <>
      {/* Add the Navbar component at the top */}
      <Navbar />
      
      {/* Your existing content */}
      <div className="p-8">
        <h1 className="text-3xl font-bold">
          Hello world!
        </h1>
      </div>
    </>
  );
}

const root = document.getElementById('root');
createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);