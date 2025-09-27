import { apiClient } from "./getAPI";

export const login = async (email, password) => {
    console.log("Attempting login with email:", email);
    console.log("Attempting login with password:", password);
  try {
    const response = await apiClient.post("/auth/login", { email, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token); // lưu token để dùng cho các request khác
    }
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const register = async (name, phone, email, password,confirmPassword) => {
  try {
    const response = await apiClient.post("auth/register", {
      name,
      phone,
      email,
      password,
      confirmPassword
    });

    // Lấy token từ field data trong ResponseObject
    if (response.data.data) {
      localStorage.setItem("token", response.data.data);
    }

    return response.data;
    } catch (error) {   
    console.error("Registration error:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};