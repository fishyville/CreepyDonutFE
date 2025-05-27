import React, { useState, useEffect } from 'react';

import { Search, Menu, ChevronDown, Home, ShoppingCart, ClipboardList, LogIn } from 'lucide-react';

import { Link, useNavigate } from 'react-router-dom';
import LogoNavbar from '../assets/LogoNavbar.png';

const Navbar = ({ cartCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCartCount, setCurrentCartCount] = useState(cartCount);
  const [cartId, setCartId] = useState(null);
  const [showEmptyCartPopup, setShowEmptyCartPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userId'));
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const fetchCartData = React.useCallback(async () => {
    if (!userId) {
      setCurrentCartCount(0);
      return;
    }

    try {
      const cartResponse = await fetch(`https://localhost:7002/api/cart/${userId}`);
      if (!cartResponse.ok) throw new Error('Failed to fetch cart');
      const cartData = await cartResponse.json();
      
      if (cartData && cartData.items) {
        setCartId(cartData.id);
        const itemCount = cartData.items.length;
        setCurrentCartCount(itemCount);
      } else {
        setCurrentCartCount(0);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
      setCurrentCartCount(0);
    }
  }, [userId]);

  // Initial fetch and event listener setup
  useEffect(() => {
    fetchCartData();

    // Set up event listener for cart updates
    window.addEventListener('cartUpdated', fetchCartData);

    // Cleanup
    return () => {
      window.removeEventListener('cartUpdated', fetchCartData);
    };
  }, [fetchCartData]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="bg-[#f2d9b1] shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                src={LogoNavbar}
                alt="CreepyDonut Logo"
                className="w-10 h-10 object-cover rounded-full"
              />
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-amber-50 border border-amber-200 rounded-full py-2 pl-4 pr-10 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-amber-200 rounded-full transition-colors"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>
            </form>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {/* Menu */}
              <Link to="/menu" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">MENU</Link>
              {/* Fundraising */}
              <Link to="/fundraising" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">FUNDRAISING</Link>

              {/* About Us */}
              <Link to="/about" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">ABOUT US</Link>
            </div>
          </div>

          {/* Right side icons and auth */}
          <div className="hidden md:flex items-center space-x-4 ml-6">
            {/* Home icon */}
            <Link 
              to="/"
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-amber-200 rounded-full transition-colors"
            >
              <Home className="w-5 h-5" />
            </Link>

            {/* Order icon */}
            <Link 
              to="/orders"
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-amber-200 rounded-full transition-colors"
            >
              <ClipboardList className="w-5 h-5" />
            </Link>

            {/* Cart button with badge (previously User) */}
            <button 
            onClick={() => {
              if (currentCartCount === 0) {
                setShowEmptyCartPopup(true); // Tampilkan pop-up
              } else {
                navigate('/cart');
              }
            }}

              className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-amber-200 rounded-full transition-colors"
              aria-label="View Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {currentCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                  {currentCartCount}
                </span>
              )}
            </button>
            
            {/* Auth buttons */}
            <div className="flex items-center space-x-2 text-sm">
              {isLoggedIn ? (
                <div className="flex items-center space-x-6">
                  <span className="text-gray-700 font-medium">Welcome!</span>
                  <button 
                    onClick={handleLogout}
                    className="text-[#8C2F39] hover:text-red-800 font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <span className="text-gray-400">|</span>
                  <Link 
                    to="/register" 
                    className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-amber-200 rounded-full transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-64 bg-gradient-to-b from-[#f2d9b1] to-white shadow-2xl p-5 rounded-l-2xl overflow-y-auto transition-transform duration-300">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-[#4a2b1b]">Creepy Donut</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-[#4a2b1b] hover:text-red-500 text-2xl font-bold focus:outline-none"
            >
              × 
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-3">
            <Link 
              to="/menu" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 bg-white text-[#4a2b1b] font-semibold rounded-lg shadow-sm hover:bg-amber-100 transition"
            >
              🍩 MENU
            </Link>
            <Link 
              to="/fundraising" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 bg-white text-[#4a2b1b] font-semibold rounded-lg shadow-sm hover:bg-amber-100 transition"
            >
              🎉 FUNDRAISING
            </Link>
            <Link 
              to="/about" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 bg-white text-[#4a2b1b] font-semibold rounded-lg shadow-sm hover:bg-amber-100 transition"
            >
              📖 ABOUT US
            </Link>

            <div className="border-t border-amber-300 mt-5 pt-4">
              {isLoggedIn ? (
                <>
                  <span className="block px-2 text-[#4a2b1b] font-medium">Welcome!</span>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="mt-2 w-full px-3 py-2 bg-[#fceced] text-[#8C2F39] font-semibold rounded-lg shadow-sm hover:bg-[#f8dadc] transition"
                  >
                    🚪 Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 bg-white text-[#4a2b1b] font-semibold rounded-lg shadow-sm hover:bg-amber-100 transition"
                  >
                    🔐 Login
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 bg-white text-[#4a2b1b] font-semibold rounded-lg shadow-sm hover:bg-amber-100 transition"
                  >
                    📝 Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
      </div>
      {showEmptyCartPopup && (
      <div className="fixed inset-0 backdrop-blur-[10px] flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full text-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            You haven't added any items yet.
          </h2>
          <button 
            onClick={() => setShowEmptyCartPopup(false)} 
            className="mt-2 px-4 py-2 bg-[#F2D9B1] text-[#3B2E25] rounded-full hover:bg-[#6B4E35] hover:text-[#FEF2DD] transition-colors"
          >
            Okay
          </button>
        </div>
      </div>
    )}
    </nav>
  );
};

export default Navbar;