import { apiClient } from "./getAPI";
import { API_ENDPOINTS } from '../constants/userConstants';

// API lấy tất cả người dùng
export const getAllUsers = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.USERS);
    return response.data;
  } catch (error) {
    console.error("Get all users error:", error);
    throw error;
  }
};

// API lấy người dùng theo ID
export const getUserById = async (id) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.USER_BY_ID(id));
    return response.data;
  } catch (error) {
    console.error("Get user by ID error:", error);
    throw error;
  }
};

// API tạo người dùng mới
export const createUser = async (userData) => {
  try {
    // Format dữ liệu để khớp với backend
    const formattedData = {
      ...userData,
      // Chuyển đổi dateOfBirth từ string sang LocalDate format
      dateOfBirth: userData.dateOfBirth && userData.dateOfBirth !== '' ? userData.dateOfBirth : null,
      // Chuyển đổi totalOrders từ string sang number
      totalOrders: userData.totalOrders ? parseInt(userData.totalOrders) : 0,
      // Chuyển đổi totalSpent từ number sang BigDecimal format
      totalSpent: userData.totalSpent ? parseFloat(userData.totalSpent) : 0,
      // Xóa createdAt và updatedAt vì backend sẽ tự set
      createdAt: undefined,
      updatedAt: undefined
    };
    
    console.log('Formatted data for create:', formattedData);
    
    const response = await apiClient.post(API_ENDPOINTS.USERS, formattedData);
    return response.data;
  } catch (error) {
    console.error("Create user error:", error);
    throw error;
  }
};

// API cập nhật người dùng
export const updateUser = async (id, userData) => {
  try {
    // Format dữ liệu để khớp với backend
    const formattedData = {
      ...userData,
      // Chuyển đổi dateOfBirth từ string sang LocalDate format
      dateOfBirth: userData.dateOfBirth && userData.dateOfBirth !== '' ? userData.dateOfBirth : null,
      // Chuyển đổi totalOrders từ string sang number
      totalOrders: userData.totalOrders ? parseInt(userData.totalOrders) : 0,
      // Chuyển đổi totalSpent từ number sang BigDecimal format
      totalSpent: userData.totalSpent ? parseFloat(userData.totalSpent) : 0,
      // Chuyển đổi role từ string sang number
      role: userData.role ? parseInt(userData.role) : null,
      // Xóa các field không cần thiết để tránh lỗi
      createdAt: undefined,
      updatedAt: undefined,
      account: undefined // Không gửi account_id để tránh mất liên kết
    };
    
    console.log('Formatted data for update:', formattedData);
    
    const response = await apiClient.put(API_ENDPOINTS.USER_BY_ID(id), formattedData);
    return response.data;
  } catch (error) {
    console.error("Update user error:", error);
    throw error;
  }
};

// API xóa người dùng
export const deleteUser = async (id) => {
  try {
    const response = await apiClient.delete(API_ENDPOINTS.USER_BY_ID(id));
    return response.data;
  } catch (error) {
    console.error("Delete user error:", error);
    throw error;
  }
};

// API tìm kiếm người dùng
export const searchUsers = async (searchTerm) => {
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.USER_SEARCH}?q=${encodeURIComponent(searchTerm)}`);
    return response.data;
  } catch (error) {
    console.error("Search users error:", error);
    throw error;
  }
};

// API lấy thống kê người dùng
export const getUserStats = async () => {
  try {
    const response = await apiClient.get("user/stats");
    return response.data;
  } catch (error) {
    console.error("Get user stats error:", error);
    throw error;
  }
};

// API thay đổi trạng thái người dùng (Active/Inactive)
export const toggleUserStatus = async (id, status) => {
  try {
    const response = await apiClient.patch(API_ENDPOINTS.USER_STATUS(id), { status });
    return response.data;
  } catch (error) {
    console.error("Toggle user status error:", error);
    throw error;
  }
};

// API thay đổi role người dùng
export const updateUserRole = async (id, role) => {
  try {
    const response = await apiClient.patch(API_ENDPOINTS.USER_ROLE(id), { role });
    return response.data;
  } catch (error) {
    console.error("Update user role error:", error);
    throw error;
  }
};

// API reset mật khẩu người dùng
export const resetUserPassword = async (id, newPassword) => {
  try {
    const response = await apiClient.patch(API_ENDPOINTS.USER_RESET_PASSWORD(id), { newPassword });
    return response.data;
  } catch (error) {
    console.error("Reset user password error:", error);
    throw error;
  }
};

// API cập nhật role người dùng thành ADMIN
export const makeAdmin = async (email) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.MAKE_ADMIN, {
      email: email
    });
    return response.data;
  } catch (error) {
    console.error("Make admin error:", error);
    throw error;
  }
};

// API cập nhật role người dùng thành USER
export const makeUser = async (email) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.MAKE_USER, {
      email: email
    });
    return response.data;
  } catch (error) {
    console.error("Make user error:", error);
    throw error;
  }
};
