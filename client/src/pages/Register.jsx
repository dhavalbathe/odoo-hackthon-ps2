import { useState } from 'react';
import { User, Mail, Lock, UserCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

export const Register = () => {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState('register');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    console.log("submiting form data", formData);

    try {
        console.log("Submitting registration data:", formData);
      const res = await API.post('/register', formData);
      console.log(res);

      console.log('Registration data:', userData);
      setCurrentPage('success');
      navigate('/login')

    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToRegister = () => {
    navigate('/login');
  };

  return currentPage === 'success' ? (
    // ✅ Success Page
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-md p-8 text-center border border-green-100">
        <div className="bg-gradient-to-r from-green-400 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <UserCheck className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Registration Successful!
        </h2>
        <p className="text-gray-600 mb-6">
          Your account has been created successfully. You can now sign in with your credentials.
        </p>
        <button
          onClick={handleBackToRegister}
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-2 rounded-full transition-all duration-200 transform hover:scale-105"
        >
          Log In
        </button>
      </div>
    </div>
  ) : (
    // ✅ Registration Form Page
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-5xl border border-purple-100 overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left side - Form */}
          <div className="flex-1 p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Join Us Today
                </h2>
                <p className="text-gray-600 text-sm mt-2">Create your account and get started</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Username</label>
                  <div className="relative">
                    <User className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className={`w-full pl-8 pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white/70 ${
                        errors.username ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="Enter username"
                    />
                  </div>
                  {errors.username && <p className="text-xs text-red-600 mt-1">{errors.username}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-8 pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white/70 ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="Enter email"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-8 pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white/70 ${
                        errors.password ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="Create password"
                    />
                  </div>
                  {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full pl-8 pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white/70 ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="Confirm password"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-medium text-gray-700 mb-1">Account Type</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white/70"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full py-2.5 px-4 rounded-lg font-medium text-white text-sm transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  'Creating Account...'
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-600">
                  Already have an account?{' '}
                  <a href="/login" className="text-purple-600 hover:text-purple-500 font-medium transition-colors">
                    Sign in here
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Illustration */}
           {/* Right - SVG Illustration */}
          <div className="flex-1 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <svg 
                viewBox="0 0 400 300" 
                className="w-full h-auto max-w-xs mx-auto drop-shadow-2xl"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9955FF"/>
                    <stop offset="100%" stopColor="#FF55B8"/>
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFB955"/>
                    <stop offset="100%" stopColor="#FF5595"/>
                  </linearGradient>
                  <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#55FFFF"/>
                    <stop offset="100%" stopColor="#55B9FF"/>
                  </linearGradient>
                </defs>

                <ellipse cx="80" cy="60" rx="40" ry="30" fill="url(#gradient1)" opacity="0.3"/>
                <ellipse cx="320" cy="80" rx="35" ry="45" fill="url(#gradient2)" opacity="0.2"/>
                <ellipse cx="300" cy="220" rx="50" ry="35" fill="url(#gradient3)" opacity="0.25"/>
                <ellipse cx="60" cy="240" rx="45" ry="30" fill="url(#gradient1)" opacity="0.2"/>

                <rect x="150" y="50" width="100" height="200" rx="15" fill="#3A3965"/>
                <rect x="160" y="70" width="80" height="160" rx="10" fill="url(#gradient1)"/>
                <circle cx="200" cy="120" r="20" fill="#9955FF"/>
                <circle cx="200" cy="120" r="12" fill="#FFFFFF"/>
                <circle cx="200" cy="120" r="6" fill="#9955FF"/>
                <rect x="170" y="150" width="60" height="12" rx="6" fill="#FFFFFF" opacity="0.8"/>
                <rect x="175" y="153" width="40" height="6" rx="3" fill="#9955FF"/>
                <rect x="170" y="170" width="60" height="12" rx="6" fill="#FFFFFF" opacity="0.8"/>
                <rect x="175" y="173" width="35" height="6" rx="3" fill="#9955FF"/>

                <g transform="translate(80, 120)">
                  <ellipse cx="0" cy="50" rx="20" ry="35" fill="#9955FF"/>
                  <circle cx="0" cy="0" r="22" fill="#FFB955"/>
                  <path d="M-15 -10Q0 -20 15 -10Q15 20 0 20Q-15 20 -15 -10Z" fill="#39234B"/>
                  <circle cx="-6" cy="-5" r="2" fill="#39234B"/>
                  <circle cx="6" cy="-5" r="2" fill="#39234B"/>
                  <ellipse cx="0" cy="5" rx="4" ry="3" fill="#FF5595"/>
                </g>

                <g transform="translate(280, 140)">
                  <ellipse cx="0" cy="60" rx="22" ry="40" fill="#39234B"/>
                  <rect x="-25" y="20" width="50" height="25" rx="12" fill="#55B9FF"/>
                  <circle cx="0" cy="0" r="20" fill="#FFB955"/>
                  <path d="M-12 -8Q0 -16 12 -8Q12 15 0 15Q-12 15 -12 -8Z" fill="#39234B"/>
                  <circle cx="-5" cy="-3" r="2" fill="#39234B"/>
                  <circle cx="5" cy="-3" r="2" fill="#39234B"/>
                  <ellipse cx="0" cy="7" rx="4" ry="3" fill="#FF5595"/>
                </g>

                <circle cx="120" cy="80" r="6" fill="#FF55B8" opacity="0.6"/>
                <circle cx="290" cy="60" r="4" fill="#55FFFF" opacity="0.7"/>
                <circle cx="110" cy="200" r="5" fill="#9955FF" opacity="0.5"/>
              </svg>

              <h3 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mt-4 mb-3">
                Start Your Journey
              </h3>
              <p className="text-gray-600 text-sm lg:text-base">
                Join thousands of users who trust our platform for their daily needs. Create your account in seconds!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
      
  );
};
