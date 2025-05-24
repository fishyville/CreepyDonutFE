import React from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import Navbar from '../component/Navbar'; // Import the Navbar component
import Footer from '../component/Footer'; // Import the Footer component
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Fundraising() {
  const userId = localStorage.getItem('userId');
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    appendDots: dots => (
      <div style={{ position: 'absolute', bottom: '20px', width: '100%' }}>
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div 
        className="w-2 h-2 mx-1 rounded-full bg-white transition-all duration-300 hover:bg-[#FEAEAE] hover:shadow-[0_0_10px_#FEAEAE]" 
        style={{ opacity: '0.5' }}
      >
      </div>
    ),
    dotsClass: "slick-dots flex justify-center items-center gap-2"
  };

  const slides = [
    {
      image: '/cat-hero.jpg',
      title: 'Asking for Your Help!'
    },
    {
      image: '/cat-hero-2.jpg',
      title: 'We Want Snacks!'
    },
    {
      image: '/cat-hero-3.jpg',
      title: 'We Need Shelter!'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Slider */}
      <div className="relative h-[400px]">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="relative h-[400px]">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-purple-200 bg-opacity-40 flex items-center justify-start pl-20">
                <h1 className="text-white text-5xl font-bold">{slide.title}</h1>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-[#FDF6E9] p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 flex flex-col">
            {/* Hero Message Box */}
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md mb-4 md:mb-8 h-auto md:h-[400px] flex flex-col">
              <div className="space-y-8 md:space-y-16">
                <div>
                  <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold font-mono mb-4 md:mb-6">BE A HERO FOR THEM!</h2>
                  <div className="h-[3px] bg-blue-200 w-full"></div>
                  <p className="text-xl sm:text-2xl font-mono mb-8 md:mb-16">Help us raise funds for a new animal shelter.</p>
                </div>
                <p className="text-lg sm:text-xl md:text-2xl font-mono leading-relaxed">
                  Donating to an animal shelter helps provide food, medical care,
                  and safe shelter for abandoned and abused animals, giving them a
                  second chance at life and the opportunity to find loving homes.
                </p>
              </div>
            </div>

            {/* Cat Images Section */}
            <div className="flex-grow space-y-4">
              <div className="bg-white rounded-lg shadow-md p-3 sm:p-4">
                <img src="/cat-1.jpg" alt="Cat" className="w-full h-32 sm:h-45 object-cover rounded-lg" />
              </div>
              <div className="bg-white rounded-lg shadow-md p-3 sm:p-4">
                <img src="/cat-2.jpg" alt="Cat" className="w-full h-32 sm:h-45 object-cover rounded-lg" />
              </div>
              <div className="bg-white rounded-lg shadow-md p-3 sm:p-4">
                <img src="/cat-3.jpg" alt="Cat" className="w-full h-32 sm:h-45 object-cover rounded-lg" />
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {/* Donation Box */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center h-auto sm:h-[400px]">
              <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-6 sm:mb-8 bg-brown-600 rounded-full flex items-center justify-center">
                <img src="/paw-icon.png" alt="Paw" className="w-10 sm:w-12 h-10 sm:h-12" />
              </div>
              <div className="mt-8 sm:mt-12">
                <h3 className="text-xl sm:text-2xl font-bold">Rp. 2.500.000</h3>
                <p className="text-gray-600">Raised of Rp5.000.000 Target</p>
                <p className="text-sm text-gray-500 mt-1">by Supporters</p>
              </div>
              <button className="w-full bg-[#E2BE8C] text-white py-2 sm:py-3 rounded-lg mt-4 hover:bg-[#4A2B1B] transition-colors duration-300">
                Donate Now!
              </button>
              <button className="w-full text-gray-600 py-2 mt-2 hover:text-gray-800">
                Share Page
              </button>
            </div>

            {/* Supporters List */}
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg h-auto sm:h-[676px] shadow-md">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 border-b pb-2">Supporters</h2>
              <div className="space-y-3 sm:space-y-4">
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow p-3 sm:p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm sm:text-base">Jane Doe</p>
                        <p className="text-xs sm:text-sm text-red-600">Has Contributed</p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-800 text-sm sm:text-base">Rp500.000</span>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="text-center mt-4 sm:mt-5">
                <p className="text-xs sm:text-sm mb-3 sm:mb-4 font-medium">Check out other fundraisers here!</p>
                <div className="flex justify-center gap-3 sm:gap-4">
                  <a href="#" className="text-[#1877F2]">
                    <img src="/facebook-icon.png" alt="Facebook" className="w-6 h-6 sm:w-8 sm:h-8" />
                  </a>
                  <a href="#" className="text-black">
                    <img src="/x-icon.png" alt="X" className="w-6 h-6 sm:w-8 sm:h-8" />
                  </a>
                  <a href="#" className="text-[#FF0000]">
                    <img src="/youtube-icon.png" alt="YouTube" className="w-6 h-6 sm:w-8 sm:h-8" />
                  </a>
                  <a href="#" className="text-[#E4405F]">
                    <img src="/instagram-icon.png" alt="Instagram" className="w-6 h-6 sm:w-8 sm:h-8" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Fundraising;