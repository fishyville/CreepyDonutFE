import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingBag, Lock, History, LogOut } from 'lucide-react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import Profile from '../assets/profile.jpeg';
import ChatBot from '../component/Chatbot';


const parseShippingAddress = (addressString) => {
  try {
    const [name, address, cityPostal, phoneInfo] = addressString.split(', ');
    const [city, postalCode] = cityPostal.split(' ');
    const phone = phoneInfo.replace('Phone: ', '');
    return { name, address, city, postalCode, phone };
  } catch {
    return {};
  }
};

const HistoryPage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); 
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCartItems, setSelectedCartItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          navigate('/login');
          return;
        }
        setLoading(true);

        
        const userResponse = await fetch(`https://localhost:7002/api/Users/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUserName(userData.username);
        }

        
        const response = await fetch(`https://localhost:7002/api/Orders/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        const finishedOrders = data.filter(order => order.status === 'Finished');
        const mappedOrders = finishedOrders.map(order => ({
          ...order,
          orderNumber: order.orderNumber || `CD${order.id || order.orderId || ''}`
        }));
        setOrders(mappedOrders);
      } catch (error) {
        console.error('Error fetching history orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []); 

  const handleViewDetails = async (order) => {
    try {
      
      const response = await fetch(`https://localhost:7002/api/cart-items/${order.cartId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to fetch cart items');
      const cartItems = await response.json();
      setSelectedCartItems(cartItems);
      setSelectedOrder(order);
      setShowPopup(true);
    } catch (error) {
      alert('Failed to load order details');
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <Navbar />
      <div className="flex flex-1">
        
        <div className="w-64 bg-[#e6d5c5]">
          <div className="p-6 text-center border-b border-[#6d4c2b]">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-3 bg-[#6d4c2b]">
               <img
                  src={Profile}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  />
            </div>
            <p className="font-bold text-[#4a2b1b] text-2xl capitalize">{userName}</p>
          </div>
          <nav className="p-4 space-y-2">
            <button onClick={() => navigate('/account')} className="flex items-center w-full p-3 text-[#4a2b1b] hover:bg-[#6d4c2b] hover:text-white rounded transition-colors">
              <User className="w-5 h-5 mr-3" /> My Account
            </button>
            <button onClick={() => navigate('/orders')} className="flex items-center w-full p-3 text-[#4a2b1b] hover:bg-[#6d4c2b] hover:text-white rounded transition-colors">
              <ShoppingBag className="w-5 h-5 mr-3" /> My Order
            </button>
            <button onClick={() => navigate('/reset')} className="flex items-center w-full p-3 text-[#4a2b1b] hover:bg-[#6d4c2b] hover:text-white rounded transition-colors">
              <Lock className="w-5 h-5 mr-3" /> Change Password
            </button>
            <button className="flex items-center w-full p-3 bg-[#6d4c2b] text-white rounded">
              <History className="w-5 h-5 mr-3" /> My History
            </button>
          </nav>
          <div className="p-4 mt-8">
            <button onClick={() => { localStorage.clear(); navigate('/login'); }} className="flex items-center w-full p-3 text-[#4a2b1b] hover:bg-[#6d4c2b] hover:text-white rounded transition-colors">
              <LogOut className="w-5 h-5 mr-3" /> Log Out
            </button>
          </div>
        </div>
        
        <div className="flex-1 bg-[#f9f5f0] p-8 overflow-y-auto">
          <div className="mb-6 bg-[#e6d5c5] p-4 rounded-lg">
            <h1 className="text-2xl font-bold text-[#4a2b1b] flex items-center">
              <History className="w-6 h-6 mr-2" /> History
            </h1>
          </div>
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <p>Loading order history...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8 bg-white rounded-lg shadow-md">
                <p>No finished orders found in history</p>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <div className="flex items-center mb-2">
                    <span className="text-[#6d4c2b] text-base">Total:</span>
                    <span className="ml-2 font-bold text-[#6d4c2b] text-lg">
                      Rp {order.totalPrice?.toLocaleString()}
                    </span>
                  </div>
                  <hr className="border-[#6d4c2b] my-2" />
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="text-[#6d4c2b] text-sm">Order No&nbsp;:</span>
                        <span className="ml-2 font-semibold text-[#6d4c2b] text-base">{order.orderNumber}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-[#6d4c2b] text-sm">Order Date:</span>
                        <span className="ml-2 font-semibold text-[#6d4c2b] text-base">
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="mt-4 md:mt-0 px-8 py-2 bg-[#6d4c2b] text-white font-semibold rounded-xl hover:bg-[#4a2b1b] transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />

      
      {showPopup && selectedOrder && (
        <div className="fixed inset-0 backdrop-blur-[10px] bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#4a2b1b]">Order Summary</h2>
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div
              style={{ 
                maxHeight: '60vh', 
                overflowY: 'auto',
                msOverflowStyle: 'none', 
                scrollbarWidth: 'none'   
              }}
              className="scrollbar-hide" 
            >
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-4">Shipping Address</h3>
                {selectedOrder && parseShippingAddress(selectedOrder.shippingAddress) && (
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded p-2">
                        <p className="text-sm text-gray-500">Name:</p>
                        <p className="text-gray-800">{parseShippingAddress(selectedOrder.shippingAddress).name}</p>
                      </div>
                      <div className="border rounded p-2">
                        <p className="text-sm text-gray-500">Contact Number:</p>
                        <p className="text-gray-800">{parseShippingAddress(selectedOrder.shippingAddress).phone}</p>
                      </div>
                    </div>
                    <div className="border rounded p-2">
                      <p className="text-sm text-gray-500">Address:</p>
                      <p className="text-gray-800">{parseShippingAddress(selectedOrder.shippingAddress).address}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded p-2">
                        <p className="text-sm text-gray-500">City:</p>
                        <p className="text-gray-800">{parseShippingAddress(selectedOrder.shippingAddress).city}</p>
                      </div>
                      <div className="border rounded p-2">
                        <p className="text-sm text-gray-500">Postal Code:</p>
                        <p className="text-gray-800">{parseShippingAddress(selectedOrder.shippingAddress).postalCode}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                {selectedCartItems.map((item, idx) => (
                  <div
                    key={`cartitem-${idx}`}
                    className="flex items-center justify-between py-3 border-b"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-medium text-gray-800">{item.productName}</h3>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-[#4A2B1B]">
                        Rp {item.price ? item.price.toLocaleString() : '0'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">TOTAL PRICE:</span>
                  <span className="font-bold text-[#4A2B1B]">
                    Rp {selectedOrder?.totalPrice?.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => setShowPopup(false)}
                  className="w-full py-3 bg-[#4A2B1B] text-[#F2D9B1] rounded hover:bg-[#F2D9B1] hover:text-[#4A2B1B] transition-colors text-center"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ChatBot />
    </div>
  );
};

export default HistoryPage;