import React, { useState } from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

function Menu() {
  // Dummy data
  const menuData = {
    food: [
      { id: 1, name: 'Slime Crust', price: 70000, image: '/images/donut1.jpg' },
      { id: 2, name: 'Ghost Donut', price: 70000, image: '/images/donut2.jpg' },
      { id: 3, name: 'Zombie Bite', price: 70000, image: '/images/donut3.jpg' },
      { id: 4, name: 'Vampire Velvet', price: 70000, image: '/images/donut4.jpg' },
      { id: 5, name: 'Witch Sprinkles', price: 70000, image: '/images/donut5.jpg' },
    ],
    drink: [
      { id: 6, name: 'Blood Punch', price: 70000, image: '/images/drink1.jpg' },
      { id: 7, name: 'Witch Brew', price: 70000, image: '/images/drink2.jpg' },
      { id: 8, name: 'Ghost Tea', price: 70000, image: '/images/drink3.jpg' },
      { id: 9, name: 'Dark Mocha', price: 70000, image: '/images/drink4.jpg' },
      { id: 10, name: 'Zombie Shake', price: 70000, image: '/images/drink5.jpg' },
    ],
    merch: [
      { id: 11, name: 'Creepy Mug', price: 70000, image: '/images/merch1.jpg' },
      { id: 12, name: 'Horror Tee', price: 70000, image: '/images/merch2.jpg' },
      { id: 13, name: 'Spooky Cap', price: 70000, image: '/images/merch3.jpg' },
      { id: 14, name: 'Ghost Pin', price: 70000, image: '/images/merch4.jpg' },
      { id: 15, name: 'Donut Sticker', price: 70000, image: '/images/merch5.jpg' },
    ],
  };

  const [activeCategory, setActiveCategory] = useState('all');

  const getFilteredItems = () => {
    if (activeCategory === 'all') {
      return [...menuData.food, ...menuData.drink, ...menuData.merch];
    }
    return menuData[activeCategory] || [];
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-[#f9f3e7]">
        {/* Hero Section */}
        <div className="relative h-[300px] bg-cover bg-center" 
             style={{ backgroundImage: "url('/images/menu-hero.jpg')" }}>
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-bold mb-2">Creepy Donut</h1>
            <p className="text-2xl">Food & Drinks</p>
          </div>
        </div>

        {/* Menu Navigation */}
        <div className="max-w-6xl mx-auto py-8">
          <h2 className="text-3xl font-bold text-center text-[#4a2b1b] mb-6">Our Menu</h2>
          <div className="flex justify-center gap-4 mb-8">
            <button 
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-2 rounded-full ${
                activeCategory === 'all' 
                  ? 'bg-[#4a2b1b] text-[#f2d9b1]' 
                  : 'bg-[#f2d9b1] text-[#4a2b1b]'
              }`}
            >
              All
            </button>
            {['food', 'drink', 'merch'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full capitalize ${
                  activeCategory === category 
                    ? 'bg-[#4a2b1b] text-[#f2d9b1]' 
                    : 'bg-[#f2d9b1] text-[#4a2b1b]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4">
            {getFilteredItems().map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#4a2b1b]">{item.name}</h3>
                  <p className="text-[#4a2b1b] mt-2">Rp {item.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Menu;