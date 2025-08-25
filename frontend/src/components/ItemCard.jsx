import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, User } from 'lucide-react';
import { formatDate, getItemStatusColor, getCategoryIcon, truncateText } from '../utils/helpers';

export default function ItemCard({ item, index = 0 }) {
  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card hover:shadow-lg transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative h-48 rounded-lg overflow-hidden mb-4">
        {item.images && item.images.length > 0 ? (
          <img
            src={item.images[0]}
            alt={item.itemName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-4xl">{getCategoryIcon(item.category)}</span>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getItemStatusColor(item.status)}`}>
            {item.status}
          </span>
        </div>

        {/* Type Badge */}
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.type === 'Lost' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
          }`}>
            {item.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg mb-1">
            {item.itemName}
          </h3>
          <p className="text-gray-600 text-sm">
            {truncateText(item.description, 80)}
          </p>
        </div>

        {/* Meta Information */}
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Calendar size={14} />
            <span>{formatDate(item.dateFound)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin size={14} />
            <span>{item.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <User size={14} />
            <span>By {item.reportedByAccountName || item.name}</span>
          </div>
        </div>

        {/* Category */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
            <span>{getCategoryIcon(item.category)}</span>
            <span className="capitalize">{item.category}</span>
          </span>
          
          <Link
            to={`/item/${item._id}`}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
          >
            View Details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}