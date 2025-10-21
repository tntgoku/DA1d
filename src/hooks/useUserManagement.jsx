import { useState, useEffect, useCallback,useMemo } from 'react';
import { 
  getAllUsers, 
  createUser, 
  updateUser, 
  deleteUser, 
  searchUsers,
  toggleUserStatus,
  resetUserPassword,
  makeAdmin,
  makeUser
} from '../services/UserService';

export const useUserManagement = () => {
  // State management
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter state
  const [filters, setFilters] = useState({
    searchTerm: '',
    roleFilter: '',
    statusFilter: '',
    ordersFilter: ''
  });
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    dateOfBirth: '',
    notes: '',
    account: null,
    role: null,
    totalOrders: 0,
    totalSpent: 0,
    emailVerified: false,
    phoneVerified: false
  });

  // Load users from API
  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllUsers();
      console.log('API Response:', response);
      
      if (response.status === 200 && response.data) {
        const mappedUsers = response.data.map(user => ({
          id: user.idUser,
          name: user.fullName,
          email: user.email,
          phone: user.phone,
          role: user.roleName || 'Người dùng',
          status: user.status ? 'Active' : 'Inactive',
          username: user.username,
          accountId: user.accountId,
          roleId: user.roleId,
          address: user.address,
          totalOrders: user.totalOrders,
          totalSpent: user.totalSpent,
          createdAt: user.createdAt
        }));
        setUsers(mappedUsers);
        setTotalItems(mappedUsers.length);
      }
    } catch (error) {
      console.error('Error loading users:', error);
      setError('Không thể tải danh sách người dùng: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  }, []);

  // Search users
  const searchUsersHandler = useCallback(async (searchTerm) => {
    if (!searchTerm.trim()) {
      await loadUsers();
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const response = await searchUsers(searchTerm);
      console.log('Search response:', response);
      
      if (response.status === 200 && response.data) {
        const mappedUsers = response.data.map(user => ({
          id: user.idUser,
          name: user.fullName,
          email: user.email,
          phone: user.phone,
          role: user.roleName || 'Người dùng',
          status: user.status ? 'Active' : 'Inactive',
          username: user.username,
          accountId: user.accountId,
          roleId: user.roleId,
          address: user.address,
          totalOrders: user.totalOrders,
          totalSpent: user.totalSpent,
          createdAt: user.createdAt
        }));
        setUsers(mappedUsers);
        setTotalItems(mappedUsers.length);
      }
    } catch (error) {
      console.error('Error searching users:', error);
      setError('Không thể tìm kiếm người dùng: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  }, [loadUsers]);

  // Create user
  const createUserHandler = useCallback(async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await createUser(userData);
      console.log('Create response:', response);
      
      if (response.status === 200) {
        await loadUsers();
        return { success: true, message: 'Thêm người dùng thành công!' };
      }
    } catch (error) {
      console.error('Error creating user:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Không thể tạo người dùng';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [loadUsers]);

  // Update user
  const updateUserHandler = useCallback(async (userId, userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await updateUser(userId, userData);
      console.log('Update response:', response);
      
      if (response.status === 200) {
        await loadUsers();
        return { success: true, message: 'Cập nhật người dùng thành công!' };
      }
    } catch (error) {
      console.error('Error updating user:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Không thể cập nhật người dùng';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [loadUsers]);

  // Delete user
  const deleteUserHandler = useCallback(async (userId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await deleteUser(userId);
      
      if (response.status === 200) {
        await loadUsers();
        return { success: true, message: 'Xóa người dùng thành công!' };
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Không thể xóa người dùng';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [loadUsers]);

  // Toggle user status
  const toggleUserStatusHandler = useCallback(async (userId, currentStatus) => {
    try {
      setLoading(true);
      const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
      const response = await toggleUserStatus(userId, newStatus);
      
      if (response.status === 200) {
        await loadUsers();
        return { success: true, message: `Đã thay đổi trạng thái người dùng thành ${newStatus}` };
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
      return { success: false, message: 'Có lỗi xảy ra khi thay đổi trạng thái' };
    } finally {
      setLoading(false);
    }
  }, [loadUsers]);

  // Reset user password
  const resetUserPasswordHandler = useCallback(async (userId, newPassword) => {
    if (!newPassword || newPassword.trim() === '') {
      return { success: false, message: 'Mật khẩu không được để trống' };
    }
    
    try {
      setLoading(true);
      const response = await resetUserPassword(userId, newPassword);
      
      if (response.status === 200) {
        return { success: true, message: 'Đặt lại mật khẩu thành công!' };
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      return { success: false, message: 'Có lỗi xảy ra khi đặt lại mật khẩu: ' + (error.response?.data?.message || error.message) };
    } finally {
      setLoading(false);
    }
  }, []);

  // Form handlers
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      gender: '',
      dateOfBirth: '',
      notes: '',
      account: null,
      role: null,
      totalOrders: 0,
      totalSpent: 0,
      emailVerified: false,
      phoneVerified: false
    });
    setEditingUser(null);
  }, []);

  const openCreateModal = useCallback(() => {
    resetForm();
    setShowModal(true);
  }, [resetForm]);

  const openEditModal = useCallback((user) => {
    setEditingUser(user);
    setFormData({
      fullName: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      gender: user.gender || '',
      dateOfBirth: user.dateOfBirth || '',
      notes: user.notes || '',
      account: user.accountId,
      role: user.roleId || null, // Map role ID
      totalOrders: user.totalOrders || 0,
      totalSpent: user.totalSpent || 0,
      emailVerified: user.emailVerified || false,
      phoneVerified: user.phoneVerified || false
    });
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    resetForm();
  }, [resetForm]);

  // Pagination handlers
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const handleNextPage = useCallback(() => {
    const totalPages = Math.ceil(users.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, users.length, itemsPerPage]);

  // Filter users based on filters
  const filteredUsers = useMemo(() => {
    let filtered = users;

    // Search filter
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(user => 
        (user.name && user.name.toLowerCase().includes(term)) ||
        (user.email && user.email.toLowerCase().includes(term)) ||
        (user.phone && user.phone.includes(term))
      );
    }

    // Role filter
    if (filters.roleFilter) {
      filtered = filtered.filter(user => user.role === filters.roleFilter);
    }

    // Status filter
    if (filters.statusFilter) {
      filtered = filtered.filter(user => user.status === filters.statusFilter);
    }

    // Orders filter
    if (filters.ordersFilter) {
      const orders = parseInt(filters.ordersFilter);
      if (!isNaN(orders)) {
        if (orders === 0) {
          filtered = filtered.filter(user => user.totalOrders === 0);
        } else if (orders === 1) {
          filtered = filtered.filter(user => user.totalOrders >= 1 && user.totalOrders <= 5);
        } else if (orders === 2) {
          filtered = filtered.filter(user => user.totalOrders >= 6 && user.totalOrders <= 10);
        } else if (orders === 3) {
          filtered = filtered.filter(user => user.totalOrders > 10);
        }
      }
    }

    return filtered;
  }, [users, filters]);

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Role management handlers
  const makeAdminHandler = useCallback(async (email) => {
    try {
      setLoading(true);
      setError(null);
      await makeAdmin(email);
      await loadUsers(); // Reload users to reflect changes
      console.log('User promoted to admin successfully');
    } catch (error) {
      console.error('Make admin error:', error);
      setError('Không thể cập nhật quyền admin');
    } finally {
      setLoading(false);
    }
  }, [loadUsers]);

  const makeUserHandler = useCallback(async (email) => {
    try {
      setLoading(true);
      setError(null);
      await makeUser(email);
      await loadUsers(); // Reload users to reflect changes
      console.log('User demoted to user successfully');
    } catch (error) {
      console.error('Make user error:', error);
      setError('Không thể cập nhật quyền user');
    } finally {
      setLoading(false);
    }
  }, [loadUsers]);

  return {
    // State
    users,
    loading,
    error,
    currentPage,
    itemsPerPage,
    totalItems,
    searchTerm,
    filters,
    filteredUsers,
    showModal,
    editingUser,
    formData,
    
    // Actions
    loadUsers,
    searchUsers: searchUsersHandler,
    createUser: createUserHandler,
    updateUser: updateUserHandler,
    deleteUser: deleteUserHandler,
    toggleUserStatus: toggleUserStatusHandler,
    resetUserPassword: resetUserPasswordHandler,
    makeAdmin: makeAdminHandler,
    makeUser: makeUserHandler,
    
    // Form handlers
    handleInputChange,
    resetForm,
    openCreateModal,
    openEditModal,
    closeModal,
    
    // Pagination handlers
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
    
    // Setters
    setSearchTerm,
    setFilters,
    setError
  };
};
