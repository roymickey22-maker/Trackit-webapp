import { useEffect } from 'react';
import useStore from '../store/useStore';
import { authService } from '../services/authService';

export default function useAuth() {
  const { user, token, isAuthenticated, setAuth, logout, setLoading, setError } = useStore();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && !user) {
      // Try to get user profile if we have token but no user data
      authService.getProfile()
        .then(response => {
          if (response.success && response.data) {
            setAuth(response.data, storedToken);
          }
        })
        .catch(() => {
          // Token might be expired, clear it
          logout();
        });
    }

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login(credentials);
      
      if (response.success && response.data) {
        // Extract token from cookies or response
        const authToken = response.data.accessToken || token;
        setAuth(response.data, authToken);
        return response;
      }
      throw new Error(response.message || 'Login failed');
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      logout();
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout: handleLogout,
    loading: useStore(state => state.isLoading),
    error: useStore(state => state.error)
  };
}