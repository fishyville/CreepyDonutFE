import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ShoppingBag, User, Lock, History, LogOut } from 'lucide-react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import Profile from '../assets/profile.jpeg';
import ChatBot from '../component/Chatbot';
const POLLING_INTERVAL = 10000; 

const generateOrderNumber = () => {
  const prefix = 'CD'; // CD for Creepy Donut
  const timestamp = new Date().getTime().toString().slice(-6); 
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0'); 
  return `${prefix}${timestamp}${random}`;
};

const parseShippingAddress = (addressString) => {
  try {
    const [name, address, cityPostal, phoneInfo, ...rest] = addressString.split(', ');
    const [city, postalCode] = cityPostal.split(' ');
    const phone = phoneInfo.replace('Phone: ', '');
    
    return {
      name,
      address,
      city,
      postalCode,
      phone
    };
  } catch (error) {
    console.error('Error parsing address:', error);
    return null;
  }
};


const updateOrderStatus = async (orderId, status) => {
  try {
    console.log('Updating order:', orderId); 
    
    if (!orderId) {
      throw new Error('Order ID is required');
    }

    const response = await fetch(`https://localhost:7002/api/Orders/${orderId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'UserId': localStorage.getItem('userId')
      },
      body: JSON.stringify({
        status: status
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response:', errorData);
      throw new Error('Failed to update order status');
    }

    
    await response.json();
    return true;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

const Order = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCartItems, setSelectedCartItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const [showQRCode, setShowQRCode] = useState(false);
  const [iframeUrl, setIframeUrl] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error('No user ID found');
          navigate('/login');
          return;
        }

        setLoading(true);
        console.log('Fetching orders for user:', userId);

        
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

          setUserEmail(userData.email);
          setUserPhone(userData.phoneNumber); 

        }

        
        const response = await fetch(`https://localhost:7002/api/Orders/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.status}`);
        }

        const data = await response.json();
        
        const activeOrders = data
          .filter(order => order.status !== 'Finished')
          .map(order => ({
            ...order,
            orderNumber: generateOrderNumber()
          }));
        
        setOrders(activeOrders);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
}, [navigate]);

  
  useEffect(() => {
    const handleBackButton = (e) => {
      e.preventDefault();
      navigate('/menu');
    };

    window.addEventListener('popstate', handleBackButton);

    
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [navigate]);

  
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'unpaid':
        return 'text-red-600';
      case 'processing':
        return 'text-gray-600';
      case 'delivering':
        return 'text-yellow-500'; 
      case 'arrived':
        return 'text-green-600';
    }
  };

  
  useEffect(() => {
    const updateProcessingOrders = async () => {
      try {
        const userId = localStorage.getItem('userId');
        
        
        const response = await fetch(`https://localhost:7002/api/Orders/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const allOrders = await response.json();
        
        
        const processingOrders = allOrders
          .filter(order => order.status === 'Processing') 
          .sort((a, b) => parseInt(a.orderId) - parseInt(b.orderId)); 

        console.log('Processing orders found:', processingOrders);

        if (processingOrders.length > 0) {
          const lowestIdOrder = processingOrders[0];
          
          if (!lowestIdOrder.orderId) { 
            console.error('Invalid order or missing ID:', lowestIdOrder);
            return;
          }

          console.log('Found order to update:', lowestIdOrder);

          const timer = setTimeout(async () => {
            try {
              const updateResponse = await fetch(`https://localhost:7002/api/Orders/${lowestIdOrder.orderId}/status`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'UserId': userId
                },
                body: JSON.stringify({
                  status: 'Delivering'
                })
              });

              if (!updateResponse.ok) {
                throw new Error('Failed to update order status');
              }

              
              console.log('Successfully updated order to Delivering:', lowestIdOrder.orderId);

            } catch (error) {
              console.error('Error updating status:', error);
            }
          }, 10000);

          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error('Error in updateProcessingOrders:', error);
      }
    };

    
    updateProcessingOrders();
  }, [orders]); 

  
  useEffect(() => {
    const updateDeliveringOrders = async () => {
      try {
        const deliveringOrders = orders
          .filter(order => order.status === 'Delivering')
          .sort((a, b) => parseInt(a.orderId) - parseInt(b.orderId));

        if (deliveringOrders.length > 0) {
          const lowestIdOrder = deliveringOrders[0];
          
          const timer = setTimeout(async () => {
            try {
              const updateResponse = await fetch(`https://localhost:7002/api/Orders/${lowestIdOrder.orderId}/status`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'UserId': localStorage.getItem('userId')
                },
                body: JSON.stringify({
                  status: 'Finished'
                })
              });

              if (!updateResponse.ok) {
                throw new Error('Failed to update order status');
              }

              
              console.log('Successfully updated order to Finished:', lowestIdOrder.orderId);

            } catch (error) {
              console.error('Error updating status:', error);
            }
          }, 5000); 

          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error('Error in updateDeliveringOrders:', error);
      }
    };

    
    updateDeliveringOrders();
  }, [orders]); 

  
  useEffect(() => {
    const pollOrders = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        const response = await fetch(`https://localhost:7002/api/Orders/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        
        const activeOrders = data
          .filter(order => order.status !== 'Finished')
          .map(order => ({
            ...order,
            orderNumber: generateOrderNumber()
          }));
        
        setOrders(activeOrders);
      } catch (error) {
        console.error('Error polling orders:', error);
      }
    };

    
    pollOrders();

    
    const pollInterval = setInterval(pollOrders, POLLING_INTERVAL);

    
    return () => clearInterval(pollInterval);
  }, []); 
  const getStatusDisplay = (status) => {
    switch (status.toLowerCase()) {
      case 'unpaid':
        return 'Unpaid';
      case 'processing':
        return 'Processing';
      case 'delivering':
        return 'Delivering';
      case 'finished':
        return 'Finished';
      case 'arrived':
        return 'Arrived';
      default:
        return status;
    }
  };

  const handleViewDetails = async (order) => {
    try {
      const response = await fetch(`https://localhost:7002/api/cart-items/${order.cartId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }

      const cartItems = await response.json();
      setSelectedCartItems(cartItems);
      setSelectedOrder(order); 
      setShowPopup(true);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      alert('Failed to load order details');
    }
  };

  const handlePayNow = async () => {
    try {
      if (!selectedOrder) return;

      
      await updateOrderStatus(selectedOrder.orderId, 'Processing');
      console.log('Order status updated to Processing:', selectedOrder.orderId);

      
      const nameParts = userName.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = (nameParts.slice(1).join(' ') || firstName);
      const email = userEmail || '';
      const phone = userPhone || '';

      
      const snapResponse = await fetch('https://localhost:7002/payment/get-snap-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          orderId: selectedOrder.orderId,
          grossAmount: parseFloat(selectedOrder.totalPrice),
          firstName,
          lastName,
          email,
          phone
        })
      });

      if (!snapResponse.ok) {
        throw new Error('Failed to generate payment QR code');
      }

      const snapData = await snapResponse.json();
      setIframeUrl(`https://app.sandbox.midtrans.com/snap/v4/redirection/${snapData.token}`);
      setShowQRCode(true);
    } catch (error) {
      alert('Failed to start payment: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">Loading...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <Navbar />
      <div className="flex flex-1">
       
        <div className="w-64 bg-[#e6d5c5]">
         
          <div className="p-6 text-center border-b border-[#6d4c2b]">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-3">
              <img
                src={Profile}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-bold text-[#4a2b1b] text-2xl capitalize">{userName}</p>
          </div>

          
          <nav className="p-4 space-y-2">
            <button 
              onClick={() => navigate('/account')} 
              className="flex items-center w-full p-3 text-[#4a2b1b] hover:bg-[#6d4c2b] hover:text-white rounded transition-colors"
            >
              <User className="w-5 h-5 mr-3" />
              My Account
            </button>
            <button className="flex items-center w-full p-3 bg-[#6d4c2b] text-white rounded">
              <ShoppingBag className="w-5 h-5 mr-3" />
              My Order
            </button>
            <button 
              onClick={() => {
                try {
                  navigate('/reset');
                } catch (error) {
                  console.error('Navigation error:', error);
                }
              }}
              className="flex items-center w-full p-3 text-[#4a2b1b] hover:bg-[#6d4c2b] hover:text-white rounded transition-colors"
            >
              <Lock className="w-5 h-5 mr-3" />
              Change Password
            </button>
            <button 
              onClick={() => {
                try {
                  navigate('/history');
                } catch (error) {
                  console.error('Navigation error:', error);
                }
              }}
              className="flex items-center w-full p-3 text-[#4a2b1b] hover:bg-[#6d4c2b] hover:text-white rounded transition-colors"
            >
              <History className="w-5 h-5 mr-3" />
              My History
            </button>
          </nav>

          
          <div className="p-4 mt-8">
            <button 
              onClick={() => {
                localStorage.removeItem('userId');
                localStorage.removeItem('userName');
                localStorage.removeItem('token');
                localStorage.clear();

                navigate('/login');
              }}
              className="flex items-center w-full p-3 text-[#4a2b1b] hover:bg-[#6d4c2b] hover:text-white rounded transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Log Out
            </button>
          </div>
        </div>

        
        <div className="flex-1 bg-[#f9f5f0] p-8 overflow-y-auto">
          <div className="mb-6 bg-[#e6d5c5] p-4 rounded-lg">
            <h1 className="text-2xl font-bold text-[#4a2b1b] flex items-center">
              <ShoppingBag className="w-6 h-6 mr-2" />
              My Orders
            </h1>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.orderId} className="bg-white rounded-lg shadow-md p-6">
                <div className="grid gap-2">
                  <div className="mb-2">
                    <span className="text-gray-600">Order Status: </span>
                    <span className={`font-semibold ${getStatusColor(order.status)}`}>
                      {getStatusDisplay(order.status)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-gray-600">
                        Order No: <span className="font-medium text-[#4a2b1b]">{order.orderNumber}</span>
                      </div>
                      <div className="text-gray-600">
                        Order Date: <span className="font-medium text-[#4a2b1b]">
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="text-gray-600 mt-2">
                        Total Price: <span className="font-medium text-[#4a2b1b]">
                          Rp {order.totalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-end items-end">
                      <button
                        onClick={() => handleViewDetails(order)}
                        className="px-4 py-2 bg-[#6d4c2b] text-white rounded hover:bg-[#4a2b1b] transition-colors"
                      >
                        View Details
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ))}

            {orders.length === 0 && (
              <div className="text-center text-gray-600 py-8 bg-white rounded-lg shadow-md">
                No orders found
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
        <ChatBot />

      {showPopup && (
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
                {selectedCartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-3 border-b">
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
                        Rp {item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">TOTAL PRICE:</span>
                  <span className="font-bold text-[#4A2B1B]">
                    Rp {selectedOrder?.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                {selectedOrder?.status?.toLowerCase() === 'unpaid' && (
                  <button
                    onClick={handlePayNow}
                    className="flex-1 py-3 bg-[#4A2B1B] text-[#F2D9B1] rounded hover:bg-[#F2D9B1] hover:text-[#4A2B1B] transition-colors text-center"
                  >
                    Pay Now
                  </button>
                )}
                <button
                  onClick={() => setShowPopup(false)}
                  className="flex-1 py-3 bg-[#4A2B1B] text-[#F2D9B1] rounded hover:bg-[#F2D9B1] hover:text-[#4A2B1B] transition-colors text-center"
                >
                  Close
                </button>
              </div>
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
                  setShowPopup(false);
                  window.location.reload(); 
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
  );
};

export default Order;

