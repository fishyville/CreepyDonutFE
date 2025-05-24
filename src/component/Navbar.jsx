import React, { useState, useEffect } from 'react';
import { Search, Menu, ChevronDown, Home, User, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ cartCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCartCount, setCurrentCartCount] = useState(cartCount);
  const cartId = 1;

  useEffect(() => {
    const fetchCartQuantity = async () => {
      try {
        const response = await fetch(`https://localhost:7002/api/cart/${cartId}`);
        if (!response.ok) throw new Error('Failed to fetch cart');
        const data = await response.json();
        const itemCount = data.items ? data.items.length : 0;
        setCurrentCartCount(itemCount);
      } catch (error) {
        console.error('Error fetching cart quantity:', error);
      }
    };

    
    // Create event listener for cart updates
    window.addEventListener('cartUpdated', fetchCartQuantity);

    // Cleanup
    return () => {
      window.removeEventListener('cartUpdated', fetchCartQuantity);
    };
  }, [cartId]);

  return (
    <nav className="bg-gradient-to-r from-amber-100 to-orange-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">CD</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-amber-50 border border-amber-200 rounded-full py-2 pl-4 pr-10 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-amber-200 rounded-full transition-colors">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {/* Menu */}
              <Link to="/menu" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">MENU</Link>
              {/* Fundraising */}
              <Link to="/fundraising" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">FUNDRAISING</Link>

              {/* About Us */}
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                ABOUT US
              </a>
            </div>
          </div>

          {/* Right side icons and auth */}
          <div className="hidden md:flex items-center space-x-4 ml-6">
            {/* Home icon */}
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-amber-200 rounded-full transition-colors">
              <Home className="w-5 h-5" />
            </button>

            {/* Menu icon */}
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-amber-200 rounded-full transition-colors">
              <Menu className="w-5 h-5" />
            </button>

            {/* Cart button with badge */}
            <Link 
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-amber-200 rounded-full transition-colors"
              aria-label="View Cart"
            >
              <User className="w-5 h-5" />
              {currentCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                  {currentCartCount}
                </span>
              )}
            </Link>

            {/* Auth buttons */}
            <div className="flex items-center space-x-2 text-sm">
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-amber-50 rounded-lg mt-2">
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-amber-100 rounded-md">
                MENU
              </a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-amber-100 rounded-md">
                FUNDRAISING
              </a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-amber-100 rounded-md">
                ABOUT US
              </a>
              {/* Mobile menu auth links */}
              <div className="border-t border-amber-200 pt-3 mt-3">
                <Link 
                  to="/login" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-amber-100 rounded-md"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-amber-100 rounded-md"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;