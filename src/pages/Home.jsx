'use client';

import React from 'react';
import './App.css';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import ReactLenis from 'lenis/react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <ReactLenis root>
      <div className="min-h-screen bg-amber-50">
        <Navbar />

        {/* Hero Section */}
        <section className="bg-[#857062] from-amber-100 to-orange-100 py-20 px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-amber-900 mb-4">
              Dare to Taste the Difference.
            </h1>
            <p className="text-xl text-amber-700 mb-8">
              Go try out some creeps now!
            </p>
            <button
              className="bg-amber-200 hover:bg-amber-300 text-amber-900 px-8 py-3 rounded-full font-semibold transition-colors"
              onClick={() => navigate('/menu')}
            >
              To the Menu →
            </button>
          </div>
        </section>

        {/* Carousel Donut */}
        <section className="py-12 px-8 bg-amber-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-amber-900 mb-4">
                <div className="max-w-5xl mx-auto flex justify-center gap-4 overflow-x-auto mb-12">
                  <div className="w-48 h-48 rounded-xl overflow-hidden shadow-lg flex-shrink-0 bg-white flex items-center justify-center">
                    <img src="/img/donut1.jpg" alt="gambar" className="object-cover w-full h-full" />
                  </div>
                  <div className="w-48 h-48 rounded-xl overflow-hidden shadow-lg flex-shrink-0 bg-white flex items-center justify-center">
                    <img src="/img/donut2.jpg" alt="gambar" className="object-cover w-full h-full" />
                  </div>
                  <div className="w-48 h-48 rounded-xl overflow-hidden shadow-lg flex-shrink-0 bg-white flex items-center justify-center">
                    <img src="/img/donut3.jpg" alt="gambar" className="object-cover w-full h-full" />
                  </div>
                  <div className="w-48 h-48 rounded-xl overflow-hidden shadow-lg flex-shrink-0 bg-white flex items-center justify-center">
                    <img src="/img/donut4.jpg" alt="gambar" className="object-cover w-full h-full" />
                  </div>
                  <div className="w-48 h-48 rounded-xl overflow-hidden shadow-lg flex-shrink-0 bg-white flex items-center justify-center">
                    <img src="/img/donut5.jpg" alt="gambar" className="object-cover w-full h-full" />
                  </div>
                </div>
                <span className="italic">Donuts</span>
              </h2>
              <p className="text-amber-700">
                Why Settle for Sweet When You Can Have Sinister?
              </p>
            </div>

            {/* Unique Selling Point */}
            <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="space-y-6">
                <div className="bg-amber-100 p-6 rounded-lg">
                  <div className="w-12 h-12 bg-amber-300 rounded-full mb-4 flex items-center justify-center">
                    <div className="w-6 h-6 bg-amber-600 rounded-full"></div>
                  </div>
                  <h3 className="font-bold text-amber-900 mb-2">Unique Flavor</h3>
                  <p className="text-sm text-amber-700">
                    Unexpected and bold flavor combinations that surprise your taste buds with a hint of spooky.
                  </p>
                </div>
                <div className="bg-amber-100 p-6 rounded-lg">
                  <div className="w-12 h-12 bg-amber-300 rounded-full mb-4 flex items-center justify-center">
                    <div className="w-6 h-6 bg-amber-600 rounded-full"></div>
                  </div>
                  <h3 className="font-bold text-amber-900 mb-2">Visual Appeal</h3>
                  <p className="text-sm text-amber-700">
                    Striking designs with creepy cool or horror-themed decorations that grab attention and go viral on social media.
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-amber-50 rounded-full"></div>
                  </div>
                  <div className="absolute -top-8 -right-8">
                    <svg width="60" height="60" className="text-amber-600">
                      <path d="M10 30 Q30 10 50 30" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5,5"/>
                    </svg>
                  </div>
                  <div className="absolute -bottom-8 -left-8">
                    <svg width="40" height="40" className="text-amber-600">
                      <path d="M5 20 Q20 5 35 20" stroke="currentColor" strokeWidth="3" fill="none"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-amber-100 p-6 rounded-lg">
                  <div className="w-12 h-12 bg-amber-300 rounded-full mb-4 flex items-center justify-center">
                    <div className="w-6 h-6 bg-amber-600 rounded-full"></div>
                  </div>
                  <h3 className="font-bold text-amber-900 mb-2">Brand Identity</h3>
                  <p className="text-sm text-amber-700">
                    A mysterious, edgy, or playful brand persona that stands out from traditional donut shops.
                  </p>
                </div>
                <div className="bg-amber-100 p-6 rounded-lg">
                  <div className="w-12 h-12 bg-amber-300 rounded-full mb-4 flex items-center justify-center">
                    <div className="w-6 h-6 bg-amber-600 rounded-full"></div>
                  </div>
                  <h3 className="font-bold text-amber-900 mb-2">Emotional Hook</h3>
                  <p className="text-sm text-amber-700">
                    Creates curiosity and excitement — "Dare to try" — making it an experience not just a snack.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Le Chuchoteur & Exciting Offers */}
        <section className="py-16 px-8" style={{ background: "#F2D9B1" }}>
          <div className="max-w-6xl mx-auto">
            <div className="bg-white bg-opacity-90 rounded-lg overflow-hidden flex flex-col lg:flex-row shadow-2xl">
              {/* Left: Le Chuchoteur with French flag and decorative donuts */}
              <div className="relative flex-1 min-w-[300px] h-[430px] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-white to-red-500">
                {/* French flag background pattern */}
                <div className="absolute inset-0 flex">
                  <div className="w-1/3 bg-blue-600"></div>
                  <div className="w-1/3 bg-white"></div>
                  <div className="w-1/3 bg-red-500"></div>
                </div>
                
                {/* Decorative donut pattern overlay */}
                <div className="absolute inset-0 opacity-30 z-10">
                  {/* Multiple donut images scattered */}
                  <div className="absolute top-4 left-4 w-16 h-16 rounded-full overflow-hidden transform rotate-12">
                    <div className="w-full h-full bg-white border-4 border-gray-200 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute top-8 right-6 w-12 h-12 rounded-full overflow-hidden transform -rotate-45">
                    <div className="w-full h-full bg-pink-200 border-2 border-pink-300 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-pink-300 rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-12 left-8 w-14 h-14 rounded-full overflow-hidden transform rotate-45">
                    <div className="w-full h-full bg-yellow-200 border-3 border-yellow-300 rounded-full flex items-center justify-center">
                      <div className="w-5 h-5 bg-yellow-300 rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-6 right-4 w-10 h-10 rounded-full overflow-hidden transform -rotate-12">
                    <div className="w-full h-full bg-green-200 border-2 border-green-300 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-green-300 rounded-full"></div>
                    </div>
                  </div>
                  {/* Eyes scattered around */}
                  <div className="absolute top-16 left-12 w-8 h-8 bg-white rounded-full border-2 border-gray-800 flex items-center justify-center">
                    <div className="w-3 h-3 bg-black rounded-full"></div>
                  </div>
                  <div className="absolute top-24 right-16 w-6 h-6 bg-white rounded-full border-2 border-gray-800 flex items-center justify-center">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  </div>
                  <div className="absolute bottom-20 left-16 w-7 h-7 bg-white rounded-full border-2 border-gray-800 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                  </div>
                </div>

                {/* Diagonal ribbon */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  <div 
                    className="absolute top-16 -left-8 w-80 h-12 bg-amber-200 border-2 border-amber-300 shadow-lg transform -rotate-12 flex items-center justify-center"
                    style={{ transformOrigin: 'center' }}
                  >
                    <span className="text-amber-900 font-bold text-sm tracking-wide">
                      Donut that whispers your cravings
                    </span>
                  </div>
                </div>

                {/* Main title */}
                <div className="relative z-30 text-center bg-white bg-opacity-95 rounded-lg p-6 shadow-xl border-4 border-amber-300">
                  <h4 className="text-3xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'cursive' }}>
                    Le Chuchoteur
                  </h4>
                  <p className="text-sm text-gray-600 italic">(The Whisperer)</p>
                </div>
              </div>

              {/* Right: Exciting Offers */}
              <div className="flex-1 min-w-[300px] flex flex-col justify-between bg-gradient-to-br from-amber-50 to-amber-100 p-8 relative">
                {/* Curved decorative shape */}
                <div className="absolute left-0 top-0 w-full h-full pointer-events-none z-0 opacity-20">
                  <svg viewBox="0 0 400 400" className="w-full h-full" preserveAspectRatio="none">
                    <path d="M0,100 Q200,50 400,150 L400,400 L0,400 Z" fill="#f59e0b" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <h4 className="text-3xl font-bold text-amber-900 mb-3">Exciting Offers</h4>
                  <p className="text-amber-700 mb-6 text-base">
                    Shop now to get 2 extra dozens of Doughnuts
                  </p>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  {/* Stack of donuts */}
                  <div className="mb-6 relative">
                    <div className="flex flex-col items-center space-y-2">
                      {/* Top donut */}
                      <div className="w-32 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-lg relative overflow-hidden">
                        <div className="absolute inset-2 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                          <div className="w-8 h-8 bg-yellow-200 rounded-full"></div>
                        </div>
                        {/* Sprinkles */}
                        <div className="absolute top-2 left-4 w-1 h-3 bg-red-400 rounded transform rotate-45"></div>
                        <div className="absolute top-3 right-6 w-1 h-3 bg-blue-400 rounded transform -rotate-12"></div>
                        <div className="absolute bottom-2 left-8 w-1 h-3 bg-green-400 rounded transform rotate-12"></div>
                      </div>
                      {/* Middle donut */}
                      <div className="w-32 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-lg relative overflow-hidden -mt-4">
                        <div className="absolute inset-2 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                          <div className="w-8 h-8 bg-yellow-200 rounded-full"></div>
                        </div>
                        {/* Sprinkles */}
                        <div className="absolute top-1 left-6 w-1 h-3 bg-yellow-300 rounded transform rotate-90"></div>
                        <div className="absolute top-4 right-4 w-1 h-3 bg-purple-400 rounded transform -rotate-45"></div>
                        <div className="absolute bottom-1 left-10 w-1 h-3 bg-orange-400 rounded transform rotate-30"></div>
                      </div>
                      {/* Bottom donut */}
                      <div className="w-32 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-lg relative overflow-hidden -mt-4">
                        <div className="absolute inset-2 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                          <div className="w-8 h-8 bg-yellow-200 rounded-full"></div>
                        </div>
                        {/* Sprinkles */}
                        <div className="absolute top-2 left-5 w-1 h-3 bg-cyan-400 rounded transform -rotate-30"></div>
                        <div className="absolute top-1 right-8 w-1 h-3 bg-red-300 rounded transform rotate-60"></div>
                        <div className="absolute bottom-3 left-12 w-1 h-3 bg-lime-400 rounded transform -rotate-15"></div>
                      </div>
                    </div>
                    {/* Scattered mini sprinkles around the stack */}
                    <div className="absolute -top-2 -left-4 w-2 h-4 bg-red-400 rounded transform rotate-45"></div>
                    <div className="absolute top-4 -right-3 w-1 h-3 bg-blue-500 rounded transform -rotate-30"></div>
                    <div className="absolute bottom-2 -left-2 w-1 h-4 bg-green-500 rounded transform rotate-75"></div>
                    <div className="absolute -bottom-1 -right-4 w-2 h-3 bg-purple-500 rounded transform -rotate-60"></div>
                  </div>

                  <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all duration-300 text-base font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl">
                    <span>Order Now</span>
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 12h14m-7-7 7 7-7 7"/>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pick Me Up Edition */}
        <section className="py-16 px-8" style={{ background: "#3B2E25" }}>
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-2" style={{ color: "#F2D9B1" }}>Pick Me Up</h3>
            <p className="text-xl italic mb-12" style={{ color: "#F2D9B1" }}>~edition~</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                  <div className="w-full h-64">
                    <img
                      src="/img/donut-pickmeup.jpg"
                      alt="Glazed Doughnut"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="bg-amber-50 p-4 text-left flex flex-col flex-1 justify-between">
                    <div>
                      <h4 className="font-bold text-amber-900 mb-2">Glazed Doughnut</h4>
                    </div>
                    <button className="text-amber-700 hover:text-amber-900 transition-colors text-sm mt-4 text-left">
                      Order Now →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        <section className="py-16 px-8 bg-amber-100">
          <div className="max-w-6xl mx-auto">
            <div className="border-t-4 border-amber-400 w-full mb-4"></div> {/* Garis tebal atas */}
            <h3 className="text-3xl font-bold text-center text-amber-900 mb-4 italic">
              Best Sellers
            </h3>
            <div className="border-b-4 border-amber-400 w-full mb-12"></div> {/* Garis tebal bawah */}
            <div className="flex flex-col items-center">
              <div className="flex flex-row justify-center gap-12 w-full py-8">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center border-2 border-transparent hover:border-amber-400 transition-all home-card-best"
                    style={{ width: 260, height: 260 }}
                  >
                    {/* Ganti src di bawah ini dengan gambar best seller Anda */}
                    <img
                      src=""
                      alt="Best Seller"
                      className="object-cover w-full h-full"
                      style={{ backgroundColor: "#f3f3f3" }}
                    />
                  </div>
                ))}
              </div>
              <div className="border-t border-amber-300 w-full mt-4 pt-8">
                <p className="text-xl text-amber-900 italic font-Poppins text-center">
                  "It's not just a donut — it's a dare dressed in sugar."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <section className="py-4 px-8 bg-amber-50"></section>
        <Footer />
      </div>
    </ReactLenis>
  );
}