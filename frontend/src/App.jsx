import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotificationsDrawer from './components/NotificationsDrawer';

// Pages
import Home from './pages/Home';
import Browse from './pages/Browse';
import ItemDetail from './pages/ItemDetail';
import NewReport from './pages/NewReport';
import MyReports from './pages/MyReports';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';

// Hooks
import useAuth from './hooks/useAuth';
import useSocket from './hooks/useSocket';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
};

function App() {
  useSocket(); // Initialize socket connection

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <motion.main 
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/report/new" element={
              <ProtectedRoute>
                <NewReport />
              </ProtectedRoute>
            } />
            <Route path="/me" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/me/reports" element={
              <ProtectedRoute>
                <MyReports />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.main>
        <Footer />
        <NotificationsDrawer />
      </div>
    </Router>
  );
}

export default App;