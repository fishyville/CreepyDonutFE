import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// Import the same background images as Login
import LoginBG from '../assets/LoginBG.png';
import LoginBG2 from '../assets/LoginBG2.png';
import LoginBG3 from '../assets/LoginBG3.png';
import LoginBG4 from '../assets/LoginBG4.png';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const navigate = useNavigate();

  // Update backgroundImages array in Register component
  const backgroundImages = [
    LoginBG,
    LoginBG2,
    LoginBG3,
    LoginBG4
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const handleRegister = async () => {
    try {
      if (!email || !password) {
        alert('Please enter both email and password.');
        return;
      }

      const requestBody = {
        email,
        password,
      };

      const response = await fetch('https://localhost:7002/api/Users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        alert('Registration successful! Please log in.');
        navigate('/login'); // <-- Redirect to login page
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Registration failed.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
      console.error('Registration error:', error);
    }
  };

  const handleSocialLogin = (provider) => {
    // Add your social login logic here
    console.log(`Register with ${provider}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image Slideshow */}
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-[1]" />

      {/* Update z-index for decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm z-[2]"></div>
      <div className="absolute bottom-32 right-32 w-24 h-24 rounded-full bg-white/15 backdrop-blur-sm z-[2]"></div>
      <div className="absolute top-1/3 right-20 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm z-[2]"></div>
      <div className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm z-[2]"></div>

      {/* Register Form Container - Update z-index */}
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4 z-[3]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Register</h1>
        </div>

        <div className="space-y-6">
          {/* Email/Phone Input */}
          <div>
            <div className="block text-sm font-medium text-gray-700 mb-2">
              Email / Phone
            </div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter your email or phone"
            />
          </div>

          {/* Password Input */}
          <div>
            <div className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all pr-12"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            className="w-full bg-[#F2D9B1] hover:bg-[#6C4F36] text-[#6C4F36] hover:text-[#F2D9B1] font-semibold py-3 px-4 rounded-full transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
          >
            REGISTER
          </button>
        </div>

        {/* Social Login Section */}
        <div className="mt-8">
          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm">Or Sign-up Using:</p>
          </div>
          
          <div className="flex justify-center space-x-4 mb-6">
            {/* X (Twitter) */}
            <button
              onClick={() => handleSocialLogin('twitter')}
              className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
            >
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </button>

            {/* Facebook */}
            <button
              onClick={() => handleSocialLogin('facebook')}
              className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>

            {/* LINE */}
            <button
              onClick={() => handleSocialLogin('line')}
              className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
            >
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.630 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
              </svg>
            </button>

            {/* Google */}
            <button
              onClick={() => handleSocialLogin('google')}
              className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Or Sign-in Using:</p>
            <button
              onClick={() => navigate('/login')}
              className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
            >
              Sign-In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;