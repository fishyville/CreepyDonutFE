import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingBag, Lock, History, LogOut } from 'lucide-react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

const HistoryPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    username: localStorage.getItem('username') || 'User'
  });

  // Sample data - replace with actual API call
  const sampleOrders = [
    {
      id: 1,
      orderNumber: '0684394839820482472',
      orderDate: '12 September 2024',
      total: 'Rp 5.000.000'
    },
    {
      id: 2,
      orderNumber: '0684394839820482472',
      orderDate: '12 September 2024',
      total: 'Rp 5.000.000'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setOrders(sampleOrders);
    setLoading(false);
  }, []);

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
            <p className="font-bold text-[#4a2b1b] text-2xl capitalize">
              {userData.username}
            </p>
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
            <button 
              onClick={() => navigate('/orders')}
              className="flex items-center w-full p-3 text-[#4a2b1b] hover:bg-[#6d4c2b] hover:text-white rounded transition-colors"
            >
              <ShoppingBag className="w-5 h-5 mr-3" />
              My Order
            </button>
            <button 
              onClick={() => navigate('/reset')}
              className="flex items-center w-full p-3 text-[#4a2b1b] hover:bg-[#6d4c2b] hover:text-white rounded transition-colors"
            >
              <Lock className="w-5 h-5 mr-3" />
              Change Password
            </button>
            <button className="flex items-center w-full p-3 bg-[#6d4c2b] text-white rounded">
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
        <div className="flex-1 bg-[#f9f5f0] p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#4a2b1b] flex items-center">
              <History className="w-8 h-8 mr-2" />
              History
            </h1>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-600">Total:</p>
                    <p className="font-bold text-[#4a2b1b] text-xl">{order.total}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/order/${order.id}`)}
                    className="px-4 py-2 bg-[#6d4c2b] text-white rounded hover:bg-[#4a2b1b] transition-colors"
                  >
                    View Details
                  </button>
                </div>
                <div className="text-gray-600">
                  <p>Order No: {order.orderNumber}</p>
                  <p>Order Date: {order.orderDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HistoryPage;