import React from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden pt-16">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section dan itu gambar utk heronya */}
        <div className="relative h-[600px] overflow-hidden">
          <img 
            src="https://files.catbox.moe/l9p7us.png" 
            alt="Donuts Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-white text-6xl font-bold">ABOUT</h1>
              <p className="text-[#E2BE8C] text-4xl mt-4">US</p>
            </div>
          </div>
          <div className="absolute bottom-0 w-full">
            <svg viewBox="0 0 1440 120" fill="none">
              <path d="M0 120H1440V0C1440 0 1320 60 720 60C120 60 0 0 0 0V120Z" fill="#FDF6E9"/>
            </svg>
          </div>
        </div>

        {/* Logo creepy donut atas*/}
        <div className="relative">
          <div className="relative h-79 w-74 translate-y-18 left-295">
            <img
              src="https://files.catbox.moe/hc034q.png"
              alt="Decorative Donut"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-[#FDF6E9]">
          {/* Our Story Section */}
          <div className="flex flex-wrap">
            <div className="flex w-full">
              <div className="w-1/3 bg-[#AA7841] p-8 flex justify-end items-center h-[400px]">
                <div
                  className="transform -rotate-90 origin-center translate-x-16"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  <h2 className="text-4xl font-bold text-white whitespace-nowrap">
                    OUR STORY
                  </h2>
                </div>
              </div>

              <div className="w-2/3 bg-[#E2BE8C] p-6 sm:p-8 md:p-12 text-right relative h-[400px] flex items-center overflow-hidden">
                <div
                  className="max-w-full ml-auto space-y-4 text-[#4A2B1B] text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl w-full pr-2 relative z-20 overflow-y-auto max-h-[350px]"

                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  <p>
                    CreepyDonut was born from a simple but twisted idea... what if donuts could be both terrifying and tempting? A horror enthusiast with a passion for pastry, began experimenting in a small kitchen, determined to create treats that would thrill the taste buds while sending shivers down spines.
                  </p>
                  <p>
                    Donuts glazed like ghostly apparitions, sprinkled with edible "blood," and filled with surprises by blending high-quality ingredients with creativity, we developed a cult following almost overnight.
                  </p>
                  <p>
                    CreepyDonut stands as proof that even the sweetest things can have a dark side. We continue to push boundaries, one spine-tingling treat at a time, because the world deserves donuts that are as fun as they are frightening.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Row atas */}
            <div className="flex w-full">
              <div className="w-1/2 h-[300px] relative">
                <img 
                  src="https://files.catbox.moe/fhqfiz.png" 
                  alt="Creepy Donuts" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-1/2">
                <div className="h-[300px] bg-[#4A2B1B] p-8 flex items-end justify-end">
                  <h2 className="text-4xl font-bold text-white">Creepy Donut</h2>
                </div>
              </div>
            </div>
          </div>

          {/* divider sprinkler pink */}
          <div className="h-[160px] bg-[#FEAEAE] relative overflow-hidden">
            <img 
              src="https://files.catbox.moe/fm4vp3.png" 
              alt="Decorative Pattern" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Our Goal Section */}
          <div className="flex flex-col">
            <div className="flex h-[400px]">
              <div className="w-1/3 bg-[#AA7841] p-8 flex justify-end items-center">
                <div className="transform -rotate-90 origin-center translate-x-16">
                  <h2 className="text-4xl font-bold text-white whitespace-nowrap">OUR GOAL</h2>
                </div>
              </div>
              <div className="w-2/3 bg-[#E2BE8C] p-6 sm:p-8 md:p-12 flex items-center overflow-hidden">
                <p 
                  className="text-[#4A2B1B] text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed max-w-full overflow-y-auto max-h-[350px]" 
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  At Creepy Donut, our goal is to bring a frightfully fun twist to your sweet tooth. We craft donuts that are as spooky as they are delicious — from ghost-glazed classics to blood-dripped delights. Whether it's October or you're just feeling a little wicked, we're here to serve up creepy confections that turn every bite into a hauntingly tasty experience. Our mission? To make every day feel like a thrill, one donut at a time.
                </p>
              </div>
            </div>

            {/* Logo creepy donut bawah*/}
            <div className="relative z-10 right-150">
              <div className="w-68 h-58 overflow-visible mx-auto -translate-y-12">
                <img 
                  src="https://files.catbox.moe/dgxm5m.png"
                  alt="Decorative Donut"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
