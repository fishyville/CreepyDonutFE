import React, { useState, useEffect } from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

function Menu() {
  const [menuData, setMenuData] = useState({
    donut: [],
    drink: [],
    merch: []
  });
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://localhost:7002/api/products');
        const data = await response.json();
        
        // Organize products by categoryId
        const organizedData = data.reduce((acc, product) => {
          // Map categoryId to category name
          const categoryMap = {
            1: 'donut',
            2: 'drink',
            3: 'merch'
          };
          
          const category = categoryMap[product.categoryId];
          if (!acc[category]) {
            acc[category] = [];
          }
          
          acc[category].push({
            id: product.productId,
            name: product.name,
            price: product.price,
            image: product.imageUrl,
            description: product.description,
            quantity: product.quantity
          });
          
          return acc;
        }, {});

        setMenuData(organizedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getFilteredItems = () => {
    if (activeCategory === 'all') {
      return Object.values(menuData).flat();
    }
    return menuData[activeCategory] || [];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f3e7]">
        <div className="text-[#4a2b1b] text-2xl">Loading...</div>
      </div>
    );
  }

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
          <div className="flex flex-col items-center mb-8">
            <h2 className="font-['Jua'] font-bold text-[55px] text-[#4a2b1b] mb-4">
              Our Menu
            </h2>
            <div className="flex items-center justify-center w-[262px]">
              <div className="w-24 h-[2px] bg-[#4a2b1b]" />
              <div className="w-5 h-5 rounded-full border-2 border-[#4a2b1b] mx-4" />
              <div className="w-24 h-[2px] bg-[#4a2b1b]" />
            </div>
          </div>

          <div className="flex justify-center gap-8 mb-8">
            <button 
              onClick={() => setActiveCategory('all')}
              className={`px-12 py-2.5 rounded-full font-['Jua'] text-[25px] ${
                activeCategory === 'all' 
                  ? 'bg-transparent text-[#4a2b1b] border-2 border-[#4a2b1b]' 
                  : 'text-[#4a2b1b]'
              }`}
            >
              All
            </button>
            {['donut', 'drink', 'merch'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-12 py-2.5 rounded-full font-['Jua'] text-[25px] capitalize ${
                  activeCategory === category 
                    ? 'bg-transparent text-[#4a2b1b] border-2 border-[#4a2b1b]' 
                    : 'text-[#4a2b1b]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="w-full max-w-6xl mx-auto">
            {/* Only show category title when not showing all items */}
            {activeCategory !== 'all' && (
              <div className="mb-8">
                <h3 className="font-['Jua'] text-[45px] text-[#4a2b1b] capitalize">
                  {activeCategory}
                </h3>
                <div className="w-[200px] h-[2px] bg-[#4a2b1b] mt-2" />
              </div>
            )}

            {/* Grid Items */}
            {activeCategory === 'all' ? (
              <>
                {Object.entries(menuData).map(([category, items]) => (
                  <div key={category} className="mb-16">
                    <div className="mb-8">
                      <h3 className="font-['Jua'] text-[45px] text-[#4a2b1b] capitalize">
                        {category}
                      </h3>
                      <div className="w-[200px] h-[2px] bg-[#4a2b1b] mt-2" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                      {items.map((item) => (
                        <div 
                          key={item.id} 
                          className="w-[206px] h-[223px] relative group flex flex-col"
                        >
                          {/* Normal state */}
                          <div className="flex flex-col items-center h-full">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-[133px] h-[126px] object-cover mt-2" // Adjusted image size and added top margin
                            />
                            <h3 className="text-xl font-semibold text-[#4a2b1b] mt-3">{item.name}</h3>
                            <div className="flex items-center mt-2">
                              <span className="text-xs text-[#4a2b1b]">Price:</span>
                              <span className="font-bold text-lg text-[#4a2b1b] ml-1">Rp {item.price.toLocaleString()}</span>
                            </div>
                          </div>

                          {/* Hover state overlay */}
                          <div className="absolute inset-0 bg-black flex flex-col p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-[#e3c295] text-sm">
                              {item.description}
                            </p>
                            <button 
                              className="bg-[#926d4b] text-[#e3c295] px-4 py-1.5 rounded-[20px] hover:bg-opacity-90 transition-colors w-fit mt-auto"
                              onClick={() => {/* Add your cart logic here */}}
                            >
                              add to cart+
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              // When showing a specific category, display items normally
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {getFilteredItems().map((item) => (
                  <div 
                    key={item.id} 
                    className="w-[206px] h-[223px] relative group flex flex-col"
                  >
                    {/* Normal state */}
                    <div className="flex flex-col items-center h-full">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-[133px] h-[126px] object-cover mt-2" // Adjusted image size and added top margin
                      />
                      <h3 className="text-xl font-semibold text-[#4a2b1b] mt-3">{item.name}</h3>
                      <div className="flex items-center mt-2">
                        <span className="text-xs text-[#4a2b1b]">Price:</span>
                        <span className="font-bold text-lg text-[#4a2b1b] ml-1">Rp {item.price.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Hover state overlay */}
                    <div className="absolute inset-0 bg-black flex flex-col p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-[#e3c295] text-sm">
                        {item.description}
                      </p>
                      <button 
                        className="bg-[#926d4b] text-[#e3c295] px-4 py-1.5 rounded-[20px] hover:bg-opacity-90 transition-colors w-fit mt-auto"
                        onClick={() => {/* Add your cart logic here */}}
                      >
                        add to cart+
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Menu;