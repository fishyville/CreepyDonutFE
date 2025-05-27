import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import menuHero from '../assets/MenuHero.png';

function Menu() {
  // Get userId from localStorage
  const userId = localStorage.getItem('userId');
  console.log(userId);
  // Now you can use userId in this component

  const [menuData, setMenuData] = useState({
    donut: [],
    drink: [],
    merch: []
  });
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('search')?.toLowerCase();

  const fetchCartCount = async () => {
    try {
      const res = await fetch(`https://localhost:7002/api/cart/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch cart');
      const data = await res.json();
      const itemCount = data.items ? data.items.length : 0;
      setCartCount(itemCount);
      console.log('Cart count updated:', itemCount); // Debug log
    } catch (err) {
      console.error('Error fetching cart:', err);
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://localhost:7002/api/products');
        const data = await response.json();
        const organizedData = data.reduce((acc, product) => {
          const categoryMap = { 1: 'donut', 2: 'drink', 3: 'merch' };
          const category = categoryMap[product.categoryId];
          if (!acc[category]) acc[category] = [];
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
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getFilteredItems = () => {
    let items = [];
    
    if (activeCategory === 'all') {
      items = Object.values(menuData).flat();
    } else {
      items = menuData[activeCategory] || [];
    }

    // Filter items based on search query
    if (searchQuery) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchQuery) || 
        item.description.toLowerCase().includes(searchQuery)
      );
    }

    return items;
  };

  // Update addToCart function to include userId
const addToCart = async (productId) => {
  if (!userId) {
    setShowLoginPopup(true);
    return;
  }

  setIsAddingToCart(true);
  try {
    const response = await fetch(
      `https://localhost:7002/api/cart/${userId}/add-product`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: productId,
          quantity: 1
        }),
      }
    );

    if (!response.ok) {
      console.error('Failed to add to cart');
      return;
    }

    await fetchCartCount();
    window.dispatchEvent(new Event('cartUpdated'));

  } catch (err) {
    console.error('Error:', err);
  } finally {
    setIsAddingToCart(false);
  }
};

  useEffect(() => {
    if (searchQuery) {
      setActiveCategory('all');
    }
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f3e7]">
        <div className="text-[#4a2b1b] text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartCount={cartCount} />
      <div className="flex-1 bg-[#f9f3e7]">
        {/* Hero Section */}
        <div className="relative h-[300px]">
          <img
            src={menuHero}
            alt="Menu Hero"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            style={{ zIndex: 0 }}
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white" style={{ zIndex: 1 }}>
            <h1 className="text-4xl text-[#E3C295] font-bold mb-2">Creepy Donut</h1>
            <p className="text-5xl">--- Food & Drinks ---</p>
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
            <div className="overflow-x-auto mb-8 px-4 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex gap-4 md:gap-8 justify-start md:justify-center flex-nowrap w-max md:w-full">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-8 py-2.5 rounded-full font-['Jua'] text-[20px] md:text-[25px] whitespace-nowrap ${
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
                    className={`px-8 py-2.5 rounded-full font-['Jua'] text-[20px] md:text-[25px] capitalize whitespace-nowrap ${
                      activeCategory === category
                        ? 'bg-transparent text-[#4a2b1b] border-2 border-[#4a2b1b]'
                        : 'text-[#4a2b1b]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Grid */}
          <div className="w-full max-w-6xl mx-auto">
            {activeCategory !== 'all' && (
              <div className="mb-8">
                <h3 className="font-['Jua'] text-[45px] text-[#4a2b1b] capitalize">
                  {activeCategory}
                </h3>
                <div className="w-[200px] h-[2px] bg-[#4a2b1b] mt-2" />
              </div>
            )}

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
                          <div className="flex flex-col items-center h-full">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-[133px] h-[126px] object-cover mt-2"
                            />
                            <h3 className="text-xl font-semibold text-[#4a2b1b] mt-3">{item.name}</h3>
                            <div className="flex items-center mt-2">
                              <span className="text-xs text-[#4a2b1b]">Price:</span>
                              <span className="font-bold text-lg text-[#4a2b1b] ml-1">Rp {item.price.toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-black flex flex-col p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-[#e3c295] text-sm">
                              {item.description}
                            </p>
                            <button
                              className="bg-[#926d4b] text-[#e3c295] px-4 py-1.5 rounded-[20px] hover:bg-opacity-90 transition-colors w-fit mt-auto"
                              onClick={() => addToCart(item.id)}
                              disabled={isAddingToCart}
                            >
                              {isAddingToCart ? 'Adding...' : 'add to cart+'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {getFilteredItems().map((item) => (
                  <div
                    key={item.id}
                    className="w-[206px] h-[223px] relative group flex flex-col"
                  >
                    <div className="flex flex-col items-center h-full">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-[133px] h-[126px] object-cover mt-2"
                      />
                      <h3 className="text-xl font-semibold text-[#4a2b1b] mt-3">{item.name}</h3>
                      <div className="flex items-center mt-2">
                        <span className="text-xs text-[#4a2b1b]">Price:</span>
                        <span className="font-bold text-lg text-[#4a2b1b] ml-1">Rp {item.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black flex flex-col p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-[#e3c295] text-sm">
                        {item.description}
                      </p>
                      <button
                        className="bg-[#926d4b] text-[#e3c295] px-4 py-1.5 rounded-[20px] hover:bg-opacity-90 transition-colors w-fit mt-auto"
                        onClick={() => addToCart(item.id)}
                        disabled={isAddingToCart}
                      >
                        {isAddingToCart ? 'Adding...' : 'add to cart+'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {showLoginPopup && (
      <div className="fixed inset-0 backdrop-blur-[10px] flex items-center justify-center z-50">
        <div className="bg-[#fffaf0] rounded-2xl shadow-xl p-6 max-w-md w-full text-center border-2 border-[#4a2b1b]">
          <h2 className="text-2xl font-bold text-[#4a2b1b] mb-4">Not Logged In</h2>
          <p className="text-[#4a2b1b] mb-6">Please log in to add items to your cart.</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowLoginPopup(false)}
              className="px-4 py-2 rounded-full bg-white text-[#4a2b1b] border-2 border-[#4a2b1b] hover:bg-[#f2d9b1] transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShowLoginPopup(false);
                navigate('/login');
              }}
              className="px-4 py-2 rounded-full bg-[#4a2b1b] text-[#f2d9b1] hover:bg-[#3a1f12] transition"
            >
              Login Now
            </button>
          </div>
        </div>
      </div>
    )}
      <Footer />
    </div>
  );
}

export default Menu;