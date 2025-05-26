'use client';

import React from 'react';
import './App.css';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import ReactLenis from 'lenis/react';
import { useNavigate } from 'react-router-dom';
import flags from '../assets/flags.jpg';
import donuts from '../assets/donuts.jpg';
import donat from '../assets/donat.jpg';
import gula from '../assets/gula.jpg';
import pink from '../assets/pink.jpg';
import kitty from '../assets/kitty.jpg';
import meses from '../assets/meses.jpg';
import piring from '../assets/piring.jpg';
import tiramisu from '../assets/tiramisu.jpg';
import bestseller from '../assets/bestseller.jpg';



export default function Home() {
  const navigate = useNavigate();

  return (
    <ReactLenis root options={{ 
      lerp: 0.1, 
      duration: 1.2, 
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false
    }}>
      <div className="min-h-screen" style={{ backgroundColor: '#F2D9B1' }}>
        <Navbar />

        {/* Hero Section - Updated with background image support */}
        <section
          className="hero-section py-20 px-8 relative"
          style={{
            backgroundColor: '#F2D9B1',
            backgroundImage: 'url("/img/hero-bg.jpg")', 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Optional overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <h1 className="text-5xl font-bold mb-4" style={{ color: '#F2D9B1' }}>
              Dare to Taste the Difference.
            </h1>
            <p className="text-xl mb-8" style={{ color: '#F2D9B1' }}>
              Go try out some creeps now!
            </p>
            <button
              className="px-8 py-3 rounded-full font-semibold transition-colors"
              style={{ 
                backgroundColor: '#F2D9B1', 
                color: '#4A2B1B' 
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#E3C295'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#F2D9B1'}
              onClick={() => navigate('/menu')}
            >
              To the Menu →
            </button>
          </div>
        </section>

        {/* Carousel Donut - Enhanced background with gradient */}
        <section 
          className="py-12 px-8 relative" 
          style={{ 
            background: 'linear-gradient(135deg, #FEF2DE 0%, #F5E6CC 25%, #E8D4B0 50%, #F2D9B1 75%, #FEF2DE 100%)',
            backgroundSize: '400% 400%',
            animation: 'gradientShift 15s ease infinite'
          }}
        >
          {/* Add CSS animation for subtle background movement */}
          <style jsx>{`
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}</style>
          
          {/* Decorative pattern overlay for texture */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #D4A574 2px, transparent 2px),
                              radial-gradient(circle at 80% 50%, #E3C295 1px, transparent 1px),
                              radial-gradient(circle at 40% 20%, #C4965A 1.5px, transparent 1.5px),
                              radial-gradient(circle at 60% 80%, #B8865C 1px, transparent 1px)`,
            backgroundSize: '50px 50px, 30px 30px, 40px 40px, 60px 60px'
          }}></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4" style={{ color: '#4A2B1B' }}>
                {/* Fixed Images Section - No scrolling needed */}
                <div className="max-w-6xl mx-auto flex justify-center items-center gap-6 mb-12 flex-wrap">
                  {/* Image 1 */}
                  <div 
                    className="w-36 h-36 md:w-48 md:h-48 rounded-xl overflow-hidden shadow-lg bg-white flex items-center justify-center"
                    style={{ transform: 'rotate(-15deg)' }}
                  >
                    <img src={pink} alt="gambar" className="object-cover w-full h-full" />
                  </div>
                  
                  {/* Image 2 */}
                  <div 
                    className="w-36 h-36 md:w-48 md:h-48 rounded-xl overflow-hidden shadow-lg bg-white flex items-center justify-center"
                    style={{ transform: 'rotate(8deg)' }}
                  >
                    <img src={kitty} alt="gambar" className="object-cover w-full h-full" />
                  </div>

                  {/* Image 3 */}
                  <div 
                    className="w-36 h-36 md:w-48 md:h-48 rounded-xl overflow-hidden shadow-lg bg-white flex items-center justify-center"
                    style={{ transform: 'rotate(-5deg)' }}
                  >
                    <img src={meses} alt="gambar" className="object-cover w-full h-full" />
                  </div>
                  
                  {/* Image 4 */}
                  <div 
                    className="w-36 h-36 md:w-48 md:h-48 rounded-xl overflow-hidden shadow-lg bg-white flex items-center justify-center"
                    style={{ transform: 'rotate(12deg)' }}
                  >
                    <img src={piring} alt="gambar" className="object-cover w-full h-full" />
                  </div>
                  
                  {/* Image 5 */}
                  <div 
                    className="w-36 h-36 md:w-48 md:h-48 rounded-xl overflow-hidden shadow-lg bg-white flex items-center justify-center"
                    style={{ transform: 'rotate(-8deg)' }}
                  >
                    <img src={tiramisu} alt="gambar" className="object-cover w-full h-full" />
                  </div>
                </div>
                <span className="italic">Donuts</span>
              </h2>
              <p style={{ color: '#6B4E35' }}>
                Why Settle for Sweet When You Can Have Sinister?
              </p>
            </div>

            {/* Unique Selling Point */}
            <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="space-y-6">
                <div className="p-6 rounded-lg shadow-md" style={{ 
                  background: 'linear-gradient(135deg, #F2D9B1 0%, #E3C295 100%)',
                  border: '1px solid #D4A574'
                }}>
                  <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center shadow-inner" style={{ backgroundColor: '#E3C295' }}>
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#6B4E35' }}></div>
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: '#4A2B1B' }}>Unique Flavor</h3>
                  <p className="text-sm" style={{ color: '#6B4E35' }}>
                    Unexpected and bold flavor combinations that surprise your taste buds with a hint of spooky.
                  </p>
                </div>
                <div className="p-6 rounded-lg shadow-md" style={{ 
                  background: 'linear-gradient(135deg, #F2D9B1 0%, #E3C295 100%)',
                  border: '1px solid #D4A574'
                }}>
                  <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center shadow-inner" style={{ backgroundColor: '#E3C295' }}>
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#6B4E35' }}></div>
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: '#4A2B1B' }}>Visual Appeal</h3>
                  <p className="text-sm" style={{ color: '#6B4E35' }}>
                    Striking designs with creepy cool or horror-themed decorations that grab attention and go viral on social media.
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 rounded-full shadow-2xl" style={{ 
                    background: 'linear-gradient(135deg, #F2D9B1 0%, #E3C295 50%, #D4A574 100%)',
                    boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.1), 0 8px 32px rgba(0,0,0,0.15)'
                  }}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full shadow-inner" style={{ backgroundColor: '#FEF2DE' }}></div>
                  </div>
                  <div className="absolute -top-8 -right-8">
                    <svg width="60" height="60" style={{ color: '#6B4E35' }}>
                      <path d="M10 30 Q30 10 50 30" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5,5"/>
                    </svg>
                  </div>
                  <div className="absolute -bottom-8 -left-8">
                    <svg width="40" height="40" style={{ color: '#6B4E35' }}>
                      <path d="M5 20 Q20 5 35 20" stroke="currentColor" strokeWidth="3" fill="none"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-6 rounded-lg shadow-md" style={{ 
                  background: 'linear-gradient(135deg, #F2D9B1 0%, #E3C295 100%)',
                  border: '1px solid #D4A574'
                }}>
                  <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center shadow-inner" style={{ backgroundColor: '#E3C295' }}>
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#6B4E35' }}></div>
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: '#4A2B1B' }}>Brand Identity</h3>
                  <p className="text-sm" style={{ color: '#6B4E35' }}>
                    A mysterious, edgy, or playful brand persona that stands out from traditional donut shops.
                  </p>
                </div>
                <div className="p-6 rounded-lg shadow-md" style={{ 
                  background: 'linear-gradient(135deg, #F2D9B1 0%, #E3C295 100%)',
                  border: '1px solid #D4A574'
                }}>
                  <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center shadow-inner" style={{ backgroundColor: '#E3C295' }}>
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#6B4E35' }}></div>
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: '#4A2B1B' }}>Emotional Hook</h3>
                  <p className="text-sm" style={{ color: '#6B4E35' }}>
                    Creates curiosity and excitement — "Dare to try" — making it an experience not just a snack.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Le Chuchoteur & Exciting Offers - UPDATED */}
        <section className="py-0" style={{ backgroundColor: '#F2D9B1' }}>
          <div className="w-full flex flex-col lg:flex-row shadow-2xl min-h-[500px]">
            {/* Left: Le Chuchoteur with French flag and donut */}
            <div className="relative flex-1 w-full lg:w-1/2 h-[500px] flex flex-col overflow-hidden p-0">
              {/* French flag as image */}
              <div className="relative w-full h-40 flex-shrink-0">
                <img
                  src={flags}
                  alt="French Flag"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center' }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
                  <h4 className="text-2xl font-bold mb-3" style={{ fontFamily: 'cursive', color: '#4A2B1B', textShadow: '0 1px 4px #fff8' }}>
                    Le Chuchoteur
                  </h4>
                  <p className="text-xs italic font-bold mb-5" style={{ color: '#4A2B1B', textShadow: '0 1px 4px #fff8' }}>(The Whisperer)</p>
                </div>
              </div>

              {/* Donut image full width below the flag */}
              <div className="w-full flex-1 flex items-start justify-center p-0 m-0" style={{ backgroundColor: '#FEF2DE' }}>
                <img
                  src={donuts}
                  alt="Chocolate Donut"
                  className="w-full h-full object-cover"
                  style={{ marginTop: 0, borderRadius: 0, maxHeight: 'calc(100% - 10px)' }}
                />
              </div>
            </div>

            {/* Right: Exciting Offers with your donut image */}
            <div className="flex-1 w-full lg:w-1/2 h-[500px] flex flex-col justify-between p-8 relative" style={{ background: 'linear-gradient(135deg, #FEF2DE 0%, #F2D9B1 100%)' }}>
              <div className="absolute left-0 top-0 w-full h-full pointer-events-none z-0 opacity-20">
                <svg viewBox="0 0 400 400" className="w-full h-full" preserveAspectRatio="none">
                  <path d="M0,100 Q200,50 400,150 L400,400 L0,400 Z" fill="#E3C295" />
                </svg>
              </div>

              <div className="relative z-10">
                <h4 className="text-4xl font-bold mb-4" style={{ color: '#4A2B1B' }}>Exciting Offers</h4>
                <p className="mb-8 text-lg" style={{ color: '#6B4E35' }}>
                  Shop now to get 2 extra dozens of Doughnuts
                </p>
              </div>

              {/* Ganti stack donat dengan gambar Anda */}
              <div className="relative z-10 flex flex-col items-center">
                <img 
                  src={donat} 
                  alt="Donat Promo" 
                  className="w-56 h-56 object-cover rounded-full shadow-xl"
                  style={{ background: '#FEF2DE' }}
                />
                <button 
                  className="px-10 py-4 rounded-full transition-all duration-300 text-lg font-semibold flex items-center gap-4 shadow-lg hover:shadow-xl mt-8"
                  style={{ backgroundColor: '#000000', color: '#FEF2DE' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#3B2E25'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#000000'}
                >
                  <span>Order Now</span>
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M5 12h14m-7-7 7 7-7 7"/>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Pick Me Up Edition */}
        <section className="py-16 px-8" style={{ backgroundColor: '#3B2E25' }}>
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-2" style={{ color: '#F2D9B1' }}>Pick Me Up</h3>
            <p className="text-xl italic mb-12" style={{ color: '#F2D9B1' }}>~edition~</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                  <div className="w-full h-64">
                    <img
                      src={gula}
                      alt="Glazed Doughnut"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4 text-left flex flex-col flex-1 justify-between" style={{ backgroundColor: '#FEF2DE' }}>
                    <div>
                      <h4 className="font-bold mb-2" style={{ color: '#4A2B1B' }}>Glazed Doughnut</h4>
                    </div>
                    <button 
                      className="transition-colors text-sm mt-4 text-left"
                      style={{ color: '#6B4E35' }}
                      onMouseEnter={(e) => e.target.style.color = '#4A2B1B'}
                      onMouseLeave={(e) => e.target.style.color = '#6B4E35'}
                    >
                      Order Now →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        <section className="py-16 px-8" style={{ backgroundColor: '#F2D9B1' }}>
          <div className="max-w-6xl mx-auto">
            <div className="w-full mb-4" style={{ borderTop: '4px solid #E3C295' }}></div>
            <h3 className="text-3xl font-bold text-center mb-4 italic" style={{ color: '#4A2B1B' }}>
              Best Sellers
            </h3>
            <div className="w-full mb-12" style={{ borderBottom: '4px solid #E3C295' }}></div>
            <div className="flex flex-col items-center">
              <div className="flex flex-row justify-center gap-12 w-full py-8">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center border-2 border-transparent transition-all home-card-best"
                    style={{ 
                      width: 260, 
                      height: 260,
                      '&:hover': { borderColor: '#E3C295' }
                    }}
                    onMouseEnter={(e) => e.target.style.borderColor = '#E3C295'}
                    onMouseLeave={(e) => e.target.style.borderColor = 'transparent'}
                  >
                    <img
                      src={bestseller}
                      alt="Best Seller"
                      className="object-cover w-full h-full"
                      style={{ backgroundColor: '#D9D9D9' }}
                    />
                  </div>
                ))}
              </div>
              <div className="w-full mt-4 pt-8" style={{ borderTop: '1px solid #E3C295' }}>
                <p className="text-xl italic font-Poppins text-center" style={{ color: '#4A2B1B' }}>
                  "It's not just a donut — it's a dare dressed in sugar."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </ReactLenis>
  );
}