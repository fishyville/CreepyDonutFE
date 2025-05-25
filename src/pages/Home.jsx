import React from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import ChatPopup from "../component/ChatPopup";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navbar />

      <main className="flex-grow">
        <div className="px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-[#4a2b1b]">Hello Albert!</h1>
          {/* Konten utama lain bisa ditambahkan di sini */}
        </div>
      </main>

      <Footer />

      {/* Komponen chat popup */}
      <ChatPopup />
    </div>
  );
};

export default Home;
