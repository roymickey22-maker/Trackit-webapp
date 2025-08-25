import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import ItemForm from '../components/ItemForm';
import { itemsService } from '../services/itemsService';
import useStore from '../store/useStore';

export default function NewReport() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { addItem } = useStore();

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await itemsService.createItem(formData);
      
      if (response.success) {
        setSuccess(true);
        // Add to store cache
        addItem(response.data);
        
        // Redirect after success
        setTimeout(() => {
          navigate('/me/reports');
        }, 2000);
      } else {
        throw new Error(response.message || 'Failed to create report');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to submit report');
      console.error('Error creating report:', err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Report Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your item report has been successfully submitted. You'll be redirected to your reports page shortly.
          </p>
          <button
            onClick={() => navigate('/me/reports')}
            className="btn-primary"
          >
            View My Reports
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Report an Item</h1>
          <p className="text-gray-600">
            Help others find their lost items or report something you've found
          </p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
          >
            <p className="text-red-600">{error}</p>
          </motion.div>
        )}

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ItemForm onSubmit={handleSubmit} loading={loading} />
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 glass-card"
        >
          <h3 className="font-semibold text-gray-900 mb-4">Tips for Better Reports</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Include clear, well-lit photos from multiple angles</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Be specific about the location where the item was found/lost</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Provide detailed descriptions including brand, color, and unique features</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Double-check your contact information for accuracy</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}