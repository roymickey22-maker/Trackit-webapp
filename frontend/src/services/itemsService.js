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
    const response = await api.post(routeMap.items.create, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  async deleteItem(itemId) {
    const response = await api.delete(`${routeMap.items.delete}?itemId=${itemId}`);
    return response.data;
  }
};