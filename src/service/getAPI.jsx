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


