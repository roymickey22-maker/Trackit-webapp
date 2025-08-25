import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass-card border-t border-white/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TrackIt
              </span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Lost and found website for people of NIT Raipur. Helping students and staff reconnect with their lost belongings.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin size={16} />
                <span>NIT Raipur, Chhattisgarh</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/browse" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Browse Items
                </Link>
              </li>
              <li>
                <Link to="/report/new" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Report Item
                </Link>
              </li>
              <li>
                <Link to="/me/reports" className="text-gray-600 hover:text-blue-600 transition-colors">
                  My Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@trackit.nitrr.ac.in" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center space-x-2">
                  <Mail size={16} />
                  <span>Contact Us</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-gray-600">
          <p>&copy; 2024 TrackIt - NIT Raipur. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}