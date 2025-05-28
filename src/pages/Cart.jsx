import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { useNavigate } from "react-router-dom";
import Alert from '../component/Alert';
import ChatBot from '../component/Chatbot';

const Cart = () => {
  // Update the states to match API response structure
  const [cartData, setCartData] = useState({
    id: null,
    items: []
  });
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
    email: '', 
    notes: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [cartId, setCartId] = useState(null); 
  const [checkoutClicked, setCheckoutClicked] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [snapToken, setSnapToken] = useState(null);
  const [iframeUrl, setIframeUrl] = useState(null); 
  const [paymentStatus, setPaymentStatus] = useState(null); 
  const [alertMessage, setAlertMessage] = useState('');
  const userId = localStorage.getItem('userId');

  const navigate = useNavigate();

  const userName = localStorage.getItem('username');
  const userEmail = localStorage.getItem('userEmail'); 

  
  useEffect(() => {
    setShippingAddress(prev => ({
      ...prev,
      email: userEmail || '' 
    }));
  }, [userEmail]);

  console.log(userId);
  console.log(userName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const cartRes = await fetch(`https://localhost:7002/api/cart/${userId}`);
        if (!cartRes.ok) throw new Error('Failed to fetch cart');
        const cartData = await cartRes.json();
        
        setCartData(cartData); 
        setCartItems(cartData.items || []);
        setCartId(cartData.id);
        
       
        const total = (cartData.items || []).reduce((sum, item) => 
          sum + (item.price * item.quantity), 0
        );
        setTotalPrice(total);

        
        const productsRes = await fetch('https://localhost:7002/api/products');
        if (!productsRes.ok) throw new Error('Failed to fetch products');
        const productsData = await productsRes.json();
        setRecommendedProducts(productsData.slice(0, 5));

      } catch (err) {
        setError(err.message);
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

 
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

    
      const cartRes = await fetch(`https://localhost:7002/api/cart/${userId}`);
      const cartData = await cartRes.json();
      setCartItems(cartData.items || []);
      
    
      const total = cartData.items.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0
      );
      setTotalPrice(total);

    
      window.dispatchEvent(new Event('cartUpdated'));

    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

 
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

 
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setAlertMessage('Your cart is empty');
      return;
    }
    
    if (!shippingAddress.name || !shippingAddress.address) {
      setAlertMessage('Please fill in the required shipping information');
      return;
    }
    
    setCheckoutClicked(true);
    setShowConfirmation(true);
  };

 
  const handleConfirm = async (isLater) => {
    setShowConfirmation(false);
    
    try {
      const currentUserId = localStorage.getItem('userId');
      if (!currentUserId) {
        throw new Error('No user ID found');
      }

      const formattedAddress = `${shippingAddress.name}, ${shippingAddress.address}, ${shippingAddress.city} ${shippingAddress.postalCode}, Phone: ${shippingAddress.phone}${shippingAddress.notes ? `, Notes: ${shippingAddress.notes}` : ''}`;


      

      const orderData = {
        userId: parseInt(currentUserId),
        cartId: parseInt(cartId),
        totalPrice: totalPrice === 0 ? 0 : (totalPrice * 1.1 - 15000), // Add check for zero total
        status: isLater ? "Unpaid" : "Processing",

        paymentMethod: isLater ? "Pay Later" : "Direct Payment",
        shippingAddress: formattedAddress,
        items: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        }))
      };


    

      const orderResponse = await fetch('https://localhost:7002/api/Orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'UserId': currentUserId
        },
        body: JSON.stringify(orderData)
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.text();
        throw new Error(errorData || 'Failed to create order');
      }

      const orderResult = await orderResponse.json();
      console.log('Order created:', orderResult);


    
      setCartItems([]);
      setTotalPrice(0);
      
     
      window.dispatchEvent(new Event('cartUpdated'));


      if (!isLater) {
       
        const nameParts = userName?.split(' ') || ['', '']; 
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' '); 

        const snapResponse = await fetch('https://localhost:7002/payment/get-snap-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({

            orderId: orderResult.id,
            grossAmount: totalPrice === 0 ? 0 : parseFloat((totalPrice * 1.1 - 15000).toFixed(2)),
            firstName: firstName,
            lastName: firstName,
            email: shippingAddress.email || '',
            phone: shippingAddress.phone || ''
          })
        });

        if (!snapResponse.ok) {
          throw new Error('Failed to generate payment QR code');
        }

        const snapData = await snapResponse.json();
        setIframeUrl(`https://app.sandbox.midtrans.com/snap/v4/redirection/${snapData.token}`);
        setShowQRCode(true);
        setShowConfirmation(false);
      } else {
        navigate('/order');
      }

    } catch (error) {
      console.error('Error during checkout:', error);
      setAlertMessage(`Failed to process order: ${error.message}`);
    }
  };

  
  const getCategoryName = (categoryId) => {
    switch (categoryId) {
      case 1:
        return "Donut";
      case 2:
        return "Drink";
      case 3:
        return "Merch";
      default:
        return "Unknown";
    }
  };

 
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
    <div className="min-h-screen flex flex-col pt-16">
      <Navbar cartCount={cartItems.length} />
      <div className="relative flex-1 bg-[#4a2b1b]">
        <div className="flex">
         
          <div className="flex-1 pr-[450px]">
            <div className="mt-20">
              <div className="bg-[#f2d9b1] rounded-tr-[40px] p-8">
                <div className="text-xs text-[#7c5a3a] mb-2">
                  Shop / <span className="font-semibold">Cart</span>
                </div>
                <h1 className="text-2xl font-bold mb-6 text-[#2d1a0e]">Shopping Cart</h1>
              </div>

              <div className="bg-white p-8">
                {cartItems.length === 0 ? (
                 
                  <div className="flex flex-col items-center justify-center py-16 px-4">
                    <div className="text-8xl mb-6">🛒</div>
                    <h2 className="text-2xl font-bold text-[#4a2b1b] mb-3">Your Cart is Empty</h2>
                    <p className="text-[#7c5a3a] mb-8 text-center">Time to fill it with some delicious treats!</p>
                    <button
                      onClick={() => navigate('/menu')}
                      className="px-8 py-3 bg-[#4a2b1b] text-white rounded-full hover:bg-[#2a1b0b] transition-colors"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                
                  <div className="space-y-4 mb-8">
                    
                    <div className="flex items-center px-6">
                      <div className="w-[250px]"></div> 

                    </div>

                  
                    {cartItems.map((item) => (
                      <div key={item.id} 
                        className="flex items-center bg-white rounded-[30px] p-6 shadow-sm border border-[#f2d9b1]"
                      >
                       
                        <div className="flex items-center w-[250px]">
                          <img 
                            src={item.imageUrl} 
                            alt={item.productName}
                            className="w-16 h-16 rounded-full object-cover mr-4"
                          />
                          <div>
                            <h3 className="font-bold text-[#2d1a0e] text-lg">{item.productName}</h3>
                            <div className="text-sm text-[#7c5a3a]">{getCategoryName(item.categoryId)}</div>
                          </div>
                        </div>
                        
                       
                        <div className="flex-1 flex items-center">
                          <div className="flex-1 flex items-center justify-between px-4">
                          
                            <div className="flex flex-col items-center">
                              <span className="text-sm font-bold text-[#2b2b2b] mb-2">Quantity</span>
                              <div className="flex items-center">
                                <button
                                  className="w-6 h-6 rounded-full bg-[#4a2b1b] flex items-center justify-center hover:opacity-90 text-white font-bold text-sm"
                                  onClick={() => updateQuantity(item.productId, Math.max(0, item.quantity - 1))}
                                >
                                  -
                                </button>
                                <span className="mx-4 w-8 text-center font-bold text-[#4a2b1b]">{item.quantity}</span>
                                <button
                                  className="w-6 h-6 rounded-full bg-[#4a2b1b] flex items-center justify-center hover:opacity-90 text-white font-bold text-sm"
                                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                >
                                  +
                                </button>
                              </div>
                            </div>

                           
                            <div className="flex flex-col items-center mx-8">
                              <span className="text-sm font-bold text-[#2b2b2b] mb-2">Price</span>
                              <span className="text-[#4a2b1b] font-bold">
                                Rp {new Intl.NumberFormat('id-ID').format(item.price)}
                              </span>
                            </div>

                           
                            <div className="flex flex-col items-center mx-8">
                              <span className="text-sm font-bold text-[#2b2b2b] mb-2">Total</span>
                              <span className="text-[#4a2b1b] font-bold">
                                Rp {new Intl.NumberFormat('id-ID').format(item.price * item.quantity)}
                              </span>
                            </div>

                          
                            <button
                              onClick={() => updateQuantity(item.productId, 0)}
                              className="px-6 py-2 text-[#9a2b1b] border border-[#9a2b1b] rounded-full hover:bg-[#fff1e6] transition-colors text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
               
                <div className="space-y-6">
                  <div className="flex gap-6">
                    
                    <div className="flex-1 bg-white rounded-[30px] p-6 shadow-sm border border-[#f2d9b1]">
                      <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                      <div className="space-y-4">
                        <div className="relative">
                          <input
                            type="text"
                            name="name"
                            placeholder="Write your address name.."
                            value={shippingAddress.name}
                            onChange={handleAddressChange}
                            className="w-full bg-[#f9f5f0] border border-[#e6d5c5] rounded-full py-2 pl-12 pr-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e6d5c5]"
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
                            className="w-full bg-[#f9f5f0] border border-[#e6d5c5] rounded-full py-2 pl-12 pr-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e6d5c5]"
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
                              className="w-full bg-[#f9f5f0] border border-[#e6d5c5] rounded-full py-2 pl-12 pr-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e6d5c5]"
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
                              className="w-full bg-[#f9f5f0] border border-[#e6d5c5] rounded-full py-2 pl-12 pr-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e6d5c5]"
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
                            className="w-full bg-[#f9f5f0] border border-[#e6d5c5] rounded-full py-2 pl-12 pr-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e6d5c5]"
                          />
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                            📱
                          </span>
                        </div>

                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            placeholder="Write your email address.."
                            value={shippingAddress.email}
                            onChange={handleAddressChange}
                            className="w-full bg-[#f9f5f0] border border-[#e6d5c5] rounded-full py-2 pl-12 pr-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e6d5c5]"
                          />
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                            📧
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

                   
                    <div className="flex-1 bg-white rounded-[30px] p-6 shadow-sm border border-[#f2d9b1]">
                      <h2 className="text-xl font-bold mb-4">Payment Details</h2>
                     
                      <div className="border border-[#e6d5c5] rounded-2xl p-4 mb-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="bg-[#4a2b1b] w-10 h-10 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xl">🏷️</span>
                            </div>
                            <div>
                              <div className="font-bold text-[#2b2b2b] text-lg">10% Discount</div>
                              <div className="text-sm text-[#7c5a3a]">Up to 15K</div>
                            </div>
                          </div>
                          <svg className="w-6 h-6 text-[#4a2b1b]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-[#2b2b2b]">
                          <span>Receipt Number</span>
                          <span className="font-bold text-[#4a2b1b]">012738917230127301270371207312</span>
                        </div>
                        <div className="flex justify-between text-[#2b2b2b]">
                          <span>Sub Total</span>
                          <span className="font-bold text-[#4a2b1b]">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalPrice)}
                          </span>
                        </div>
                        <div className="flex justify-between text-[#2b2b2b]">
                          <span>Tax (10%)</span>
                          <span className="font-bold text-[#4a2b1b]">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalPrice * 0.1)}
                          </span>
                        </div>
                        <div className="flex justify-between text-[#2b2b2b]">
                          <span>Promo</span>
                          <span className="font-bold text-[#4a2b1b]">
                            Rp 15.000
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex flex-col items-start">
                          <span className="font-bold text-[#2b2b2b] text-lg">Grand Total</span>
                          <span className="text-3xl font-bold text-[#4a2b1b]">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                              totalPrice === 0 ? 0 : (totalPrice * 1.1 - 15000)
                            )}
                          </span>
                        </div>
                      </div>

                      
                      <button 
                        onClick={handleCheckout}
                        className="w-full bg-[#4a2b1b] hover:bg-[#2a1b0b] transition-colors duration-200 text-white py-3 rounded-xl text-lg font-semibold"
                      >
                        Checkout
                      </button>
                      
                      {showConfirmation && (
                        <div className="fixed inset-0 backdrop-blur-[10px] flex items-center justify-center z-50">
                          <div className="bg-white/100 rounded-2xl p-6 max-w-md w-full mx-4 shadow-lg">
                            <h3 className="text-lg font-bold mb-4">Confirm Checkout</h3>
                            <p className="text-gray-600 mb-6">
                              Do you want to continue with the payment now?
                            </p>
                            <div className="flex justify-end space-x-4">
                              <button

                                onClick={async () => {
                                  await handleConfirm(true);
                                  navigate('/orders');
                                }}

                                className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-900 hover:text-white"
                              >
                                Later
                              </button>
                              <button

                                onClick={async () => {
                                  await handleConfirm(false); 
                                }}

                                className="px-4 py-2 bg-[#9a2b1b] text-white rounded-full hover:bg-[#2a1b0b]"
                              >
                                Yes, Continue
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      
                      {showQRCode && iframeUrl && (
                        <div className="fixed inset-0 backdrop-blur-[10px] flex items-center justify-center z-50">
                          <div className="bg-white/100 rounded-2xl p-6 w-[90%] max-w-2xl mx-4 shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="text-lg font-bold">Payment</h3>
                              <button 
                                onClick={() => {
                                  setShowQRCode(false);
                                  navigate('/orders');
                                }}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                ✕
                              </button>
                            </div>
                            <div className="relative" style={{ height: '600px' }}>
                              <iframe
                                src={iframeUrl}
                                className="w-full h-full rounded-xl"
                                frameBorder="0"
                                sandbox="allow-scripts allow-same-origin allow-forms"
                                allow="payment"
                              />
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
        </div>

        
        <div className="w-[400px] absolute right-0 top-0"> 
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
      <ChatBot />
      <Footer />
      
      
      {alertMessage && (
        <Alert 
          message={alertMessage}
          onClose={() => setAlertMessage('')}
        />
      )}
    </div>
  );
}

export default Cart;

