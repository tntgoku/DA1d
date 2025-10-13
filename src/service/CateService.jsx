import { Cate } from "../entity/Object/Cate";
import { apiClient } from "./getAPI";

export const categoryService = {
  async getAllCate() {
    const response = await apiClient.get("cate"); // endpoint thật
    if (response.data && response.data.status === 200) {
      console.log(response.data.data);
      
      return response.data.data.map(p => new Cate(p));;
    } else {
      return [];
    }
    return [];
  },
  async getCateById(id){
     try {
    const response = await apiClient.get(`cate/${id}`);
    if (response.data && response.data.status === 200) {
      console.log(response.data.data);
      return new Cate(response.data.data);
    } else {
      return [];
    }
  } catch (error) {
    console.log('Error fetching products:', error);
    throw error;
  }
  }
  ,async getCateBySlug(id){
     try {
    const response = await apiClient.get(`cate/slug/${id}`);
    if (response.data && response.data.status === 200) {
      console.log(response.data.data);
      return new Cate(response.data.data);
    } else {
      return [];
    }
  } catch (error) {
    console.log('Error fetching products:', error);
    throw error;
  }
  }
};

