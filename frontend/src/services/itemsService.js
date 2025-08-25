// BoltPatch: Complete itemsService implementation with proper multipart handling
import api from './api';
import routeMap from './routeMap';

export const itemsService = {
  async getLostItems() {
    const response = await api.get(routeMap.items.lost);
    return response.data;
  },

  async getFoundItems() {
    const response = await api.get(routeMap.items.found);
    return response.data;
  },

  async getLostItemsByCategory(category) {
    const response = await api.get(routeMap.items.lostByCategory(category));
    return response.data;
  },

  async getFoundItemsByCategory(category) {
    const response = await api.get(routeMap.items.foundByCategory(category));
    return response.data;
  },

  async createItem(formData) {
    // BoltPatch: Ensure proper multipart/form-data headers
    const response = await api.post(routeMap.items.create, formData, {
      headers: { 
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  async deleteItem(itemId) {
    const response = await api.delete(`${routeMap.items.delete}?itemId=${itemId}`);
    return response.data;
  },

  // BoltPatch: Additional helper methods
  async getItems(params = {}) {
    const response = await api.get(routeMap.items.list, { params });
    return response.data;
  },

  async getItem(id) {
    // Note: Backend doesn't have individual item endpoint, using list for now
    const response = await api.get(`${routeMap.items.list}/${id}`);
    return response.data;
  }
};