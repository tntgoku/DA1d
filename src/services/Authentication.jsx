import { apiClient } from "./getAPI";

export const login = async (email, password) => {
    console.log("Attempting login with email:", email);
    console.log("Attempting login with password:", password);
  try {
    const response = await apiClient.post("authz/login", { email, password });
    console.log("Login response:", response.data);
    
    // Backend trả về ResponseObject với data chứa token và name
    if (response.data && response.data.data && response.data.data.token) {
      const token = response.data.data.token;
      const name = response.data.data.name;
      
      console.log("Token received:", token);
      console.log("Name received:", name);
      
      localStorage.setItem("token", token); // lưu token để dùng cho các request khác
      
      // Lưu user data vào localStorage để hiển thị ngay lập tức
      if (name) {
        const userData = {
          name: name,
          email: email,
          token: token
        };
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("User data saved to localStorage:", userData);
      }
    } else {
      console.error("No token found in response:", response.data);
    }
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const register = async (name, phone, email, password,confirmPassword) => {
  try {
    const response = await apiClient.post("authz/register", {
      name,
      phone,
      email,
      password,
      confirmPassword
    });

    // Lấy token từ field data trong ResponseObject
    if (response.data && response.data.data) {
      localStorage.setItem("token", response.data.data);
      console.log("Register token saved:", response.data.data);
    }

    return response.data;
    } catch (error) {   
    console.error("Registration error:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    // Call logout endpoint to invalidate token on server
    await apiClient.post("authz/logout");
  } catch (error) {
    console.error("Logout service error:", error);
    // Continue with local cleanup even if server call fails
  } finally {
    // Always clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

// API lấy thông tin profile người dùng
export const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    
    const response = await apiClient.post("authz/profile", {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    console.error("Get profile error:", error);
    throw error;
  }
};

// API quên mật khẩu (gửi email reset)
export const forgotPassword = async (email) => {
  try {
    const response = await apiClient.post("authz/forgot-password", { email });
    return response.data;
  } catch (error) {
    console.error("Forgot password error:", error);
    throw error;
  }
};

// API reset mật khẩu
export const resetPassword = async (token, newPassword, confirmPassword) => {
  try {
    const response = await apiClient.post("authz/reset-password", {
      token,
      newPassword,
      confirmPassword
    });
    return response.data;
  } catch (error) {
    console.error("Reset password error:", error);
    throw error;
  }
};

// API cập nhật thông tin profile
export const updateProfile = async (profileData) => {
  try {
    const response = await apiClient.put("authz/profile", profileData);
    return response.data;
  } catch (error) {
    console.error("Update profile error:", error);
    throw error;
  }
};
