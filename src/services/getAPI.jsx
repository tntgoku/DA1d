import axios from "axios";

const API_GET_PROVINCES_URL = "https://esgoo.net/api-tinhthanh-new/1/0.htm";
const API_BE = "http://localhost:8080/api/";

export const apiClient = axios.create({
  baseURL: API_BE, // Replace with your API base URL
  timeout: 10000, // Request timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor để thêm token vào header
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor để xử lý lỗi
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      console.warn('Token expired or invalid, redirecting to login');
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      // Only redirect if not already on auth page
      if (window.location.pathname !== '/auth') {
        window.location.href = "/auth";
      }
    } else if (error.response?.status === 403) {
      // Forbidden - user doesn't have permission
      console.warn('Access forbidden - insufficient permissions');
      // Could redirect to unauthorized page or show error message
    }
    return Promise.reject(error);
  }
);

export const getProvinces = async () => {
  try {
    const response = await axios.get(API_GET_PROVINCES_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    throw error;
  }
};

export const getDistricts = async (provinceId) => {
  try {
    const response = await axios.get(`https://esgoo.net/api-tinhthanh-new/2/${provinceId}.htm`);
    return response.data;
  } catch (error) {
    console.error("Error fetching districts:", error);
    throw error;
  }
};
// export const getCommunes = async (districtId) => {
//   try {
//     const response = await axios.get(`https://esgoo.net/api-tinhthanh-new/2/${districtId}.htm`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching communes:", error);
//     throw error;
//   }
// };


