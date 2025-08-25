import api from './api';
import routeMap from './routeMap';

export const authService = {
  async login(credentials) {
    const formData = new FormData();
    Object.keys(credentials).forEach(key => {
      formData.append(key, credentials[key]);
    });
    
    const response = await api.post(routeMap.auth.login, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  async register(userData) {
    const response = await api.post(routeMap.auth.register, userData);
    return response.data;
  },

  async verifyEmail(token) {
    const response = await api.post(routeMap.auth.verifyEmail, { token });
    return response.data;
  },

  async getProfile() {
    const response = await api.get(routeMap.auth.me);
    return response.data;
  },

  async logout() {
    const response = await api.post(routeMap.auth.logout);
    return response.data;
  },

  async refreshToken() {
    const response = await api.post(routeMap.auth.refreshToken);
    return response.data;
  },

  async forgotPassword() {
    const response = await api.post(routeMap.auth.forgotPassword);
    return response.data;
  },

  async resetPassword(data) {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    
    const response = await api.put(routeMap.auth.resetPassword, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }
};