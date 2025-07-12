import React from 'react';
import { MessageCircle, Users, BookOpen, Heart, Github, Twitter, Mail, Shield, FileText, HelpCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">StackIt</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              A minimal Q&A platform for collaborative learning and structured knowledge sharing within communities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Community Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Community</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm">
                <Users className="w-4 h-4 mr-2" />
                Browse Communities
              </a>
              <a href="#" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Ask a Question
              </a>
              <a href="#" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm">
                <BookOpen className="w-4 h-4 mr-2" />
                Knowledge Base
              </a>
              <a href="#" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm">
                <Heart className="w-4 h-4 mr-2" />
                Top Contributors
              </a>
            </div>
          </div>

          {/* Support & Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Support</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm">
                <HelpCircle className="w-4 h-4 mr-2" />
                Help Center
              </a>
              <a href="#" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm">
                <FileText className="w-4 h-4 mr-2" />
                Guidelines
              </a>
              <a href="#" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm">
                <Shield className="w-4 h-4 mr-2" />
                Report Issues
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                Contact Support
              </a>
            </div>
          </div>

          {/* Platform Stats */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Platform</h3>
            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Questions</span>
                  <span className="font-medium">12.5K</span>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Answers</span>
                  <span className="font-medium">28.3K</span>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Users</span>
                  <span className="font-medium">3.2K</span>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Communities</span>
                  <span className="font-medium">147</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="max-w-md mx-auto lg:max-w-none lg:mx-0">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Stay Updated</h3>
            <p className="text-gray-600 text-sm mb-4">
              Get notified about new features and community highlights.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
              <span>© 2024 StackIt. All rights reserved.</span>
              <div className="flex space-x-6">
                <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Code of Conduct</a>
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-gray-500">
              Made with <Heart className="w-4 h-4 inline text-red-500" /> for the community
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}