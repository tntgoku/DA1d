import { apiClient } from './getAPI';

export const InventoryService = {
  // Lấy tất cả inventory
  getAllInventory: async () => {
    try {
      const response = await apiClient.get('/inventory');
      return response.data;
    } catch (error) {
      console.error('Error fetching inventory:', error);
      throw error;
    }
  },

  // Lấy inventory theo ID
  getInventoryById: async (id) => {
    try {
      const response = await apiClient.get(`/inventory/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching inventory by ID:', error);
      throw error;
    }
  },

  // Tạo inventory mới
  createInventory: async (inventoryData) => {
    try {
      const response = await apiClient.post('/inventory', inventoryData);
      return response.data;
    } catch (error) {
      console.error('Error creating inventory:', error);
      throw error;
    }
  },

  // Cập nhật inventory
  updateInventory: async (id, inventoryData) => {
    try {
      const response = await apiClient.put(`/inventory/${id}`, inventoryData);
      return response.data;
    } catch (error) {
      console.error('Error updating inventory:', error);
      throw error;
    }
  },

  // Xóa inventory
  deleteInventory: async (id) => {
    try {
      const response = await apiClient.delete(`/inventory/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting inventory:', error);
      throw error;
    }
  },

  // Cập nhật số lượng tồn kho
  updateStock: async (id, stockData) => {
    try {
      const response = await apiClient.patch(`/inventory/${id}/stock`, stockData);
      return response.data;
    } catch (error) {
      console.error('Error updating stock:', error);
      throw error;
    }
  },

  // Lấy lịch sử nhập/xuất kho
  getInventoryHistory: async (id) => {
    try {
      const response = await apiClient.get(`/inventory/${id}/history`);
      return response.data;
    } catch (error) {
      console.error('Error fetching inventory history:', error);
      throw error;
    }
  },

  // Nhập kho
  importStock: async (id, importData) => {
    try {
      const response = await apiClient.post(`/inventory/${id}/import`, importData);
      return response.data;
    } catch (error) {
      console.error('Error importing stock:', error);
      throw error;
    }
  },

  // Xuất kho
  exportStock: async (id, exportData) => {
    try {
      const response = await apiClient.post(`/inventory/${id}/export`, exportData);
      return response.data;
    } catch (error) {
      console.error('Error exporting stock:', error);
      throw error;
    }
  },

  // Lấy báo cáo tồn kho
  getInventoryReport: async (filters = {}) => {
    try {
      const response = await apiClient.get('/inventory/report', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching inventory report:', error);
      throw error;
    }
  },

  // Lấy sản phẩm sắp hết hàng
  getLowStockProducts: async (threshold = 10) => {
    try {
      const response = await apiClient.get(`/inventory/low-stock?threshold=${threshold}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching low stock products:', error);
      throw error;
    }
  },

  // Lấy sản phẩm hết hàng
  getOutOfStockProducts: async () => {
    try {
      const response = await apiClient.get('/inventory/out-of-stock');
      return response.data;
    } catch (error) {
      console.error('Error fetching out of stock products:', error);
      throw error;
    }
  }
};
