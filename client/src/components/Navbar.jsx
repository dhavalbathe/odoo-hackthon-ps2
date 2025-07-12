import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Bell, LogOut, Settings } from 'lucide-react';

export const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');

  const [user, setUser] = useState({
    isLoggedIn: true,
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format',
    email: 'john@example.com'
  });

  const [notifications] = useState([
    { id: 1, message: 'New answer on your question', time: '2 hours ago', unread: true },
    { id: 2, message: '@alice mentioned you in a comment', time: '1 day ago', unread: true },
    { id: 3, message: 'Your answer was accepted', time: '2 days ago', unread: false }
  ]);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const toggleUserDropdown = () => setIsUserDropdownOpen(prev => !prev);
  const toggleNotificationDropdown = () => setIsNotificationDropdownOpen(prev => !prev);

  const handleLogout = () => {
    setUser(prev => ({ ...prev, isLoggedIn: false }));
    setIsUserDropdownOpen(false);
  };

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    setIsUserDropdownOpen(false);
    setIsNotificationDropdownOpen(false);

    if (page === 'Home') navigate('/');
    else if (page === 'Ask Question') navigate('/ask-question');
    else if (page === 'My Questions') navigate('/my-questions');
    else if (page === 'Settings') navigate('/settings');
    else if (page === 'Login') navigate('/login');
    else if (page === 'Sign Up') navigate('/register');
    else if (page === 'Notifications') navigate('/notifications');
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  const navLinks = [
    { page: 'Home', label: 'Home' },
    { page: 'Ask Question', label: 'Ask Question' }
  ];

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button onClick={() => handleNavClick('Home')} className="flex items-center space-x-2 hover:opacity-80">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-gray-800">StackIt</span>
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-6 ml-auto">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentPage === link.page
                    ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user.isLoggedIn ? (
              <>
                <div className="relative">
                  <button onClick={toggleNotificationDropdown} className="relative p-2 text-gray-600 hover:text-blue-600">
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </div>

                <div className="relative">
                  <button onClick={toggleUserDropdown} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </button>
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <button onClick={() => handleNavClick('My Questions')} className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100">My Questions</button>
                      <button onClick={() => handleNavClick('Settings')} className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100">Settings</button>
                      <button onClick={handleLogout} className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">Logout</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <button onClick={() => handleNavClick('Login')} className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Login</button>
                <button onClick={() => handleNavClick('Sign Up')} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">Sign Up</button>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-blue-600">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {(isUserDropdownOpen || isNotificationDropdownOpen) && (
        <div className="fixed inset-0 z-40" onClick={() => { setIsUserDropdownOpen(false); setIsNotificationDropdownOpen(false); }} />
      )}
    </nav>
  );
};
