import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoginBG from '../assets/LoginBG.png';
import LoginBG2 from '../assets/LoginBG2.png';
import LoginBG3 from '../assets/LoginBG3.png';
import LoginBG4 from '../assets/LoginBG4.png';

const backgroundImages = [
  LoginBG,
  LoginBG2,
  LoginBG3,
  LoginBG4
];

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate(); 

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const handleContinue = async () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!email || !newPassword) {
      alert('Please fill all fields.');
      return;
    }
    try {
      const response = await fetch('https://localhost:7002/api/Users/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          newPassword,
          confirmPassword,
        }),
      });

      if (response.ok) {
        alert('Password reset successful! Please log in.');
        navigate('/login');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Password reset failed.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
      console.error('Reset password error:', error);
    }
  };

  const handleCancel = () => {
    console.log('Cancel reset password');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${image})`,
            opacity: currentImageIndex === index ? 1 : 0,
            zIndex: 0
          }}
        />
      ))}

      
      <div className="absolute inset-0 bg-black/30 z-[1]" />

      
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm z-[2]"></div>
      <div className="absolute bottom-32 right-32 w-24 h-24 rounded-full bg-white/15 backdrop-blur-sm z-[2]"></div>
      <div className="absolute top-1/3 right-20 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm z-[2]"></div>
      <div className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm z-[2]"></div>

      
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4 z-[3]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h1>
        </div>

        <div className="space-y-6">
      
          <div>
            <div className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter your email"
            />
          </div>

         
          <div>
            <div className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </div>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all pr-12"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          
          <div>
            <div className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all pr-12"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleContinue}
              className="flex-1 bg-[#F2D9B1] hover:bg-[#6C4F36] text-[#6C4F36] hover:text-[#F2D9B1] font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
            >
              Continue
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;