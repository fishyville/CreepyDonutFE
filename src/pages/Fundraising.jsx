import React from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cat1 from '../assets/cat-1.png';
import cat1blue from '../assets/cat-1blue.png';
import cat2 from '../assets/cat-2.png';
import cat2blue from '../assets/cat-2blue.png';
import cat3blue from '../assets/cat-3blue.png';
import catHero from '../assets/cat-hero.png';
import catHero2 from '../assets/cat-hero2.png';
import catHero3 from '../assets/cat-hero3.png';
import cat3 from '../assets/cat3.png';
import facebookLogo from '../assets/Facebook-Logo.png';
import googleLogo from '../assets/Google-Logo.png';
import homeCard from '../assets/HomeCard.png';
import homeCard2 from '../assets/HomeCard.png';
import homeCard2Blur from '../assets/HomeCard2Blur.png';
import homeCardBlur from '../assets/HomeCardBlur.png';
import homeDonut1 from '../assets/HomeDonut-1.png';
import homeDonut2 from '../assets/HomeDonut-2.png';
import homeDonut3 from '../assets/HomeDonut-3.png';
import homeDonut4 from '../assets/HomeDonut-4.png';
import homeDonut5 from '../assets/HomeDonut-5.png';
import homeDonut6 from '../assets/HomeDonut-6.png';
import instagramLogo from '../assets/Instagram-Logo.png';
import lineLogo from '../assets/LINE-Logo.png';
import menuHero from '../assets/MenuHero.png';
import sweetsDivider from '../assets/SweetsDivider.png';
import xLogo from '../assets/X-Logo.png.webp';
import youtubeLogo from '../assets/Youtube-Logo.png';
import paw from '../assets/paw.png';
import { useState } from 'react';
import ChatBot from '../component/Chatbot';

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
        className="w-2 h-2 mx-1 rounded-full bg-white transition-all duration-300"
        style={{ opacity: '0.5' }}
      />
    ),
    dotsClass: "slick-dots flex justify-center items-center gap-2 custom-slick-dots"
  };

  const slides = [
    {
      image: catHero2,
      title: 'We Want Snacks!'
    },
    {
      image: catHero,
      title: 'We Need Shelter!'
    },
    {
      image: catHero3,
      title: 'Asking for Your Help!',
      textPosition: 'items-start justify-end pr-20 pt-32'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col pt-16">
      <Navbar />

      <div className="relative h-[400px]">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="relative h-[400px]">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 bg-opacity-40 flex ${
                  slide.textPosition && slide.title === 'Asking for Your Help!'
                    ? slide.textPosition
                    : 'items-center justify-start pl-20'
                }`}
              >
                <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold">
                  {slide.title}
                </h1>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="flex-grow bg-[#FDF6E9] p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <div className="lg:col-span-2 flex flex-col">
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

            <div className="flex-grow space-y-4">
              {[{ normal: cat1, hover: cat1blue }, { normal: cat2, hover: cat2blue }, { normal: cat3, hover: cat3blue }].map((cat, index) => {
                const [isHovered, setIsHovered] = useState(false);
                return (
                  <div key={index} className="bg-white rounded-lg shadow-md p-3 sm:p-4">
                    <img
                      src={isHovered ? cat.hover : cat.normal}
                      alt={`Cat ${index + 1}`}
                      className="w-full h-32 sm:h-45 object-cover rounded-lg transition duration-300"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center h-auto sm:h-[400px]">
              <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-6 sm:mb-8 bg-brown-600 rounded-full flex items-center justify-center">
                <img src={paw} alt="Paw" className="w-10 sm:w-20 h-10 sm:h-14" />
              </div>
              <div className="mt-8 sm:mt-12">
                <h3 className="text-xl sm:text-2xl font-bold">Rp. 2.500.000</h3>
                <p className="text-gray-600">Raised of Rp5.000.000 Target</p>
                <p className="text-sm text-gray-500 mt-1">by Supporters</p>
              </div>
              <a 
                href="https://www.aspca.org/donate"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <button className="w-full bg-[#E2BE8C] text-white py-2 sm:py-3 rounded-lg mt-4 hover:bg-[#4A2B1B] transition-colors duration-300">
                  Donate Now!
                </button>
              </a>
              <a 
                href="https://www.aspca.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <button className="w-full text-gray-600 py-2 mt-2 hover:text-gray-800">
                  Share Page
                </button>
              </a>
            </div>

            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg h-auto sm:h-[676px] shadow-md">
  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 border-b pb-2">Supporters</h2>
  <div className="space-y-3 sm:space-y-4">
    {Array(5).fill(0).map((_, i) => (
      <div key={i} className="bg-white rounded-lg shadow p-3 sm:p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          
          <img
            src={`https://randomuser.me/api/portraits/women/1.jpg`} 
            alt="Supporter"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-gray-800 text-sm sm:text-base">Jane Doe</p>
            <p className="text-xs sm:text-sm text-red-600">Has Contributed</p>
          </div>
        </div>
        <span className="font-bold text-gray-800 text-sm sm:text-base">Rp500.000</span>
      </div>
    ))}
  </div>

<div className="text-center mt-4 sm:mt-5">
  <p className="text-xs sm:text-sm mb-3 sm:mb-4 font-medium">Check out other fundraisers here!</p>
  <div className="flex justify-center gap-3 sm:gap-4">
    {[
      {
        href: "#",
        color: "text-[#1877F2]",
        logo: facebookLogo,
        alt: "Facebook",
        imgClass: "w-8 h-8 sm:w-7 sm:h-7" 
      },
      {
        href: "#",
        color: "text-black",
        logo: xLogo,
        alt: "X",
        imgClass: "w-7 h-7 sm:w-10 sm:h-10" 
      },
      {
        href: "#",
        color: "text-[#FF0000]",
        logo: youtubeLogo,
        alt: "YouTube",
        imgClass: "w-9 h-9 sm:w-8 sm:h-8" 
      },
      {
        href: "#",
        color: "text-[#E4405F]",
        logo: instagramLogo,
        alt: "Instagram",
        imgClass: "w-8 h-8 sm:w-20 sm:h-20" 
      }
    ].map((item, idx) => (
      <a key={item.alt} href={item.href} className={item.color}>
        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white shadow">
          <img
            src={item.logo}
            alt={item.alt}
            className={`${item.imgClass} object-contain aspect-square`}
          />
        </div>
      </a>
    ))}
  </div>
</div>
            </div>
          </div>
        </div>
      </div>
    <ChatBot />
      <Footer />
    </div>
  );
}

export default Fundraising;
