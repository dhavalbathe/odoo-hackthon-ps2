import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import signImage from '../assets/sign.jpg';

export const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // ✅ useNavigate hook

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
    // ✅ TODO: Authenticate with backend

    // ✅ Navigate to dashboard or home
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-orange-100 to-purple-100 flex justify-center items-center px-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl flex flex-col md:flex-row overflow-hidden">
        {/* Illustration Side */}
        <div className="md:w-1/2 bg-gradient-to-tr from-pink-400 to-purple-500 p-4 flex justify-center items-center">
          <img 
            src={signImage}
            alt="Sign in illustration" 
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Form Side */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign In</h2>

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Password with Eye toggle */}
            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition"
            >
              Sign In
            </button>

            {/* Register Link */}
            <p className="text-sm mt-4 text-center text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-purple-500 font-semibold hover:underline">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
