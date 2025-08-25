import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Plus, Users, TrendingUp } from 'lucide-react';
import SplineHero from '../components/SplineHero';

export default function Home() {
  const stats = [
    { icon: Search, label: 'Items Found', value: '1,234' },
    { icon: Plus, label: 'Reports Filed', value: '2,567' },
    { icon: Users, label: 'Active Users', value: '890' },
    { icon: TrendingUp, label: 'Success Rate', value: '78%' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
                  Track Your Lost Items
                </h1>
                <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                  Lost something at NIT Raipur? Found something that doesn't belong to you? 
                  TrackIt helps connect lost items with their rightful owners through our 
                  smart reporting system.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/browse" className="btn-primary text-lg px-8 py-3">
                  Browse Lost Items
                </Link>
                <Link to="/report/new" className="btn-secondary text-lg px-8 py-3">
                  Report an Item
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 pt-8">
                {stats.slice(0, 2).map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="glass-card text-center"
                  >
                    <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - 3D Hero */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <SplineHero sceneUrl="https://prod.spline.design/your-scene-url/scene.splinecode" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How TrackIt Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our simple three-step process helps reunite lost items with their owners
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Report',
                description: 'Found or lost something? Create a detailed report with photos and location information.',
                icon: Plus
              },
              {
                step: '02',
                title: 'Browse',
                description: 'Search through our database of reported items using smart filters and categories.',
                icon: Search
              },
              {
                step: '03',
                title: 'Connect',
                description: 'Get in touch with the reporter through our secure contact system.',
                icon: Users
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="glass-card text-center group hover:shadow-xl transition-all duration-300"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-white text-blue-600 font-bold text-sm px-2 py-1 rounded-full border-2 border-blue-600">
                    {feature.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card text-center group hover:shadow-lg transition-all duration-300"
              >
                <stat.icon className="h-12 w-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-white">
              Ready to Find Your Lost Item?
            </h2>
            <p className="text-xl text-blue-100">
              Join thousands of NIT Raipur students and staff who trust TrackIt 
              to help them recover their lost belongings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/auth/register" 
                className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Get Started Today
              </Link>
              <Link 
                to="/browse" 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-medium py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Browse Items
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}