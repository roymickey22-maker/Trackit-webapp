import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Eye, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { itemsService } from '../services/itemsService';
import { formatDate, getItemStatusColor, getCategoryIcon } from '../utils/helpers';

export default function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.getProfile();
      
      if (response.success && response.data) {
        // The backend returns grouped data by type
        const allReports = [];
        response.data.forEach(group => {
          if (group.items) {
            allReports.push(...group.items);
          }
        });
        setReports(allReports);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch reports');
      console.error('Error fetching reports:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this report?')) {
      return;
    }

    try {
      setDeletingId(itemId);
      await itemsService.deleteItem(itemId);
      setReports(reports.filter(report => report._id !== itemId));
    } catch (err) {
      alert(err.message || 'Failed to delete report');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Reports</h1>
            <p className="text-gray-600">Manage your lost and found item reports</p>
          </div>
          <Link to="/report/new" className="btn-primary flex items-center space-x-2">
            <Plus size={20} />
            <span>New Report</span>
          </Link>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
          >
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchReports}
              className="mt-2 text-sm text-red-700 hover:text-red-800 underline"
            >
              Try again
            </button>
          </motion.div>
        )}

        {/* Reports */}
        {reports.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No reports yet</h3>
            <p className="text-gray-600 mb-6">You haven't submitted any item reports yet.</p>
            <Link to="/report/new" className="btn-primary">
              Create Your First Report
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report, index) => (
              <motion.div
                key={report._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card group hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                  {report.images && report.images.length > 0 ? (
                    <img
                      src={report.images[0]}
                      alt={report.itemName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-4xl">{getCategoryIcon(report.category)}</span>
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getItemStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      report.type === 'Lost' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {report.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">
                      {report.itemName}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {report.description}
                    </p>
                  </div>

                  {/* Meta Information */}
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} />
                      <span>{formatDate(report.dateFound)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={14} />
                      <span>{report.location}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                      <span>{getCategoryIcon(report.category)}</span>
                      <span className="capitalize">{report.category}</span>
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/item/${report._id}`}
                        className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(report._id)}
                        disabled={deletingId === report._id}
                        className="p-2 text-gray-600 hover:text-red-600 transition-colors disabled:opacity-50"
                        title="Delete Report"
                      >
                        {deletingId === report._id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}