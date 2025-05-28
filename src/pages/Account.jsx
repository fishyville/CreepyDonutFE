import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingBag, Lock, History, LogOut } from 'lucide-react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import Profile from '../assets/profile.jpeg';
import ChatBot from '../component/Chatbot';
import Alert from '../component/Alert';

const Account = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    username: '' 
  });
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          navigate('/login');
          return;
        }

        const response = await fetch(`https://localhost:7002/api/Users/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`https://localhost:7002/api/Users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        setAlertMessage('Profile updated successfully!');
        setShowAlert(true);
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setAlertMessage('Failed to update profile');
      setShowAlert(true);
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
            <p className="font-bold text-[#4a2b1b] text-2xl capitalize">
              {userData.username || userData.firstName} 
            </p>
          </div>

      
          <nav className="p-4 space-y-2">
            <button className="flex items-center w-full p-3 bg-[#6d4c2b] text-white rounded">
              <User className="w-5 h-5 mr-3" />
              My Account
            </button>
            <button 
              onClick={() => {
                try {
                  navigate('/orders');
                } catch (error) {
                  console.error('Navigation error:', error);
                }
              }}
              className="flex items-center w-full p-3 text-[#4a2b1b] hover:bg-[#6d4c2b] hover:text-white rounded transition-colors"
            >
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
                navigate('/login');
              }}
              className="flex items-center w-full p-3 text-[#4a2b1b] hover:bg-[#6d4c2b] hover:text-white rounded transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Log Out
            </button>
          </div>
        </div>

        <div className="flex-1 bg-[#f9f5f0] p-8"> 
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-[#4a2b1b] mb-6">Personal Information</h2>
            <p className="text-gray-600 mb-6">
              refers to any data that can be used to identify an individual, either directly or indirectly.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[#4a2b1b] font-medium mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded bg-white hover:bg-[#e6d5c5] focus:bg-[#e6d5c5] focus:outline-none focus:ring-2 focus:ring-[#6d4c2b]"
                />
              </div>
              <div>
                <label className="block text-[#4a2b1b] font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded bg-white hover:bg-[#e6d5c5] focus:bg-[#e6d5c5] focus:outline-none focus:ring-2 focus:ring-[#6d4c2b]"
                />
              </div>
              <div>
                <label className="block text-[#4a2b1b] font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded bg-white hover:bg-[#e6d5c5] focus:bg-[#e6d5c5] focus:outline-none focus:ring-2 focus:ring-[#6d4c2b]"
                />
              </div>
              <div>
                <label className="block text-[#4a2b1b] font-medium mb-2">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded bg-white hover:bg-[#e6d5c5] focus:bg-[#e6d5c5] focus:outline-none focus:ring-2 focus:ring-[#6d4c2b]"
                />
              </div>
              <div>
                <label className="block text-[#4a2b1b] font-medium mb-2">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={userData.dateOfBirth?.split('T')[0] || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded bg-white hover:bg-[#e6d5c5] focus:bg-[#e6d5c5] focus:outline-none focus:ring-2 focus:ring-[#6d4c2b]"
                />
              </div>
              <div>
                <label className="block text-[#4a2b1b] font-medium mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded bg-white hover:bg-[#e6d5c5] focus:bg-[#e6d5c5] focus:outline-none focus:ring-2 focus:ring-[#6d4c2b]"
                />
              </div>
            </div>

        
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-[#6d4c2b] text-white rounded hover:bg-[#4a2b1b] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <ChatBot />
      <Footer />
      {showAlert && (
        <Alert 
          message={alertMessage} 
          onClose={() => setShowAlert(false)} 
        />
      )}
    </div>
  );
};

export default Account;