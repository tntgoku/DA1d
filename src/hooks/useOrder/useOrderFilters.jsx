import { useState, useMemo } from 'react';

export const useOrderFilters = (orders) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter orders based on search term and status
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.orderCode?.toString().includes(searchTerm);
      const matchesStatus = statusFilter === 'all' || order.orderStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  // Clear filters
  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  // Get filter summary
  const getFilterSummary = () => {
    const total = orders.length;
    const filtered = filteredOrders.length;
    return { total, filtered, isFiltered: total !== filtered };
  };

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredOrders,
    clearFilters,
    getFilterSummary
  };
};
