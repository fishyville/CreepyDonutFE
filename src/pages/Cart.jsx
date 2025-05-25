import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    notes: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [cartId, setCartId] = useState(null); // Add this state
  const userId = localStorage.getItem('userId');
  console.log(userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch cart data
        const cartRes = await fetch(`https://localhost:7002/api/cart/${userId}`);
        if (!cartRes.ok) throw new Error('Failed to fetch cart');
        const cartData = await cartRes.json();
        setCartItems(cartData.items || []);
        setCartId(cartData.id); // Store the cartId
        
        // Calculate total price
        const total = cartData.items.reduce((sum, item) => 
          sum + (item.price * item.quantity), 0
        );
        setTotalPrice(total);

        // Fetch recommended products
        const productsRes = await fetch('https://localhost:7002/api/products');
        if (!productsRes.ok) throw new Error('Failed to fetch products');
        const productsData = await productsRes.json();
        // Take only first 5 products
        setRecommendedProducts(productsData.slice(0, 5));

      } catch (err) {
        setError(err.message);
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update the updateQuantity function to use the stored cartId
  const updateQuantity = async (productId, newQty) => {
    try {
      if (!cartId) return;
      
      const response = await fetch(
        `https://localhost:7002/api/cart/update-quantity/${cartId}/${productId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartId: cartId,
            productId: productId,
            quantity: newQty
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }

      // Refresh cart data
      const cartRes = await fetch(`https://localhost:7002/api/cart/${userId}`);
      const cartData = await cartRes.json();
      setCartItems(cartData.items || []);
      
      // Update total price
      const total = cartData.items.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0
      );
      setTotalPrice(total);

      // Dispatch cartUpdated event to update navbar counter
      window.dispatchEvent(new Event('cartUpdated'));

    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  // Add handleAddressChange function
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add this function to handle checkout
  const handleCheckout = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = async (confirmed) => {
    setShowConfirmation(false);
    if (confirmed) {
      // Handle payment confirmation
      console.log('Proceeding to payment...');
      // Add your payment logic here
    } else {
      console.log('Payment cancelled');
    }
  };

  // Show loading and error states
  if (loading) {
    return (
      <div className="bg-[#f2d9b1] min-h-screen flex items-center justify-center">
        <div className="text-[#4a2b1b] text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#f2d9b1] min-h-screen flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartCount={cartItems.length} />
      
      <div className="relative flex-1 bg-[#4a2b1b]">
        <div className="flex">
          {/* Left section - Cart and Shipping - Add right margin to create space */}
          <div className="flex-1 pr-[450px]">
            <div className="mt-20">
              <div className="bg-[#f2d9b1] rounded-tr-[40px] p-8">
                <div className="text-xs text-[#7c5a3a] mb-2">
                  Shop / <span className="font-semibold">Cart</span>
                </div>
                <h1 className="text-2xl font-bold mb-6 text-[#2d1a0e]">Shopping Cart</h1>
              </div>

              <div className="bg-white p-8">
                {/* Cart items */}
                <div className="space-y-4 mb-8">
                  {cartItems.map((item) => (
                    <div key={item.productId} 
                      className="flex items-center bg-white rounded-[30px] p-6 shadow-sm border border-[#f2d9b1]"
                    >
                      <img 
                        src={item.imageUrl || "/placeholder-donut.jpg"} 
                        alt={item.name}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold">{item.name}</h3>
                        <div className="text-sm text-gray-600">Donut</div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <button
                            className="w-6 h-6 rounded-full bg-[#f2d9b1] flex items-center justify-center"
                            onClick={() => updateQuantity(item.productId, Math.max(0, item.quantity - 1))}
                          >
                            -
                          </button>
                          <span className="mx-3">{item.quantity}</span>
                          <button
                            className="w-6 h-6 rounded-full bg-[#f2d9b1] flex items-center justify-center"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>

                        <div className="w-24 text-right">
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                          }).format(item.price)}
                        </div>

                        <div className="w-24 text-right">
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                          }).format(item.price * item.quantity)}
                        </div>

                        <button
                          onClick={() => updateQuantity(item.productId, 0)}
                          className="ml-4 text-[#eb7c7b] hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping & Payment sections with similar rounded style */}
                <div className="space-y-6">
                  <div className="bg-white rounded-[30px] p-6 shadow-sm border border-[#f2d9b1]">
                    <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                    <div className="space-y-4">
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          placeholder="Write your address name.."
                          value={shippingAddress.name}
                          onChange={handleAddressChange}
                          className="w-full bg-[#f9f5f0] border border-[#e6d5c5] rounded-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e6d5c5]"
                        />
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          📍
                        </span>
                      </div>

                      <div className="relative">
                        <input
                          type="text"
                          name="address"
                          placeholder="Write your address.."
                          value={shippingAddress.address}
                          onChange={handleAddressChange}
                          className="w-full bg-[#f9f5f0] border border-[#e6d5c5] rounded-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e6d5c5]"
                        />
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          🏠
                        </span>
                      </div>

                      <div className="flex gap-4">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={shippingAddress.city}
                            onChange={handleAddressChange}
                            className="w-full bg-[#f9f5f0] border border-[#e6d5c5] rounded-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e6d5c5]"
                          />
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                            🏢
                          </span>
                        </div>

                        <div className="relative flex-1">
                          <input
                            type="text"
                            name="postalCode"
                            placeholder="Postal code"
                            value={shippingAddress.postalCode}
                            onChange={handleAddressChange}
                            className="w-full bg-[#f9f5f0] border border-[#e6d5c5] rounded-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e6d5c5]"
                          />
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                            📮
                          </span>
                        </div>
                      </div>

                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Write your phone number.."
                          value={shippingAddress.phone}
                          onChange={handleAddressChange}
                          className="w-full bg-[#f9f5f0] border border-[#e6d5c5] rounded-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e6d5c5]"
                        />
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          📱
                        </span>
                      </div>

                      <div className="relative">
                        <textarea
                          name="notes"
                          placeholder="Additional Notes...."
                          value={shippingAddress.notes}
                          onChange={handleAddressChange}
                          rows="4"
                          className="w-full bg-[#f9f5f0] border border-[#e6d5c5] rounded-2xl py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e6d5c5]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-[30px] p-6 shadow-sm border border-[#f2d9b1]">
                    <h2 className="text-xl font-bold mb-4">Payment Details</h2>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Sub Total</span>
                        <span>{new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR'
                        }).format(totalPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax (10%)</span>
                        <span>{new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR'
                        }).format(totalPrice * 0.1)}</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>{new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR'
                        }).format(totalPrice * 1.1)}</span>
                      </div>
                    </div>
                    <button 
                      onClick={handleCheckout}
                      className="w-full bg-[#9a2b1b] hover:bg-[#2a1b0b] transition-colors duration-200 text-white py-2 rounded-full mt-4"
                    >
                      Checkout
                    </button>

                    {/* Confirmation Dialog */}
                    {showConfirmation && (
                      <div className="fixed inset-0 backdrop-blur-[10px] flex items-center justify-center z-50">
                        <div className="bg-white/100 rounded-2xl p-6 max-w-md w-full mx-4 shadow-lg">
                          <h3 className="text-lg font-bold mb-4">Confirm Checkout</h3>
                          <p className="text-gray-600 mb-6">
                            Do you want to continue with the payment now?
                          </p>
                          <div className="flex justify-end space-x-4">
                            <button
                              onClick={() => handleConfirm(false)}
                              className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-900 hover:text-white"
                            >
                              Later
                            </button>
                            <button
                              onClick={() => handleConfirm(true)}
                              className="px-4 py-2 bg-[#9a2b1b] text-white rounded-full hover:bg-[#2a1b0b]"
                            >
                              Yes, Continue
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right section - Recommended Items */}
        <div className="w-[400px] absolute right-0 top-0"> {/* Added right-8 to move it 2rem from the right edge */}
          <div className="bg-[#f2d9b1] min-h-screen rounded-bl-[40px]">
            <div className="bg-white p-6 h-[600px]">
              <h2 className="text-xl font-bold mb-4">Recommended For You</h2>
              <div className="space-y-3">
                {recommendedProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="flex items-center bg-[#f9f5f0] rounded-[20px] p-4 hover:shadow-md transition group"
                  >
                    <img 
                      src={product.imageUrl || "/placeholder-donut.jpg"}
                      alt={product.name}
                      className="w-12 h-12 rounded-full object-cover mr-3"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#2d1a0e]">{product.name}</h3>
                      <div className="text-xs text-[#7c5a3a]">Donut</div>
                    </div>
                    <button className="p-2 bg-[#f2d9b1] rounded-full group-hover:bg-[#e6c4a1] transition-colors">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;

