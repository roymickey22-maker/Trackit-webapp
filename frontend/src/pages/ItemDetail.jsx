import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, User, Mail, Phone, Tag } from 'lucide-react';
import { formatDate, getItemStatusColor, getCategoryIcon } from '../utils/helpers';

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // In a real app, you'd fetch the item by ID
    // For now, we'll simulate loading
    const timer = setTimeout(() => {
      // Mock item data - replace with actual API call
      setItem({
        _id: id,
        itemName: 'iPhone 13 Pro',
        description: 'Blue iPhone 13 Pro with a clear case. Found near the library entrance.',
        category: 'electronics',
        type: 'Found',
        dateFound: '2024-01-15',
        location: 'Central Library',
        images: [
          'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
          'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg'
        ],
        status: 'Available',
        name: 'John Doe',
        email: 'john.doe@student.nitrr.ac.in',
        phone: '9876543210',
        reportedByAccountName: 'John Doe',
        createdAt: '2024-01-15T10:30:00Z'
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Item Not Found</h2>
          <p className="text-gray-600 mb-6">The item you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/browse')}
            className="btn-primary"
          >
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
              {item.images && item.images.length > 0 ? (
                <img
                  src={item.images[currentImageIndex]}
                  alt={item.itemName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl">{getCategoryIcon(item.category)}</span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {item.images && item.images.length > 1 && (
              <div className="flex space-x-2">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${item.itemName} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.type === 'Lost' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                }`}>
                  {item.type}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getItemStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.itemName}</h1>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>

            {/* Item Info */}
            <div className="glass-card">
              <h3 className="font-semibold text-gray-900 mb-4">Item Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Tag className="text-gray-400" size={18} />
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium capitalize flex items-center space-x-1">
                    <span>{getCategoryIcon(item.category)}</span>
                    <span>{item.category}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="text-gray-400" size={18} />
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{formatDate(item.dateFound)}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-gray-400" size={18} />
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{item.location}</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="glass-card">
              <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="text-gray-400" size={18} />
                  <span className="text-gray-600">Reported by:</span>
                  <span className="font-medium">{item.reportedByAccountName || item.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-gray-400" size={18} />
                  <span className="text-gray-600">Email:</span>
                  <a
                    href={`mailto:${item.email}`}
                    className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {item.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-gray-400" size={18} />
                  <span className="text-gray-600">Phone:</span>
                  <a
                    href={`tel:${item.phone}`}
                    className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {item.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`mailto:${item.email}?subject=Regarding ${item.itemName}&body=Hi ${item.name}, I saw your ${item.type.toLowerCase()} item report for ${item.itemName}. `}
                className="btn-primary flex-1 text-center"
              >
                Contact via Email
              </a>
              <a
                href={`tel:${item.phone}`}
                className="btn-secondary flex-1 text-center"
              >
                Call Now
              </a>
            </div>

            {/* Report Info */}
            <div className="text-sm text-gray-500 pt-4 border-t border-gray-200">
              <p>Reported on {formatDate(item.createdAt || item.dateFound)}</p>
              <p className="mt-1">Item ID: {item._id}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}