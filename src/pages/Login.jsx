import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // <-- Add this

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // <-- Add this

  const handleLogin = async () => {
    try {
      // Validate input
      if (!email || !password) {
        alert('Please enter both email and password.');
        return;
      }

      // Prepare the request body
      const requestBody = {
        email,
        password,
      };

      // Make the POST request to the API
      const response = await fetch('https://localhost:7002/api/Users/login-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // Check the response status
      if (response.ok) {
        // Successful login
        const data = await response.json();
        // Save userId to localStorage
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('username', data.username);
        // Navigate to Menu page
        navigate('/home');
      } else {
        // Handle errors
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleSocialLogin = (provider) => {
    // Add your social login logic here
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1200 800\"%3E%3Cdefs%3E%3ClinearGradient id=\"bg\" x1=\"0%25\" y1=\"0%25\" x2=\"100%25\" y2=\"100%25\"%3E%3Cstop offset=\"0%25\" style=\"stop-color:%23d4a574;stop-opacity:1\" /%3E%3Cstop offset=\"100%25\" style=\"stop-color:%23b8956b;stop-opacity:1\" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=\"100%25\" height=\"100%25\" fill=\"url(%23bg)\" /%3E%3C/svg%3E')"
        }}
      />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm"></div>
      <div className="absolute bottom-32 right-32 w-24 h-24 rounded-full bg-white/15 backdrop-blur-sm"></div>
      <div className="absolute top-1/3 right-20 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm"></div>
      <div className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm"></div>

      {/* Login Form Container */}
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4 z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Login</h1>
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
            <div className="flex justify-between items-center mb-2">
              <div className="block text-sm font-medium text-gray-700">
                Password
              </div>
              <button
                type="button"
                className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
                onClick={() => navigate('/reset')}
              >
                Forgot Password?
              </button>
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

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-semibold py-3 px-4 rounded-full transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
          >
            LOGIN
          </button>
        </div>

        {/* Social Login Section */}
        <div className="mt-8">
          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm">Or Sign-in Using:</p>
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
                <path d="M12 0C5.373 0 0 4.486 0 10.017c0 4.957 4.018 9.078 9.45 9.892.366-.252.75-.568 1.122-.93 2.267-2.203 3.714-5.254 3.714-8.615C14.286 4.486 18.759 0 12 0zM8.26 13.24H6.24V7.64h2.02v5.6zm2.76 0h-2.02V7.64h2.02v5.6zm2.76 0h-2.02V7.64h2.02v5.6zm2.76 0h-2.02V7.64h2.02v5.6z"/>
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

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Or Sign-up Using:</p>
            <button
              onClick={() => navigate('/register')}
              className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
            >
              Sign-Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;