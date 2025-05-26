import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ShoppingBag, User, Lock, History, LogOut } from 'lucide-react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

const generateOrderNumber = () => {
  const prefix = 'CD'; // CD for Creepy Donut
  const timestamp = new Date().getTime().toString().slice(-6); // Last 6 digits of timestamp
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0'); // 3 random digits
  return `${prefix}${timestamp}${random}`;
};

const Order = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]); // Changed to array
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

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

        // First, fetch user data to get the username
        const userResponse = await fetch(`https://localhost:7002/api/Users/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUserName(userData.username); // Set the username from API response
        }

        // Then fetch orders
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
        // Add order numbers to the fetched data
        const ordersWithNumbers = data.map(order => ({
          ...order,
          orderNumber: generateOrderNumber()
        }));
        setOrders(ordersWithNumbers);
        
        // Set username from localStorage
        const name = localStorage.getItem('userName');
        if (name) setUserName(name);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  // Add this near your other useEffect hooks
  useEffect(() => {
    const handleBackButton = (e) => {
      e.preventDefault();
      navigate('/menu');
    };

    window.addEventListener('popstate', handleBackButton);

    // Cleanup listener when component unmounts
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [navigate]);

  const getStatusDisplay = (status) => {
    switch (status.toLowerCase()) {
      case 'unpaid':
        return 'Unpaid';  // Change Processing to Unpaid
      case 'delivering':
        return 'Delivering';
      case 'arrived':
        return 'Arrived';
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'unpaid':
        return 'text-red-600';  // Make Unpaid status red
      case 'delivering':
        return 'text-yellow-600';
      case 'arrived':
        return 'text-green-600';
      default:
        return 'text-gray-600';
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <div className="w-64 bg-[#e6d5c5]">
          {/* Profile Section */}
          <div className="p-6 text-center border-b border-[#6d4c2b]">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-3 bg-[#6d4c2b]">
              <User className="w-full h-full p-4 text-white" />
            </div>
            <p className="font-bold text-[#4a2b1b] text-2xl capitalize">{userName}</p>
          </div>

          {/* Navigation Menu */}
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

          {/* Logout Button */}
          <div className="p-4 mt-8">
            <button 
              onClick={() => {
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

        {/* Main Content */}
        <div className="flex-1 bg-[#f9f5f0] p-8 overflow-y-auto">
          <div className="mb-6 bg-[#e6d5c5] p-4 rounded-lg">
            <h1 className="text-2xl font-bold text-[#4a2b1b] flex items-center">
              <ShoppingBag className="w-6 h-6 mr-2" />
              My Orders
            </h1>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
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
                        onClick={() => navigate(`/order/${order.id}`)}
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
    </div>
  );
};

export default Order;