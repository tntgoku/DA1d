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
  },
  async getCateBySlug(id){
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
  },
  
  // SEO-friendly methods
  async getCategoryHierarchy() {
    try {
      const response = await apiClient.get("cate/hierarchy");
      if (response.data && response.data.status === 200) {
        return response.data.data;
      } else {
        return [];
      }
    } catch (error) {
      console.log('Error fetching category hierarchy:', error);
      throw error;
    }
  },

  async getBreadcrumbBySlug(slug) {
    try {
      const response = await apiClient.get(`cate/breadcrumb/${slug}`);
      if (response.data && response.data.status === 200) {
        return response.data.data;
      } else {
        return [];
      }
    } catch (error) {
      console.log('Error fetching breadcrumb:', error);
      throw error;
    }
  },

  async getCategoriesByParent(parentId) {
    try {
      const response = await apiClient.get(`cate/parent/${parentId}`);
      if (response.data && response.data.status === 200) {
        return response.data.data;
      } else {
        return [];
      }
    } catch (error) {
      console.log('Error fetching categories by parent:', error);
      throw error;
    }
  },

  async getCategoryBySeoUrl(parentSlug, childSlug) {
    try {
      const response = await apiClient.get(`cate/seo-url/${parentSlug}/${childSlug}`);
      if (response.data && response.data.status === 200) {
        return response.data.data;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Error fetching category by SEO URL:', error);
      throw error;
    }
  },

  async getCategoryByParentSlug(parentSlug) {
    try {
      const response = await apiClient.get(`cate/seo-url/${parentSlug}`);
      if (response.data && response.data.status === 200) {
        return response.data.data;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Error fetching category by parent slug:', error);
      throw error;
    }
  },

  async searchCategories(keyword, parentId, isActive, page = 0, size = 10) {
    try {
      const params = new URLSearchParams();
      if (keyword) params.append('keyword', keyword);
      if (parentId) params.append('parentId', parentId);
      if (isActive !== undefined) params.append('isActive', isActive);
      params.append('page', page);
      params.append('size', size);

      const response = await apiClient.get(`cate/search?${params.toString()}`);
      if (response.data && response.data.status === 200) {
        return response.data.data;
      } else {
        return [];
      }
    } catch (error) {
      console.log('Error searching categories:', error);
      throw error;
    }
  }
};

