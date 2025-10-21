import { useState, useEffect } from 'react';
import { InventoryService } from '../services/InventoryService';

export const useInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStock: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
    totalValue: 0
  });

  // Load all inventory
  const loadInventory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await InventoryService.getAllInventory();
      if (response && response.status === 200) {
        setInventory(response.data || []);
        console.log('✅ Inventory loaded successfully:', response.data?.length);
      } else {
        throw new Error(response?.message || 'Failed to load inventory');
      }
    } catch (err) {
      console.error('❌ Error loading inventory:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load inventory stats
  const loadStats = async () => {
    try {
      const response = await InventoryService.getInventoryReport();
      if (response && response.status === 200) {
        setStats(response.data || stats);
        console.log('✅ Inventory stats loaded:', response.data);
      }
    } catch (err) {
      console.error('❌ Error loading inventory stats:', err);
    }
  };

  // Create new inventory item
  const createInventory = async (inventoryData) => {
    setLoading(true);
    try {
      const response = await InventoryService.createInventory(inventoryData);
      if (response && response.status === 200) {
        await loadInventory(); // Reload inventory
        await loadStats(); // Reload stats
        console.log('✅ Inventory created successfully');
        return { success: true, data: response.data };
      } else {
        throw new Error(response?.message || 'Failed to create inventory');
      }
    } catch (err) {
      console.error('❌ Error creating inventory:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Update inventory item
  const updateInventory = async (id, inventoryData) => {
    setLoading(true);
    try {
      const response = await InventoryService.updateInventory(id, inventoryData);
      if (response && response.status === 200) {
        await loadInventory(); // Reload inventory
        await loadStats(); // Reload stats
        console.log('✅ Inventory updated successfully');
        return { success: true, data: response.data };
      } else {
        throw new Error(response?.message || 'Failed to update inventory');
      }
    } catch (err) {
      console.error('❌ Error updating inventory:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Delete inventory item
  const deleteInventory = async (id) => {
    setLoading(true);
    try {
      const response = await InventoryService.deleteInventory(id);
      if (response && response.status === 200) {
        await loadInventory(); // Reload inventory
        await loadStats(); // Reload stats
        console.log('✅ Inventory deleted successfully');
        return { success: true };
      } else {
        throw new Error(response?.message || 'Failed to delete inventory');
      }
    } catch (err) {
      console.error('❌ Error deleting inventory:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Update stock quantity
  const updateStock = async (id, stockData) => {
    setLoading(true);
    try {
      const response = await InventoryService.updateStock(id, stockData);
      if (response && response.status === 200) {
        await loadInventory(); // Reload inventory
        await loadStats(); // Reload stats
        console.log('✅ Stock updated successfully');
        return { success: true, data: response.data };
      } else {
        throw new Error(response?.message || 'Failed to update stock');
      }
    } catch (err) {
      console.error('❌ Error updating stock:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Import stock
  const importStock = async (id, importData) => {
    setLoading(true);
    try {
      const response = await InventoryService.importStock(id, importData);
      if (response && response.status === 200) {
        await loadInventory(); // Reload inventory
        await loadStats(); // Reload stats
        console.log('✅ Stock imported successfully');
        return { success: true, data: response.data };
      } else {
        throw new Error(response?.message || 'Failed to import stock');
      }
    } catch (err) {
      console.error('❌ Error importing stock:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Export stock
  const exportStock = async (id, exportData) => {
    setLoading(true);
    try {
      const response = await InventoryService.exportStock(id, exportData);
      if (response && response.status === 200) {
        await loadInventory(); // Reload inventory
        await loadStats(); // Reload stats
        console.log('✅ Stock exported successfully');
        return { success: true, data: response.data };
      } else {
        throw new Error(response?.message || 'Failed to export stock');
      }
    } catch (err) {
      console.error('❌ Error exporting stock:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Get low stock products
  const getLowStockProducts = async (threshold = 10) => {
    try {
      const response = await InventoryService.getLowStockProducts(threshold);
      if (response && response.status === 200) {
        return { success: true, data: response.data };
      } else {
        throw new Error(response?.message || 'Failed to get low stock products');
      }
    } catch (err) {
      console.error('❌ Error getting low stock products:', err);
      return { success: false, error: err.message };
    }
  };

  // Get out of stock products
  const getOutOfStockProducts = async () => {
    try {
      const response = await InventoryService.getOutOfStockProducts();
      if (response && response.status === 200) {
        return { success: true, data: response.data };
      } else {
        throw new Error(response?.message || 'Failed to get out of stock products');
      }
    } catch (err) {
      console.error('❌ Error getting out of stock products:', err);
      return { success: false, error: err.message };
    }
  };

  // Load data on mount
  useEffect(() => {
    loadInventory();
    loadStats();
  }, []);

  return {
    // State
    inventory,
    loading,
    error,
    stats,
    
    // Actions
    loadInventory,
    loadStats,
    createInventory,
    updateInventory,
    deleteInventory,
    updateStock,
    importStock,
    exportStock,
    getLowStockProducts,
    getOutOfStockProducts,
    
    // Utilities
    setError
  };
};
